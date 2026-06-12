/**
 * TryIT — Routes (matches restructured file tree)
 */
import { lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

// AUTH
const Splash       = lazy(() => import('../pages/Splash'))
const Landing      = lazy(() => import('../pages/Landing'))
const Login        = lazy(() => import('../pages/Login'))
const Onboarding   = lazy(() => import('../pages/Onboarding'))

// CORE
const Dashboard     = lazy(() => import('../pages/Dashboard'))
const Profile       = lazy(() => import('../pages/Profile'))
const UpdateProfile = lazy(() => import('../pages/profile/UpdateProfile'))
const Settings      = lazy(() => import('../pages/Settings'))
const Notifications = lazy(() => import('../pages/Notifications'))
const Analytics     = lazy(() => import('../pages/analytics/Analytics'))
const Achievements  = lazy(() => import('../pages/achievements/Achievements'))
const ThemeSelector = lazy(() => import('../pages/ThemeSelector'))

// TEST ENGINE
const TestLauncher = lazy(() => import('../pages/test-engine/TestLauncher'))
const ActiveTest   = lazy(() => import('../pages/test-engine/ActiveTest'))
const ResultScreen = lazy(() => import('../pages/test-engine/ResultScreen'))
const ReviewScreen = lazy(() => import('../pages/test-engine/ReviewScreen'))

// EXAMS
const AllExams    = lazy(() => import('../pages/exams/AllExams'))
const ExamDetail  = lazy(() => import('../pages/exams/ExamDetail'))
const RoadmapPage = lazy(() => import('../pages/roadmap/RoadmapPage'))
const ExamAlerts  = lazy(() => import('../pages/exam-alerts/ExamAlerts'))

// LEARNING
const GuruHub        = lazy(() => import('../pages/guru/GuruHub'))
const CareerCompass  = lazy(() => import('../pages/career-compass/CareerCompass'))
const CurrentAffairs = lazy(() => import('../pages/current-affairs/CurrentAffairs'))
const ScholarshipHub = lazy(() => import('../pages/scholarships/ScholarshipHub'))
const StudyPlanner   = lazy(() => import('../pages/classroom/StudyPlanner'))
const EbookStore     = lazy(() => import('../pages/ebooks/EbookStore'))

// COMPETITION
const HallHub     = lazy(() => import('../pages/hall/HallHub'))
const Leaderboard = lazy(() => import('../pages/leaderboard/Leaderboard'))
const Tournaments = lazy(() => import('../pages/tournaments/Tournaments'))
const GamesHub    = lazy(() => import('../pages/games/GamesHub'))
const MathBlitz   = lazy(() => import('../pages/games/MathBlitz'))
const WordRush    = lazy(() => import('../pages/games/WordRush'))
const GKBurst     = lazy(() => import('../pages/games/GKBurst'))

// PROGRESS
const FocusMode       = lazy(() => import('../pages/focus-mode/FocusMode'))
const JourneyPassport = lazy(() => import('../pages/JourneyPassport'))

// COMMUNITY (re-added — dropped in restructure)
const CommunityHall = lazy(() => import('../pages/community/CommunityHall'))
const LiveImpact    = lazy(() => import('../pages/LiveImpactTracker'))

// SOCIAL (re-added — dropped in restructure)
const ReferralPage = lazy(() => import('../pages/referral/ReferralPage'))
const FriendCircle = lazy(() => import('../pages/friends/FriendCircle'))
const FamilyHub    = lazy(() => import('../pages/family/FamilyHub'))

// MENTOR
const MentorHub      = lazy(() => import('../pages/mentor/MentorHub'))
const MentorCashback = lazy(() => import('../pages/mentor/MentorCashback'))
const MentorAnalytics= lazy(() => import('../pages/mentor/MentorAnalytics'))
const CouponManager  = lazy(() => import('../pages/mentor/CouponManager'))

// MONETISATION
const PricingPage = lazy(() => import('../pages/pricing/PricingPage'))
const WalletPage  = lazy(() => import('../pages/wallet/WalletPage'))

// EQUITY & ACCESSIBILITY
const EquityTier      = lazy(() => import('../pages/equity/EquityTierSelector'))
const EquityVerify    = lazy(() => import('../pages/equity/EquityVerification'))
const AccessMode      = lazy(() => import('../pages/accessibility/AccessibilityMode'))
const DonationSec     = lazy(() => import('../pages/DonationSection'))
const SchoolCircle    = lazy(() => import('../pages/circles/SchoolCircle'))
const Sisterhood      = lazy(() => import('../pages/circles/SisterhoodCircle'))

// CENTRE / INSTITUTION
const CentreLogin     = lazy(() => import('../pages/CentreLogin'))
const CentreDashboard = lazy(() => import('../pages/centre/CentreDashboard'))
const StudentHistory  = lazy(() => import('../pages/centre/StudentHistory'))

// ADMIN
const AdminLogin = lazy(() => import('../pages/admin/AdminLogin'))
const AdminDash  = lazy(() => import('../pages/admin/AdminDashboard'))

// LEGAL / TOOLS / CONTACT (re-added — dropped in restructure)
const TermsConditions       = lazy(() => import('../pages/legal/TermsAndConditions'))
const EligibilityCalculator = lazy(() => import('../pages/tools/EligibilityCalculator'))
const ContactPage            = lazy(() => import('../pages/contact/ContactPage'))

export default function AppRoutes() {
  return (
    <Routes>
      {/* AUTH */}
      <Route path="/"           element={<Splash />} />
      <Route path="/landing"    element={<Landing />} />
      <Route path="/login"      element={<Login />} />
      <Route path="/onboarding" element={<Onboarding />} />

      {/* CORE */}
      <Route path="/dashboard"       element={<Dashboard />} />
      <Route path="/profile"         element={<Profile />} />
      <Route path="/profile/edit"    element={<UpdateProfile />} />
      <Route path="/settings"        element={<Settings />} />
      <Route path="/settings/themes" element={<ThemeSelector />} />
      <Route path="/notifications"   element={<Notifications />} />
      <Route path="/analytics"       element={<Analytics />} />
      <Route path="/achievements"    element={<Achievements />} />

      {/* TEST ENGINE */}
      <Route path="/test-engine"        element={<TestLauncher />} />
      <Route path="/test-engine/active" element={<ActiveTest />} />
      <Route path="/test-engine/result" element={<ResultScreen />} />
      <Route path="/test-engine/review" element={<ReviewScreen />} />

      {/* EXAMS */}
      <Route path="/exams"           element={<AllExams />} />
      <Route path="/exams/:examId"   element={<ExamDetail />} />
      <Route path="/roadmap/:examId" element={<RoadmapPage />} />
      <Route path="/exam-alerts"     element={<ExamAlerts />} />

      {/* LEARNING */}
      <Route path="/guru-hub"          element={<GuruHub />} />
      <Route path="/career-compass"    element={<CareerCompass />} />
      <Route path="/current-affairs"   element={<CurrentAffairs />} />
      <Route path="/scholarships"      element={<ScholarshipHub />} />
      <Route path="/classroom/planner" element={<StudyPlanner />} />
      <Route path="/ebooks"            element={<EbookStore />} />

      {/* COMPETITION */}
      <Route path="/hall"             element={<HallHub />} />
      <Route path="/leaderboard"      element={<Leaderboard />} />
      <Route path="/tournaments"      element={<Tournaments />} />
      <Route path="/games"            element={<GamesHub />} />
      <Route path="/games/math-blitz" element={<MathBlitz />} />
      <Route path="/games/word-rush"  element={<WordRush />} />
      <Route path="/games/gk-burst"   element={<GKBurst />} />

      {/* PROGRESS */}
      <Route path="/focus-mode" element={<FocusMode />} />
      <Route path="/journey"    element={<JourneyPassport />} />

      {/* COMMUNITY */}
      <Route path="/community" element={<CommunityHall />} />
      <Route path="/impact"    element={<LiveImpact />} />

      {/* SOCIAL */}
      <Route path="/referral" element={<ReferralPage />} />
      <Route path="/friends"  element={<FriendCircle />} />
      <Route path="/family"   element={<FamilyHub />} />

      {/* MENTOR */}
      <Route path="/mentor-hub"          element={<MentorHub />} />
      <Route path="/mentor-hub/cashback" element={<MentorCashback />} />
      <Route path="/mentor-hub/analytics" element={<MentorAnalytics />} />
      <Route path="/mentor-hub/coupons"  element={<CouponManager />} />

      {/* MONETISATION */}
      <Route path="/pro"    element={<PricingPage />} />
      <Route path="/wallet" element={<WalletPage />} />

      {/* EQUITY & ACCESSIBILITY */}
      <Route path="/equity"             element={<EquityTier />} />
      <Route path="/equity/verify"      element={<EquityVerify />} />
      <Route path="/accessibility"      element={<AccessMode />} />
      <Route path="/donate"             element={<DonationSec />} />
      <Route path="/circles/school"     element={<SchoolCircle />} />
      <Route path="/circles/sisterhood" element={<Sisterhood />} />

      {/* CENTRE */}
      <Route path="/centre/login"     element={<CentreLogin />} />
      <Route path="/centre/dashboard" element={<CentreDashboard />} />
      <Route path="/centre/students"  element={<StudentHistory />} />

      {/* ADMIN */}
      <Route path="/admin/login"     element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDash />} />

      {/* LEGAL / TOOLS / CONTACT */}
      <Route path="/terms"   element={<TermsConditions />} />
      <Route path="/privacy" element={<TermsConditions />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/tools/eligibility-calculator" element={<EligibilityCalculator />} />

      {/* CATCH ALL */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}
