// src/pages/pricing/PricingPage.jsx
import { useNavigate } from 'react-router-dom'
import AppLayout from '../../components/layout/AppLayout'
import { useAuth } from '../../context/AuthContext'

const PRICING = [
  { key: 'trial_pass',    label: 'Trial Pass',       price_inr: 19,   description: '3-day full access — try every Pro feature risk-free.' },
  { key: 'pro_monthly',   label: 'Pro Monthly',      price_inr: 99,   description: 'Unlimited tests, all themes, ad-free — billed monthly.' },
  { key: 'pro_yearly',    label: 'Pro Yearly',       price_inr: 699,  description: 'Best value — save ₹489 vs monthly. Everything in Pro.' },
  { key: 'coin_pack_100', label: '100 Coins',        price_inr: 9,    description: 'Boost your wallet for hints, games, and more.' },
  { key: 'coin_pack_500', label: '500 Coins',        price_inr: 39,   description: 'Great for active learners who play daily.' },
  { key: 'coin_pack_1200',label: '1,200 Coins',      price_inr: 79,   description: 'Power pack — never run low mid-session.' },
  { key: 'coin_pack_3000',label: '3,000 Coins',      price_inr: 149,  description: 'Ultimate stash for serious grinders.' },
]

const PRO_BENEFITS = [
  '♾️ Unlimited practice + mock tests',
  '🎨 All 25 premium themes unlocked',
  '🚫 100% ad-free experience',
  '📊 Advanced analytics & weak-area reports',
  '📖 Mentor eBooks & GuruBooks access',
  '🔔 Priority doubt resolution in Guru Hub',
  '🏆 Exclusive Pro leaderboard ranking',
  '📱 Offline mode (download tests)',
]

export default function PricingPage() {
  const { user } = useAuth()
  if (!user) return null

  const plans = PRICING.filter(p => !p.key.startsWith('coin'))
  const coins  = PRICING.filter(p =>  p.key.startsWith('coin'))

  return (
    <AppLayout title="Pro & Pricing">
      <div className="max-w-4xl mx-auto space-y-8 p-4">

        {/* Launch banner */}
        <div className="bg-gradient-to-r from-[#D4AF37] to-[#E8C84A] rounded-2xl p-5 flex items-center gap-4 shadow-lg">
          <span className="text-4xl">🎉</span>
          <div>
            <p className="font-bold text-[#0F2140] text-lg">You're on Pro — free during our launch period!</p>
            <p className="text-[#1E3A5F] text-sm mt-0.5">Enjoy all features at no charge. Paid plans activate after our launch window ends (we'll give you 30 days' notice).</p>
          </div>
        </div>

        {/* Pro benefits */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-[#1E3A5F] mb-4">What's included in Pro</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {PRO_BENEFITS.map(b => (
              <div key={b} className="flex items-center gap-2 text-gray-700 text-sm">
                <span>{b}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Plans */}
        <div>
          <h2 className="text-xl font-bold text-[#1E3A5F] mb-4">Subscription Plans</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {plans.map(plan => (
              <div key={plan.key} className={`relative rounded-2xl border-2 p-5 shadow-sm flex flex-col gap-3 ${plan.key === 'pro_yearly' ? 'border-[#D4AF37] bg-[#FDF6E3]' : 'border-gray-200 bg-white'}`}>
                {plan.key === 'pro_yearly' && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#D4AF37] text-[#0F2140] text-xs font-bold px-3 py-0.5 rounded-full">BEST VALUE</span>
                )}
                <div>
                  <p className="font-bold text-[#1E3A5F] text-lg">{plan.label}</p>
                  <p className="text-3xl font-black text-[#D4AF37]">₹{plan.price_inr}</p>
                  <p className="text-gray-500 text-xs mt-1">{plan.description}</p>
                </div>
                <button disabled className="mt-auto w-full py-2 rounded-xl bg-gray-200 text-gray-400 font-semibold text-sm cursor-not-allowed">
                  Coming Soon
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Coin packs */}
        <div>
          <h2 className="text-xl font-bold text-[#1E3A5F] mb-1">Coin Packs</h2>
          <p className="text-gray-500 text-sm mb-4">Use coins for hints, brain games, and exclusive rewards.</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {coins.map(pack => (
              <div key={pack.key} className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm flex flex-col gap-2">
                <div className="text-2xl">🪙</div>
                <p className="font-bold text-[#1E3A5F]">{pack.label}</p>
                <p className="text-xl font-black text-[#D4AF37]">₹{pack.price_inr}</p>
                <p className="text-gray-400 text-xs">{pack.description}</p>
                <button disabled className="mt-auto w-full py-1.5 rounded-xl bg-gray-200 text-gray-400 font-semibold text-xs cursor-not-allowed">
                  Coming Soon
                </button>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-gray-400 text-xs pb-4">Payments powered by Razorpay · Secure · INR only · No hidden charges</p>
      </div>
    </AppLayout>
  )
}