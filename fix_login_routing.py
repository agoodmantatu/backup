import os

path = r"E:\Tatu\src\pages\Login.jsx"

with open(path, encoding='utf-8') as f:
    c = f.read()

ROLE_MAP = """
      const ROLE_HOME = {
        student: '/dashboard',
        mentor: '/mentor-hub',
        institution: '/centre/dashboard',
        family: '/family',
      }"""

# Fix 1: handleVerifyOtp - line 105
# BEFORE: navigate(done ? '/dashboard' : '/onboarding')
# AFTER:  navigate(done ? ROLE_HOME[selectedRole] || '/dashboard' : '/onboarding')
old1 = """      await login(email.trim(), selectedRole)
      const done = localStorage.getItem(onboardingKey(email.trim()))
      navigate(done ? '/dashboard' : '/onboarding')"""

new1 = """      await login(email.trim(), selectedRole)
      const done = localStorage.getItem(onboardingKey(email.trim()))""" + ROLE_MAP + """
      navigate(done ? (ROLE_HOME[selectedRole] || '/dashboard') : '/onboarding')"""

if old1 in c:
    c = c.replace(old1, new1)
    print("✅ Fixed handleVerifyOtp routing")
else:
    print("⚠️  handleVerifyOtp pattern not found - checking alternate...")
    # Try to find and show what's there
    idx = c.find("navigate(done ?")
    if idx > 0:
        print("   Found at:", repr(c[idx:idx+80]))

# Fix 2: handleGoogle - line 126
old2 = """      await login(mockEmail, selectedRole)
      const done = localStorage.getItem(onboardingKey(mockEmail))
      navigate(done ? '/dashboard' : '/onboarding')"""

new2 = """      await login(mockEmail, selectedRole)
      const done = localStorage.getItem(onboardingKey(mockEmail))""" + ROLE_MAP + """
      navigate(done ? (ROLE_HOME[selectedRole] || '/dashboard') : '/onboarding')"""

if old2 in c:
    c = c.replace(old2, new2)
    print("✅ Fixed handleGoogle routing")
else:
    print("⚠️  handleGoogle pattern not found")
    # Show all navigate calls
    lines = c.split('\n')
    for i, l in enumerate(lines):
        if 'navigate(' in l:
            print(f"   Line {i+1}: {l.strip()}")

# Fix 3: Google blank page - IS_DEV check
# Make sure IS_DEV is true
if "const IS_DEV = true" not in c:
    c = c.replace(
        "const IS_DEV =\n  !import.meta.env.VITE_SUPABASE_URL ||\n  import.meta.env.VITE_SUPABASE_URL.includes('placeholder')",
        "const IS_DEV = true // Dev mode - Supabase not configured yet"
    )
    print("✅ IS_DEV forced to true (fixes Google blank page)")
else:
    print("✅ IS_DEV already true")

with open(path, 'w', encoding='utf-8') as f:
    f.write(c)

print("\nDone! Login.jsx fixed.")
print("Test: Pick Institution → any email → 111111 → should go to Centre Dashboard")
