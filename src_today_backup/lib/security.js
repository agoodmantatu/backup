export const initSecurityLayer = () => {
  // Disable right-click in production
  if (import.meta.env.PROD) {
    document.addEventListener('contextmenu', (e) => e.preventDefault());
  }
};

export const initScreenshotProtection = () => {
  document.addEventListener('keyup', (e) => {
    if (e.key === 'PrintScreen') {
      navigator.clipboard.writeText('');
    }
  });
};

export const initDevToolsProtection = () => {
  setInterval(() => {
    const threshold = 160;
    if (window.outerWidth - window.innerWidth > threshold ||
        window.outerHeight - window.innerHeight > threshold) {
      document.body.innerHTML = '';
    }
  }, 1000);
};

export const sanitizeInput = (str) => str?.replace(/<[^>]*>/g, '') || '';

export default { initSecurityLayer, initScreenshotProtection, initDevToolsProtection, sanitizeInput };

// ── Added: daily free-test velocity limiter ───────────────────────
export function checkTestLimit() {
  const KEY = 'tryit_test_velocity'
  const today = new Date().toISOString().split('T')[0]
  let data = JSON.parse(localStorage.getItem(KEY) || '{}')
  if (data.date !== today) data = { date: today, count: 0 }
  const FREE_LIMIT = 3
  return {
    allowed: data.count < FREE_LIMIT,
    used: data.count,
    limit: FREE_LIMIT,
    remaining: Math.max(0, FREE_LIMIT - data.count),
  }
}

export function recordTestTaken() {
  const KEY = 'tryit_test_velocity'
  const today = new Date().toISOString().split('T')[0]
  let data = JSON.parse(localStorage.getItem(KEY) || '{}')
  if (data.date !== today) data = { date: today, count: 0 }
  data.count = (data.count || 0) + 1
  localStorage.setItem(KEY, JSON.stringify(data))
}
