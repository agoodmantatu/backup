// supabase/functions/_shared/upstash.ts
// Upstash Redis REST API client (works in Deno Edge Functions, no TCP needed)

const UPSTASH_URL = Deno.env.get('UPSTASH_REDIS_REST_URL')!;
const UPSTASH_TOKEN = Deno.env.get('UPSTASH_REDIS_REST_TOKEN')!;

async function upstashCommand(command: (string | number)[]): Promise<any> {
  const response = await fetch(UPSTASH_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${UPSTASH_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(command),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Upstash error: ${response.status} ${errText}`);
  }

  const data = await response.json();
  return data.result;
}

export const upstash = {
  // SET key value EX seconds
  async setex(key: string, seconds: number, value: string): Promise<void> {
    await upstashCommand(['SET', key, value, 'EX', seconds]);
  },

  // GET key
  async get(key: string): Promise<string | null> {
    const result = await upstashCommand(['GET', key]);
    return result ?? null;
  },

  // DEL key
  async del(key: string): Promise<void> {
    await upstashCommand(['DEL', key]);
  },

  // INCR key (atomic increment, used for rate limiting)
  async incr(key: string): Promise<number> {
    return await upstashCommand(['INCR', key]);
  },

  // EXPIRE key seconds
  async expire(key: string, seconds: number): Promise<void> {
    await upstashCommand(['EXPIRE', key, seconds]);
  },

  // EXISTS key
  async exists(key: string): Promise<boolean> {
    const result = await upstashCommand(['EXISTS', key]);
    return result === 1;
  },
};

/*
USAGE NOTE — Free Tier Budget (10,000 commands/day):

Each verification flow costs roughly:
- 1x SETEX (issue token)       = 1 command
- 1x GET (verify token)        = 1 command
- 1x DEL (consume token)       = 1 command
Total per registration: ~3 commands

Each session check (Cloudflare edge can't reach Upstash directly without
its own fetch call, so this is mainly for backend-side checks):
- 1x GET (session version)     = 1 command

At 10,000 commands/day ÷ 3 per registration ≈ 3,300 registrations/day
possible purely on Redis free tier — comfortably covers 0-5K DAU launch
phase. If registrations + session checks exceed this, Upstash pay-as-you-go
is fractions of a rupee per 1K extra commands — no need to over-provision early.
*/
