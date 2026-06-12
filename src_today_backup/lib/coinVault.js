export const earnCoins = (amount, reason = '') => {
  const current = parseInt(localStorage.getItem('tryit_coins') || '200');
  const updated = current + amount;
  localStorage.setItem('tryit_coins', updated);
  console.log(`+${amount} coins: ${reason}`);
  return updated;
};

export const spendCoins = (amount) => {
  const current = parseInt(localStorage.getItem('tryit_coins') || '0');
  const updated = Math.max(0, current - amount);
  localStorage.setItem('tryit_coins', updated);
  return updated;
};

export const getBalance = () => {
  return parseInt(localStorage.getItem('tryit_coins') || '200');
};

export default { earnCoins, spendCoins, getBalance };

// ── Added: missing coin functions ─────────────────────────────────
const _COINS_KEY = 'tryit_coins'

function _readBalance() {
  const v = localStorage.getItem(_COINS_KEY)
  return v ? parseInt(v, 10) : 200
}
function _writeBalance(v) {
  localStorage.setItem(_COINS_KEY, String(Math.max(0, v)))
  window.dispatchEvent(new Event('tryit-coins-updated'))
}

export const DEDUCTION_RULES = {
  belowCutoff:   { amount: 10, label: 'Score below exam cutoff' },
  testAbandoned: { amount: 5,  label: 'Test abandoned before completion' },
}

export const COIN_PACKS = [
  { id:'pack_100',  coins:100,  price:5,  label:'Starter Pack' },
  { id:'pack_500',  coins:500,  price:19, label:'Popular Pack', badge:'Best Value' },
  { id:'pack_1200', coins:1200, price:49, label:'Power Pack' },
  { id:'pack_3000', coins:3000, price:99, label:'Champion Pack' },
]

export function rewardCurrentAffairsRead({ amount = 5 } = {}) {
  _writeBalance(_readBalance() + amount)
  return { coins: amount, newBalance: _readBalance() }
}

export function rewardFocusSession({ amount = 25 } = {}) {
  _writeBalance(_readBalance() + amount)
  return { coins: amount, newBalance: _readBalance() }
}

export function rewardGame({ amount = 10, xp = 0 } = {}) {
  _writeBalance(_readBalance() + amount)
  return { coins: amount, xp, newBalance: _readBalance() }
}

export function processTestResult({ score = 0, cutoff = 40, baseReward = 50 } = {}) {
  const passed = score >= cutoff
  const delta = passed ? baseReward : -DEDUCTION_RULES.belowCutoff.amount
  _writeBalance(_readBalance() + delta)
  return {
    passed, coinsChange: delta, newBalance: _readBalance(),
    message: passed
      ? `+${delta} coins — great job! 🎉`
      : `${delta} coins — score below cutoff (${cutoff}%). Keep practicing!`,
  }
}

export async function purchaseCoins(packId) {
  const pack = COIN_PACKS.find(p => p.id === packId)
  if (!pack) throw new Error('Invalid coin pack')
  await new Promise(r => setTimeout(r, 800))
  _writeBalance(_readBalance() + pack.coins)
  return { success: true, coinsAdded: pack.coins, newBalance: _readBalance() }
}
