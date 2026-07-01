// FILE: src/pages/Register.jsx
// TryIT - Multi-Role & Phone-First Secure Verification (Truecaller / OTP)
// Route: /register (One registration per verified phone number - Anti-Cheat Foundation)
// Flow: role -> phone -> otp -> name -> setpin -> done

import { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth, onboardingKey } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import Logo from '../components/Logo'

const ROLES = [
  { id: 'student',     label: 'Student',     emoji: '🎓', desc: 'Prepare for your exams' },
  { id: 'mentor',      label: 'Mentor',      emoji: '🧑‍🏫', desc: 'Guide and track learners' },
  { id: 'institution', label: 'Institution', emoji: '🏫', desc: 'Manage your coaching centre' },
  { id: 'family',      label: 'Family',      emoji: '👨‍👩‍👧', desc: "Monitor your child's progress" },
]

export default function Register() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login, setPinForRole, user } = useAuth()
  useTheme()

  const [step, setStep] = useState('role')
  const [selectedRole, setSelectedRole] = useState('')
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [name, setName] = useState('')
  const [pin, setPin] = useState(['', '', '', ''])
  const [pinConfirm, setPinConfirm] = useState(['', '', '', ''])
  const [pinStage, setPinStage] = useState('create')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [resendTimer, setResendTimer] = useState(0)

  const otpRefs = useRef([])
  const pinRefs = useRef([])
  const redirectTo = location.state?.from || '/role-select'

  useEffect(() => {
    if (user) {
      const done = localStorage.getItem(onboardingKey(user.email || ''))
      const ROLE_HOME = { student: '/student', mentor: '/mentor-hub', institution: '/centre/dashboard', family: '/family' }
      navigate(done ? (ROLE_HOME[user.role] || '/student') : '/onboarding')
    }
  }, [user, navigate])

  useEffect(() => {
    if (resendTimer <= 0) return
    const t = setTimeout(() => setResendTimer(r => r - 1), 1000)
    return () => clearTimeout(t)
  }, [resendTimer])

  useEffect(() => {
    if (step === 'otp' && otpRefs.current[0]) otpRefs.current[0].focus()
    if (step === 'setpin' && pinRefs.current[0]) pinRefs.current[0].focus()
  }, [step, pinStage])

  function handleRoleSelect(roleId) { setSelectedRole(roleId); setStep('phone'); setError('') }

  const sendOtp = async (e) => {
    if (e) e.preventDefault()
    if (phone.replace(/\D/g, '').length !== 10) { setError('Enter a valid 10-digit number'); return }
    setError(''); setLoading(true)
    try {
      await new Promise(r => setTimeout(r, 800))
      setStep('otp'); setResendTimer(30)
    } catch (err) { setError('Failed to send verification code. Try again.') }
    finally { setLoading(false) }
  }

  const verifyOtp = async (e) => {
    if (e) e.preventDefault()
    const code = otp.join('')
    if (code.length !== 6) { setError('Enter all 6 digits'); return }
    setError(''); setLoading(true)
    try {
      await new Promise(r => setTimeout(r, 600))
      setStep('name')
    } catch (err) { setError('Invalid OTP code details entered.') }
    finally { setLoading(false) }
  }

  const finishName = async (e) => {
    if (e) e.preventDefault()
    if (!name.trim()) { setError('Please enter your name'); return }
    setError(''); setStep('setpin')
  }

  const handleOtpChange = (index, value) => {
    const char = value.replace(/\D/g, '')
    if (!char && value !== '') return
    const next = [...otp]; next[index] = char; setOtp(next)
    if (char && index < 5) otpRefs.current[index + 1]?.focus()
  }
  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) otpRefs.current[index - 1]?.focus()
  }
  const handleOtpPaste = (e) => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    if (pasted.length === 6) { setOtp(pasted.split('')); otpRefs.current[5]?.focus() }
    e.preventDefault()
  }

  const handlePinChange = (index, value, isConfirm) => {
    const char = value.replace(/\D/g, '')
    if (!char && value !== '') return
    const arr = isConfirm ? [...pinConfirm] : [...pin]
    arr[index] = char
    isConfirm ? setPinConfirm(arr) : setPin(arr)
    if (char && index < 3) pinRefs.current[index + 1]?.focus()
  }
  const handlePinKeyDown = (index, e) => {
    const arr = pinStage === 'confirm' ? pinConfirm : pin
    if (e.key === 'Backspace' && !arr[index] && index > 0) pinRefs.current[index - 1]?.focus()
  }

  const submitPinCreate = (e) => {
    e.preventDefault()
    if (pin.join('').length !== 4) { setError('Enter all 4 digits'); return }
    setError(''); setPinStage('confirm'); setPinConfirm(['', '', '', ''])
    setTimeout(() => pinRefs.current[0]?.focus(), 50)
  }

  const submitPinConfirm = async (e) => {
    e.preventDefault()
    if (pinConfirm.join('') !== pin.join('')) {
      setError('PINs do not match. Try again.')
      setPin(['', '', '', '']); setPinConfirm(['', '', '', ''])
      setPinStage('create')
      setTimeout(() => pinRefs.current[0]?.focus(), 50)
      return
    }
    setError(''); setLoading(true)
    const generatedEmail = `${phone}@phone.tryiteducations.net`
    try {
      setPinForRole(selectedRole, pin.join(''))
      localStorage.setItem('tryit_email', generatedEmail)
      await login(generatedEmail, selectedRole)
    } catch (err) { setError('Something went wrong. Please try again.') }
    finally { setLoading(false) }
  }

  const bgGradient = 'linear-gradient(135deg, var(--color-primary-dark, #0F2140) 0%, var(--color-primary, #1E3A5F) 55%, rgba(var(--color-surface-rgb, 255,255,255), 0.08) 100%)'
  const surfaceStyle = { background: 'var(--color-surface, #FFFFFF)', border: '1px solid var(--color-border, #E2E8F0)' }
  const fieldStyle = { borderColor: 'var(--color-border, #E2E8F0)', background: 'var(--color-surface, #FFFFFF)', color: 'var(--color-text, #1E3A5F)', fontFamily: 'Inter, sans-serif' }
  const accentColor = 'var(--color-accent, #D4AF37)'
  const accentGradient = 'linear-gradient(135deg, var(--color-accent, #D4AF37), var(--color-accent-light, #E8C84A))'
  const textColor = 'var(--color-text, #1E3A5F)'
  const subtleText = 'var(--subtext-color, #94A3B8)'
  const buttonText = 'var(--button-text, var(--color-text, #1E3A5F))'
  const errorColor = 'var(--color-error, #EF4444)'
  const roleObj = ROLES.find(r => r.id === selectedRole)
  const activePin = pinStage === 'confirm' ? pinConfirm : pin

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 relative overflow-hidden" style={{ background: bgGradient }}>
      <div className="relative w-full max-w-md">
        <div className="rounded-2xl p-8 shadow-2xl transition-all duration-300" style={surfaceStyle}>

          <div className="flex flex-col items-center mb-7">
            <Logo dark={false} height={48} />
            <p className="mt-3 text-xs font-medium tracking-widest uppercase" style={{ color: accentColor, fontFamily: 'Poppins, sans-serif' }}>Your Exam. Your Rank. Your Success.</p>
          </div>

          {step === 'role' && (
            <div>
              <h2 className="text-center text-xl font-bold mb-1" style={{ color: textColor, fontFamily: 'Poppins, sans-serif' }}>Create your account</h2>
              <p className="text-center text-sm mb-6" style={{ color: subtleText, fontFamily: 'Inter, sans-serif' }}>Pick your role to get started</p>
              <div className="grid grid-cols-2 gap-3">
                {ROLES.map(role => (
                  <button key={role.id} onClick={() => handleRoleSelect(role.id)}
                    className="group flex flex-col items-center gap-1 rounded-xl p-4 border-2 text-left transition-all duration-150 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2"
                    style={{ borderColor: selectedRole === role.id ? accentColor : 'var(--color-border, #E2E8F0)', background: selectedRole === role.id ? 'rgba(var(--color-accent-rgb, 212, 175, 55), 0.14)' : 'var(--color-surface, #FFFFFF)', fontFamily: 'Inter, sans-serif' }}>
                    <span className="text-3xl mb-1">{role.emoji}</span>
                    <span className="font-semibold text-sm" style={{ color: textColor }}>{role.label}</span>
                    <span className="text-xs text-center leading-tight" style={{ color: subtleText }}>{role.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 'phone' && (
            <div>
              <button onClick={() => { setStep('role'); setError('') }} className="flex items-center gap-1 text-sm mb-5 transition-opacity hover:opacity-70" style={{ color: textColor, fontFamily: 'Inter, sans-serif' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="M12 5l-7 7 7 7"/></svg>
                Back
              </button>
              <div className="flex items-center gap-3 mb-5">
                <span className="text-3xl">{roleObj?.emoji}</span>
                <div>
                  <h2 className="text-lg font-bold leading-tight" style={{ color: textColor, fontFamily: 'Poppins, sans-serif' }}>Register as {roleObj?.label}</h2>
                  <p className="text-xs" style={{ color: subtleText, fontFamily: 'Inter, sans-serif' }}>Enter your mobile number to establish security validation</p>
                </div>
              </div>
              <form onSubmit={sendOtp} className="space-y-4">
                <div>
                  <label htmlFor="phone" className="block text-xs font-semibold mb-1.5 uppercase tracking-wide" style={{ color: textColor, fontFamily: 'Inter, sans-serif' }}>Mobile Number</label>
                  <div className="flex items-center border-2 rounded-xl px-4 py-3 transition-all" style={fieldStyle}>
                    <span className="text-sm font-medium mr-2 opacity-60">🇮🇳 +91</span>
                    <input id="phone" type="tel" maxLength={10} placeholder="98765 43210" value={phone} onChange={e => setPhone(e.target.value.replace(/\D/g, ''))} required className="w-full text-sm outline-none bg-transparent" />
                  </div>
                </div>
                {error && <p className="text-sm" style={{ color: errorColor }}>{error}</p>}
                <button type="submit" disabled={loading} className="w-full rounded-xl py-3 font-semibold text-sm transition-all hover:shadow-md disabled:opacity-60" style={{ background: accentGradient, color: buttonText, fontFamily: 'Poppins, sans-serif' }}>{loading ? 'Sending OTP...' : 'Continue →'}</button>
              </form>
            </div>
          )}

          {step === 'otp' && (
            <div>
              <button onClick={() => { setStep('phone'); setError(''); setOtp(['','','','','','']) }} className="flex items-center gap-1 text-sm mb-5 transition-opacity hover:opacity-70" style={{ color: textColor, fontFamily: 'Inter, sans-serif' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="M12 5l-7 7 7 7"/></svg>
                Change number
              </button>
              <h2 className="text-lg font-bold mb-1" style={{ color: textColor, fontFamily: 'Poppins, sans-serif' }}>Verify OTP</h2>
              <p className="text-sm mb-6" style={{ color: subtleText, fontFamily: 'Inter, sans-serif' }}>Sent via secure gateway channel to <span className="font-semibold" style={{ color: textColor }}>+91 {phone}</span></p>
              <form onSubmit={verifyOtp} className="space-y-5">
                <div className="flex gap-2 justify-center" onPaste={handleOtpPaste}>
                  {otp.map((digit, i) => (
                    <input key={i} ref={el => otpRefs.current[i] = el} type="text" inputMode="numeric" maxLength={1} value={digit} onChange={e => handleOtpChange(i, e.target.value)} onKeyDown={e => handleOtpKeyDown(i, e)}
                      className="w-11 h-12 text-center text-xl font-bold rounded-xl border-2 outline-none transition-all"
                      style={{ borderColor: digit ? accentColor : 'var(--color-border, #E2E8F0)', background: digit ? 'rgba(var(--color-accent-rgb, 212, 175, 55), 0.08)' : 'var(--color-surface, #FFFFFF)', color: textColor, fontFamily: 'Poppins, sans-serif' }} />
                  ))}
                </div>
                {error && <p className="text-sm text-center" style={{ color: errorColor }}>{error}</p>}
                <button type="submit" disabled={loading || otp.join('').length < 6} className="w-full rounded-xl py-3 font-semibold text-sm transition-all hover:shadow-md disabled:opacity-50" style={{ background: accentGradient, color: buttonText, fontFamily: 'Poppins, sans-serif' }}>{loading ? 'Verifying...' : 'Verify & Proceed →'}</button>
              </form>
              <p className="text-center text-xs mt-4" style={{ color: subtleText }}>
                {resendTimer > 0 ? `Resend OTP in ${resendTimer}s` : (<span onClick={sendOtp} className="cursor-pointer font-semibold underline" style={{ color: accentColor }}>Resend Code SMS</span>)}
              </p>
            </div>
          )}

          {step === 'name' && (
            <div>
              <p className="text-4xl text-center mb-2">👋</p>
              <h2 className="text-center text-xl font-bold mb-1" style={{ color: textColor, fontFamily: 'Poppins, sans-serif' }}>What's your name?</h2>
              <p className="text-center text-sm mb-6" style={{ color: subtleText, fontFamily: 'Inter, sans-serif' }}>This is how you will appear on leaderboard components and certificates</p>
              <form onSubmit={finishName} className="space-y-4">
                <input type="text" placeholder="Full name" value={name} onChange={e => setName(e.target.value)} required className="w-full rounded-xl border-2 px-4 py-3 text-sm outline-none transition-all" style={fieldStyle} />
                {error && <p className="text-sm" style={{ color: errorColor }}>{error}</p>}
                <button type="submit" disabled={loading} className="w-full rounded-xl py-3 font-semibold text-sm transition-all hover:shadow-md" style={{ background: accentGradient, color: buttonText, fontFamily: 'Poppins, sans-serif' }}>Continue →</button>
              </form>
            </div>
          )}

          {step === 'setpin' && (
            <div>
              <p className="text-4xl text-center mb-2">🔐</p>
              <h2 className="text-center text-xl font-bold mb-1" style={{ color: textColor, fontFamily: 'Poppins, sans-serif' }}>{pinStage === 'create' ? 'Set your 4-digit PIN' : 'Confirm your PIN'}</h2>
              <p className="text-center text-sm mb-6" style={{ color: subtleText, fontFamily: 'Inter, sans-serif' }}>{pinStage === 'create' ? "You'll use this to log in next time" : 'Enter it once more to confirm'}</p>
              <form onSubmit={pinStage === 'create' ? submitPinCreate : submitPinConfirm} className="space-y-5">
                <div className="flex gap-3 justify-center">
                  {activePin.map((digit, i) => (
                    <input key={i} ref={el => pinRefs.current[i] = el} type="password" inputMode="numeric" maxLength={1} value={digit} onChange={e => handlePinChange(i, e.target.value, pinStage === 'confirm')} onKeyDown={e => handlePinKeyDown(i, e)}
                      className="w-12 h-14 text-center text-2xl font-bold rounded-xl border-2 outline-none transition-all"
                      style={{ borderColor: digit ? accentColor : 'var(--color-border, #E2E8F0)', background: digit ? 'rgba(var(--color-accent-rgb, 212, 175, 55), 0.08)' : 'var(--color-surface, #FFFFFF)', color: textColor, fontFamily: 'Poppins, sans-serif' }} />
                  ))}
                </div>
                {error && <p className="text-sm text-center" style={{ color: errorColor }}>{error}</p>}
                <button type="submit" disabled={loading || activePin.join('').length < 4} className="w-full rounded-xl py-3 font-semibold text-sm transition-all hover:shadow-md disabled:opacity-50" style={{ background: accentGradient, color: buttonText, fontFamily: 'Poppins, sans-serif' }}>{loading ? 'Setting up account...' : pinStage === 'create' ? 'Continue →' : "Let's Go! 🚀"}</button>
              </form>
            </div>
          )}

          <p className="mt-6 text-center text-xs" style={{ color: subtleText, fontFamily: 'Inter, sans-serif' }}>
            By continuing, you agree to our{' '}<a href="/terms" className="underline hover:opacity-80" style={{ color: subtleText }}>Terms</a>{' '}and{' '}<a href="/privacy" className="underline hover:opacity-80" style={{ color: subtleText }}>Privacy Policy</a>.
          </p>
        </div>

        <p className="text-center mt-6 text-xs font-medium tracking-wide opacity-50" style={{ color: 'var(--color-surface, #FFFFFF)', fontFamily: 'Inter, sans-serif' }}>1,10,000+ exams · 42 languages · TryIT Educations © {new Date().getFullYear()}</p>
      </div>
    </div>
  )
}