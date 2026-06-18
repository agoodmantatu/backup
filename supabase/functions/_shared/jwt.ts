// supabase/functions/_shared/jwt.ts
// JWT sign/verify using Deno's native crypto (RS256), no Node 'jsonwebtoken' package

import { create, verify, getNumericDate } from 'https://deno.land/x/djwt@v3.0.1/mod.ts';

const PRIVATE_KEY_PEM = Deno.env.get('JWT_PRIVATE_KEY')!;
const PUBLIC_KEY_PEM = Deno.env.get('JWT_PUBLIC_KEY')!;

// Convert PEM to CryptoKey (cached after first call)
let cachedPrivateKey: CryptoKey | null = null;
let cachedPublicKey: CryptoKey | null = null;

function pemToArrayBuffer(pem: string): ArrayBuffer {
  const b64 = pem
    .replace(/-----BEGIN (PRIVATE|PUBLIC) KEY-----/, '')
    .replace(/-----END (PRIVATE|PUBLIC) KEY-----/, '')
    .replace(/\s+/g, '');
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes.buffer;
}

async function getPrivateKey(): Promise<CryptoKey> {
  if (cachedPrivateKey) return cachedPrivateKey;
  cachedPrivateKey = await crypto.subtle.importKey(
    'pkcs8',
    pemToArrayBuffer(PRIVATE_KEY_PEM),
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['sign']
  );
  return cachedPrivateKey;
}

async function getPublicKey(): Promise<CryptoKey> {
  if (cachedPublicKey) return cachedPublicKey;
  cachedPublicKey = await crypto.subtle.importKey(
    'spki',
    pemToArrayBuffer(PUBLIC_KEY_PEM),
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['verify']
  );
  return cachedPublicKey;
}

export interface TataJWTPayload {
  userId: string;
  phone: string;
  sessionVersion: number;
  deviceId: string;
}

export async function signJWT(payload: TataJWTPayload, expiresInDays = 30): Promise<string> {
  const key = await getPrivateKey();
  return await create(
    { alg: 'RS256', typ: 'JWT' },
    {
      ...payload,
      exp: getNumericDate(60 * 60 * 24 * expiresInDays),
    },
    key
  );
}

export async function verifyJWT(token: string): Promise<TataJWTPayload | null> {
  try {
    const key = await getPublicKey();
    const payload = await verify(token, key);
    return payload as unknown as TataJWTPayload;
  } catch {
    return null;
  }
}

/*
SETUP NOTE:
Generate keys once locally, store in Supabase Edge Function secrets:

  openssl genrsa -out private_key.pem 2048
  openssl rsa -in private_key.pem -pubout -out public_key.pem

  supabase secrets set JWT_PRIVATE_KEY="$(cat private_key.pem)"
  supabase secrets set JWT_PUBLIC_KEY="$(cat public_key.pem)"
*/
