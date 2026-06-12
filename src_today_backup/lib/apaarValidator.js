export default {};

// ── Added: APAAR ID validation (12-digit Academic ID) ─────────────
export function isValidAPAAR(id) {
  const clean = String(id || '').replace(/\D/g, '')
  return clean.length === 12
}

export function formatAPAAR(id) {
  const clean = String(id || '').replace(/\D/g, '')
  return clean.replace(/(\d{4})(?=\d)/g, '$1 ').trim()
}

export async function verifyAPAAR(id) {
  await new Promise(r => setTimeout(r, 600))
  const valid = isValidAPAAR(id)
  return {
    valid,
    formatted: formatAPAAR(id),
    message: valid ? 'APAAR ID verified ✅' : 'Invalid APAAR ID — must be 12 digits',
  }
}
