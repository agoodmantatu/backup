#!/bin/bash
# ═══════════════════════════════════════════════════════════════
# BATCH E — Hall / Leaderboard / Tournaments
# Routes: /hall, /hall/create, /hall/leaderboard, /hall/:hallId,
#         /hall/:hallId/battle, /leaderboard, /tournaments
# Run from project root (e.g. ~/tryit-educations)
# ═══════════════════════════════════════════════════════════════

set -e

mkdir -p src/pages/hall
mkdir -p src/pages/leaderboard
mkdir -p src/pages/tournaments

echo "→ Creating src/pages/hall/HallHub.jsx"
cat > src/pages/hall/HallHub.jsx << 'EOF'
import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../../components/layout/AppLayout';
import { useAuth } from '../../context/AuthContext';

const SAMPLE_HALLS = [
  { id: 'hall-ssc-warriors', name: 'SSC Warriors', emoji: '⚔️', members: 1284, examFocus: 'SSC CGL' },
  { id: 'hall-bank-aspirants', name: 'Bank Aspirants Hub', emoji: '🏦', members: 956, examFocus: 'IBPS PO' },
  { id: 'hall-upsc-circle', name: 'UPSC Inner Circle', emoji: '🦅', members: 2103, examFocus: 'UPSC CSE' },
  { id: 'hall-neet-ninjas', name: 'NEET Ninjas', emoji: '🩺', members: 1740, examFocus: 'NEET UG' },
  { id: 'hall-gate-gurus', name: 'GATE Gurus', emoji: '⚙️', members: 612, examFocus: 'GATE CSE' },
  { id: 'hall-ielts-explorers', name: 'IELTS Explorers', emoji: '🌍', members: 438, examFocus: 'IELTS' },
];

export default function HallHub() {
  const { user } = useAuth();
  const navigate = useNavigate();
  if (!user) return null;

  return (
    <AppLayout title="The Hall">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl font-extrabold text-[#1E3A5F]">Find Your Tribe 🏛️</h2>
          <p className="text-slate-500 mt-1">Join a Hall, study together, and battle for glory.</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => navigate('/hall/leaderboard')}
            className="px-4 py-2 rounded-2xl border-2 border-[#1E3A5F] text-[#1E3A5F] font-bold hover:bg-[#1E3A5F] hover:text-white transition-all"
          >
            🏆 Global Leaderboard
          </button>
          <button
            onClick={() => navigate('/hall/create')}
            className="px-4 py-2 rounded-2xl bg-[#D4AF37] text-[#1E3A5F] font-bold shadow-md hover:bg-[#E8C84A] transition-all"
          >
            + Create a Hall
          </button>
        </div>
      </div>

      {SAMPLE_HALLS.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-md p-10 text-center">
          <div className="text-5xl mb-3">🏛️</div>
          <p className="text-slate-600 mb-4">No Halls yet — be the first to start one!</p>
          <button
            onClick={() => navigate('/hall/create')}
            className="px-5 py-2 rounded-2xl bg-[#1E3A5F] text-white font-bold"
          >
            Create a Hall →
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SAMPLE_HALLS.map((hall) => (
            <div
              key={hall.id}
              onClick={() => navigate(`/hall/${hall.id}`)}
              className="bg-white rounded-2xl shadow-md p-5 cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all border border-slate-100"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="text-4xl">{hall.emoji}</div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#FDF6E3] text-[#7C2D12]">
                  {hall.examFocus}
                </span>
              </div>
              <h3 className="font-display font-extrabold text-lg text-[#1E3A5F]">{hall.name}</h3>
              <p className="text-sm text-slate-500 mt-1">{hall.members.toLocaleString()} members</p>
            </div>
          ))}
        </div>
      )}
    </AppLayout>
  );
}
EOF

echo "→ Creating src/pages/hall/HallHome.jsx"
cat > src/pages/hall/HallHome.jsx << 'EOF'
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AppLayout from '../../components/layout/AppLayout';
import { useAuth } from '../../context/AuthContext';

const HALL_NAMES = {
  'hall-ssc-warriors': { name: 'SSC Warriors', emoji: '⚔️', examFocus: 'SSC CGL' },
  'hall-bank-aspirants': { name: 'Bank Aspirants Hub', emoji: '🏦', examFocus: 'IBPS PO' },
  'hall-upsc-circle': { name: 'UPSC Inner Circle', emoji: '🦅', examFocus: 'UPSC CSE' },
  'hall-neet-ninjas': { name: 'NEET Ninjas', emoji: '🩺', examFocus: 'NEET UG' },
  'hall-gate-gurus': { name: 'GATE Gurus', emoji: '⚙️', examFocus: 'GATE CSE' },
  'hall-ielts-explorers': { name: 'IELTS Explorers', emoji: '🌍', examFocus: 'IELTS' },
};

const SAMPLE_MEMBERS = [
  { name: 'Aarav Sharma', initials: 'AS', level: 8, levelTitle: 'The Gold King', emoji: '🏆', coinsThisWeek: 1240 },
  { name: 'Priya Nair', initials: 'PN', level: 7, levelTitle: 'Thalavan', emoji: '👑', coinsThisWeek: 980 },
  { name: 'Rohan Mehta', initials: 'RM', level: 6, levelTitle: 'Baahuveer', emoji: '🦁', coinsThisWeek: 845 },
  { name: 'Sneha Iyer', initials: 'SI', level: 5, levelTitle: 'The Grinder', emoji: '💪', coinsThisWeek: 712 },
  { name: 'Karthik Raj', initials: 'KR', level: 5, levelTitle: 'The Grinder', emoji: '💪', coinsThisWeek: 690 },
  { name: 'Divya Pillai', initials: 'DP', level: 4, levelTitle: 'The Gold Miner', emoji: '⛏️', coinsThisWeek: 540 },
  { name: 'Arjun Verma', initials: 'AV', level: 3, levelTitle: 'The Riser', emoji: '📈', coinsThisWeek: 410 },
];

const SAMPLE_ACTIVITY = [
  { who: 'Aarav Sharma', what: 'completed a Mock Test scoring 92%', time: '2h ago', emoji: '📝' },
  { who: 'Priya Nair', what: 'won a Hall Battle 🔥', time: '4h ago', emoji: '⚔️' },
  { who: 'Sneha Iyer', what: 'reached Level 5 — The Grinder 💪', time: '6h ago', emoji: '🎉' },
  { who: 'Karthik Raj', what: 'answered 3 questions in Guru Hub', time: '1d ago', emoji: '🙋' },
  { who: 'Rohan Mehta', what: 'maintained a 15-day streak 🔥', time: '1d ago', emoji: '🔥' },
];

export default function HallHome() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { hallId } = useParams();
  if (!user) return null;

  const hall = HALL_NAMES[hallId] || { name: 'Unknown Hall', emoji: '🏛️', examFocus: 'General' };
  const ranked = [...SAMPLE_MEMBERS].sort((a, b) => b.coinsThisWeek - a.coinsThisWeek);

  return (
    <AppLayout title={hall.name}>
      <div className="bg-gradient-to-r from-[#1E3A5F] to-[#0F2140] rounded-2xl shadow-md p-6 mb-6 flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <div className="text-5xl">{hall.emoji}</div>
          <div>
            <h2 className="font-display text-2xl font-extrabold text-white">{hall.name}</h2>
            <p className="text-[#E8C84A] text-sm mt-1">Focus: {hall.examFocus} · {SAMPLE_MEMBERS.length} members</p>
          </div>
        </div>
        <button
          onClick={() => navigate(`/hall/${hallId}/battle`)}
          className="px-6 py-3 rounded-2xl bg-[#D4AF37] text-[#1E3A5F] font-bold shadow-md hover:bg-[#E8C84A] transition-all"
        >
          ⚔️ Start Battle
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Members */}
        <div className="lg:col-span-1 bg-white rounded-2xl shadow-md p-5">
          <h3 className="font-display font-extrabold text-[#1E3A5F] mb-4">Members</h3>
          <div className="space-y-3">
            {SAMPLE_MEMBERS.map((m) => (
              <div key={m.name} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#1E3A5F] text-white flex items-center justify-center font-bold text-sm">
                  {m.initials}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-sm text-slate-700">{m.name}</p>
                  <p className="text-xs text-slate-400">{m.emoji} {m.levelTitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Feed */}
        <div className="lg:col-span-1 bg-white rounded-2xl shadow-md p-5">
          <h3 className="font-display font-extrabold text-[#1E3A5F] mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {SAMPLE_ACTIVITY.map((a, i) => (
              <div key={i} className="flex gap-3">
                <div className="text-2xl">{a.emoji}</div>
                <div>
                  <p className="text-sm text-slate-700">
                    <span className="font-bold">{a.who}</span> {a.what}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hall Leaderboard */}
        <div className="lg:col-span-1 bg-white rounded-2xl shadow-md p-5">
          <h3 className="font-display font-extrabold text-[#1E3A5F] mb-4">Hall Leaderboard (This Week)</h3>
          <div className="space-y-2">
            {ranked.map((m, i) => (
              <div key={m.name} className={`flex items-center justify-between p-2 rounded-xl ${i === 0 ? 'bg-[#FDF6E3]' : ''}`}>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-[#1E3A5F] w-6">{i + 1}</span>
                  <span className="text-sm font-bold text-slate-700">{m.name}</span>
                </div>
                <span className="text-sm font-bold text-[#D4AF37]">{m.coinsThisWeek} 🪙</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
EOF

echo "→ Creating src/pages/hall/CreateHall.jsx"
cat > src/pages/hall/CreateHall.jsx << 'EOF'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../../components/layout/AppLayout';
import { useAuth } from '../../context/AuthContext';

const EXAM_FOCUS_OPTIONS = [
  'SSC CGL', 'IBPS PO', 'UPSC CSE', 'NEET UG', 'JEE Main', 'GATE',
  'IELTS', 'TOEFL', 'Railways RRB', 'State PSC', 'Defence (NDA/CDS)', 'General Prep',
];

const EMOJI_OPTIONS = ['🏛️', '⚔️', '🦅', '🩺', '⚙️', '🌍', '🏦', '📚', '🎯', '🚀', '🦁', '👑'];

export default function CreateHall() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [examFocus, setExamFocus] = useState(EXAM_FOCUS_OPTIONS[0]);
  const [privacy, setPrivacy] = useState('public');
  const [emoji, setEmoji] = useState(EMOJI_OPTIONS[0]);

  if (!user) return null;

  const handleCreate = () => {
    if (!name.trim()) return;
    const newHallId = 'hall-' + Date.now();
    navigate(`/hall/${newHallId}`);
  };

  return (
    <AppLayout title="Create a Hall">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-md p-6 sm:p-8">
        <h2 className="font-display text-2xl font-extrabold text-[#1E3A5F] mb-1">Start Your Own Hall 🏛️</h2>
        <p className="text-slate-500 mb-6">Build a community around your exam goal.</p>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Hall Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. CGL Champions Tamil Nadu"
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/30 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What's this Hall about? Who should join?"
              rows={3}
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/30 outline-none resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Primary Exam Focus</label>
            <select
              value={examFocus}
              onChange={(e) => setExamFocus(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/30 outline-none bg-white"
            >
              {EXAM_FOCUS_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Privacy</label>
            <div className="flex gap-3">
              <button
                onClick={() => setPrivacy('public')}
                className={`flex-1 py-3 rounded-2xl font-bold border-2 transition-all ${
                  privacy === 'public' ? 'bg-[#1E3A5F] text-white border-[#1E3A5F]' : 'border-slate-200 text-slate-500'
                }`}
              >
                🌐 Public
              </button>
              <button
                onClick={() => setPrivacy('invite')}
                className={`flex-1 py-3 rounded-2xl font-bold border-2 transition-all ${
                  privacy === 'invite' ? 'bg-[#1E3A5F] text-white border-[#1E3A5F]' : 'border-slate-200 text-slate-500'
                }`}
              >
                🔒 Invite-only
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Hall Icon</label>
            <div className="grid grid-cols-6 sm:grid-cols-12 gap-2">
              {EMOJI_OPTIONS.map((e) => (
                <button
                  key={e}
                  onClick={() => setEmoji(e)}
                  className={`text-2xl p-2 rounded-2xl border-2 transition-all ${
                    emoji === e ? 'border-[#D4AF37] bg-[#FDF6E3]' : 'border-slate-200'
                  }`}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleCreate}
            disabled={!name.trim()}
            className="w-full py-3 rounded-2xl bg-[#D4AF37] text-[#1E3A5F] font-bold shadow-md hover:bg-[#E8C84A] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            🏛️ Create Hall
          </button>
        </div>
      </div>
    </AppLayout>
  );
}
EOF

echo "→ Creating src/pages/hall/BattleArena.jsx"
cat > src/pages/hall/BattleArena.jsx << 'EOF'
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

// TODO: replace with Supabase questions table query once populated
const SAMPLE_QUESTIONS = [
  { id: 'q1', question: 'Which article of the Indian Constitution abolishes untouchability?', options: ['Article 14', 'Article 17', 'Article 21', 'Article 32'], correct_answer: 'Article 17' },
  { id: 'q2', question: 'What is the value of 15% of 240?', options: ['32', '36', '40', '24'], correct_answer: '36' },
  { id: 'q3', question: 'The "Quit India" movement was launched in which year?', options: ['1940', '1942', '1945', '1939'], correct_answer: '1942' },
  { id: 'q4', question: 'Synonym of "Benevolent" is:', options: ['Cruel', 'Kind', 'Selfish', 'Lazy'], correct_answer: 'Kind' },
  { id: 'q5', question: "Which gas is most abundant in Earth's atmosphere?", options: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Hydrogen'], correct_answer: 'Nitrogen' },
];

const OPPONENT = { name: 'Karthik R.', initials: 'KR', emoji: '🦁' };

export default function BattleArena() {
  const { user, addCoins } = useAuth();
  const navigate = useNavigate();
  const { hallId } = useParams();

  const [currentQ, setCurrentQ] = useState(0);
  const [myScore, setMyScore] = useState(0);
  const [oppScore, setOppScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [finished, setFinished] = useState(false);
  const [oppAnswered, setOppAnswered] = useState(false);

  const total = SAMPLE_QUESTIONS.length;
  const q = SAMPLE_QUESTIONS[currentQ];

  useEffect(() => {
    setSelected(null);
    setAnswered(false);
    setOppAnswered(false);
    // Simulate opponent answering
    const t = setTimeout(() => {
      const oppCorrect = Math.random() < 0.6;
      if (oppCorrect) setOppScore((s) => s + 1);
      setOppAnswered(true);
    }, 1200 + Math.random() * 800);
    return () => clearTimeout(t);
  }, [currentQ]);

  if (!user) return null;

  const handleAnswer = (opt) => {
    if (answered) return;
    setSelected(opt);
    setAnswered(true);
    if (opt === q.correct_answer) setMyScore((s) => s + 1);
  };

  const handleNext = () => {
    if (currentQ + 1 < total) {
      setCurrentQ((c) => c + 1);
    } else {
      const won = myScore >= oppScore;
      const coins = won ? 60 + Math.floor(Math.random() * 41) : 20 + Math.floor(Math.random() * 21);
      if (typeof addCoins === 'function') addCoins(coins);
      setFinished(true);
    }
  };

  if (finished) {
    const won = myScore >= oppScore;
    const coins = won ? 60 : 30;
    return (
      <div className="min-h-screen bg-[#0F2140] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="text-6xl mb-4">{won ? '🏆' : '😤'}</div>
          <h2 className="font-display text-3xl font-extrabold text-[#1E3A5F] mb-2">
            {won ? 'Victory!' : 'So Close!'}
          </h2>
          <p className="text-slate-500 mb-6">
            You scored {myScore}/{total} · {OPPONENT.name} scored {oppScore}/{total}
          </p>
          <div className="bg-[#FDF6E3] rounded-2xl p-4 mb-6">
            <p className="text-sm text-slate-600">Coins Earned</p>
            <p className="text-3xl font-extrabold text-[#D4AF37]">+{coins} 🪙</p>
          </div>
          <button
            onClick={() => navigate(`/hall/${hallId}`)}
            className="w-full py-3 rounded-2xl bg-[#1E3A5F] text-white font-bold hover:bg-[#0F2140] transition-all"
          >
            ⬅ Back to Hall
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F2140] p-4 sm:p-8 flex flex-col">
      {/* Top scoreboard */}
      <div className="flex items-center justify-between max-w-3xl w-full mx-auto mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-[#D4AF37] text-[#1E3A5F] flex items-center justify-center font-extrabold">
            {user.initials || 'YOU'}
          </div>
          <div>
            <p className="text-white font-bold">You</p>
            <p className="text-[#E8C84A] text-sm">{myScore} pts</p>
          </div>
        </div>
        <div className="text-white font-display font-extrabold text-xl">VS</div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-white font-bold">{OPPONENT.name}</p>
            <p className="text-[#E8C84A] text-sm">{oppScore} pts</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-[#7C2D12] text-white flex items-center justify-center font-extrabold">
            {OPPONENT.initials}
          </div>
        </div>
      </div>

      {/* Score bars */}
      <div className="max-w-3xl w-full mx-auto mb-8 space-y-2">
        <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-[#D4AF37] transition-all duration-500" style={{ width: `${(myScore / total) * 100}%` }} />
        </div>
        <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-[#7C2D12] transition-all duration-500" style={{ width: `${(oppScore / total) * 100}%` }} />
        </div>
      </div>

      {/* Question */}
      <div className="max-w-3xl w-full mx-auto bg-white rounded-2xl shadow-2xl p-6 sm:p-8 flex-1">
        <p className="text-xs font-bold text-[#D4AF37] mb-2">Question {currentQ + 1} of {total}</p>
        <h3 className="font-display text-xl font-extrabold text-[#1E3A5F] mb-6">{q.question}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {q.options.map((opt) => {
            let style = 'border-slate-200 hover:border-[#D4AF37]';
            if (answered) {
              if (opt === q.correct_answer) style = 'border-emerald-500 bg-emerald-50';
              else if (opt === selected) style = 'border-red-400 bg-red-50';
              else style = 'border-slate-200 opacity-60';
            }
            return (
              <button
                key={opt}
                onClick={() => handleAnswer(opt)}
                className={`text-left px-4 py-3 rounded-2xl border-2 font-semibold text-slate-700 transition-all ${style}`}
              >
                {opt}
              </button>
            );
          })}
        </div>

        {answered && (
          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm text-slate-500">
              {oppAnswered ? `${OPPONENT.name} has answered.` : `${OPPONENT.name} is thinking...`}
            </p>
            <button
              onClick={handleNext}
              className="px-6 py-2 rounded-2xl bg-[#1E3A5F] text-white font-bold hover:bg-[#0F2140] transition-all"
            >
              {currentQ + 1 < total ? 'Next →' : 'Finish 🏁'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
EOF

echo "→ Creating src/pages/hall/HallLeaderboard.jsx"
cat > src/pages/hall/HallLeaderboard.jsx << 'EOF'
import React from 'react';
import AppLayout from '../../components/layout/AppLayout';
import { useAuth } from '../../context/AuthContext';

const SAMPLE_LEADERBOARD = [
  { rank: 1, name: 'Aarav Sharma', state: 'Maharashtra', hall: 'SSC Warriors', score: 12840, levelEmoji: '🏆', levelTitle: 'The Gold King' },
  { rank: 2, name: 'Priya Nair', state: 'Kerala', hall: 'Bank Aspirants Hub', score: 11920, levelEmoji: '👑', levelTitle: 'Thalavan' },
  { rank: 3, name: 'Rohan Mehta', state: 'Gujarat', hall: 'UPSC Inner Circle', score: 11430, levelEmoji: '👑', levelTitle: 'Thalavan' },
  { rank: 4, name: 'Sneha Iyer', state: 'Tamil Nadu', hall: 'NEET Ninjas', score: 9870, levelEmoji: '🦁', levelTitle: 'Baahuveer' },
  { rank: 5, name: 'Karthik Raj', state: 'Tamil Nadu', hall: 'SSC Warriors', score: 9210, levelEmoji: '🦁', levelTitle: 'Baahuveer' },
  { rank: 6, name: 'Divya Pillai', state: 'Karnataka', hall: 'GATE Gurus', score: 8430, levelEmoji: '💪', levelTitle: 'The Grinder' },
  { rank: 7, name: 'Arjun Verma', state: 'Delhi', hall: 'IELTS Explorers', score: 7650, levelEmoji: '💪', levelTitle: 'The Grinder' },
  { rank: 8, name: 'Meera Joshi', state: 'Rajasthan', hall: 'Bank Aspirants Hub', score: 6980, levelEmoji: '⛏️', levelTitle: 'The Gold Miner' },
];

const RANK_STYLES = {
  1: 'bg-gradient-to-r from-[#D4AF37] to-[#E8C84A] text-[#1E3A5F]',
  2: 'bg-gradient-to-r from-slate-300 to-slate-200 text-slate-700',
  3: 'bg-gradient-to-r from-[#CD7F32]/40 to-[#E8C84A]/40 text-[#7C2D12]',
};

export default function HallLeaderboard() {
  const { user } = useAuth();
  if (!user) return null;

  const isUserRanked = SAMPLE_LEADERBOARD.some((r) => r.name === user.name);

  return (
    <AppLayout title="Global Hall Leaderboard">
      <div className="bg-white rounded-2xl shadow-md p-5 sm:p-6">
        <h2 className="font-display text-2xl font-extrabold text-[#1E3A5F] mb-1">🏆 Global Leaderboard</h2>
        <p className="text-slate-500 mb-6">Top performers across all Halls — updated weekly.</p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-400 border-b border-slate-100">
                <th className="py-2 pr-4">Rank</th>
                <th className="py-2 pr-4">Name</th>
                <th className="py-2 pr-4">State</th>
                <th className="py-2 pr-4">Hall</th>
                <th className="py-2 pr-4">Level</th>
                <th className="py-2 pr-4 text-right">Score</th>
              </tr>
            </thead>
            <tbody>
              {SAMPLE_LEADERBOARD.map((row) => {
                const isMe = row.name === user.name;
                return (
                  <tr key={row.rank} className={`border-b border-slate-50 ${isMe ? 'bg-[#FDF6E3]' : ''}`}>
                    <td className="py-3 pr-4">
                      <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-extrabold text-xs ${RANK_STYLES[row.rank] || 'bg-slate-100 text-slate-500'}`}>
                        {row.rank}
                      </span>
                    </td>
                    <td className="py-3 pr-4 font-bold text-slate-700">
                      {row.name} {isMe && <span className="text-[#D4AF37]">(You)</span>}
                    </td>
                    <td className="py-3 pr-4 text-slate-500">{row.state}</td>
                    <td className="py-3 pr-4 text-slate-500">{row.hall}</td>
                    <td className="py-3 pr-4">
                      <span className="text-xs font-bold px-2 py-1 rounded-full bg-[#1E3A5F]/5 text-[#1E3A5F]">
                        {row.levelEmoji} {row.levelTitle}
                      </span>
                    </td>
                    <td className="py-3 pr-4 text-right font-extrabold text-[#D4AF37]">{row.score.toLocaleString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {!isUserRanked && (
          <div className="mt-6 bg-[#FDF6E3] rounded-2xl p-4 text-center">
            <p className="text-slate-600">You're not ranked yet — join a Hall and start earning! 🏛️</p>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
EOF

echo "→ Creating src/pages/leaderboard/Leaderboard.jsx"
cat > src/pages/leaderboard/Leaderboard.jsx << 'EOF'
import React, { useState, useEffect } from 'react';
import AppLayout from '../../components/layout/AppLayout';
import { useAuth } from '../../context/AuthContext';

const STATES = ['All States', 'Tamil Nadu', 'Maharashtra', 'Kerala', 'Karnataka', 'Delhi', 'Gujarat', 'Rajasthan', 'Uttar Pradesh', 'West Bengal'];

const SAMPLE_RANKINGS = [
  { rank: 1, name: 'Aarav Sharma', initials: 'AS', state: 'Maharashtra', exam: 'SSC CGL', score: 12840, levelEmoji: '🏆', levelTitle: 'The Gold King' },
  { rank: 2, name: 'Priya Nair', initials: 'PN', state: 'Kerala', exam: 'IBPS PO', score: 11920, levelEmoji: '👑', levelTitle: 'Thalavan' },
  { rank: 3, name: 'Rohan Mehta', initials: 'RM', state: 'Gujarat', exam: 'UPSC CSE', score: 11430, levelEmoji: '👑', levelTitle: 'Thalavan' },
  { rank: 4, name: 'Sneha Iyer', initials: 'SI', state: 'Tamil Nadu', exam: 'NEET UG', score: 9870, levelEmoji: '🦁', levelTitle: 'Baahuveer' },
  { rank: 5, name: 'Karthik Raj', initials: 'KR', state: 'Tamil Nadu', exam: 'SSC CGL', score: 9210, levelEmoji: '🦁', levelTitle: 'Baahuveer' },
  { rank: 6, name: 'Divya Pillai', initials: 'DP', state: 'Karnataka', exam: 'GATE', score: 8430, levelEmoji: '💪', levelTitle: 'The Grinder' },
  { rank: 7, name: 'Arjun Verma', initials: 'AV', state: 'Delhi', exam: 'IELTS', score: 7650, levelEmoji: '💪', levelTitle: 'The Grinder' },
  { rank: 8, name: 'Meera Joshi', initials: 'MJ', state: 'Rajasthan', exam: 'IBPS PO', score: 6980, levelEmoji: '⛏️', levelTitle: 'The Gold Miner' },
  { rank: 9, name: 'Vikram Singh', initials: 'VS', state: 'Uttar Pradesh', exam: 'SSC CGL', score: 6210, levelEmoji: '⛏️', levelTitle: 'The Gold Miner' },
  { rank: 10, name: 'Ananya Roy', initials: 'AR', state: 'West Bengal', exam: 'NEET UG', score: 5430, levelEmoji: '📈', levelTitle: 'The Riser' },
];

export default function Leaderboard() {
  const { user } = useAuth();
  const [examFilter, setExamFilter] = useState('All Exams');
  const [stateFilter, setStateFilter] = useState('All States');
  const [examOptions, setExamOptions] = useState(['All Exams']);

  useEffect(() => {
    if (user?.exams?.length) {
      setExamOptions(['All Exams', ...user.exams.map((e) => e.name)]);
    } else {
      fetch('/data/exams.json')
        .then((res) => res.json())
        .then((data) => {
          const names = (data.exams || []).slice(0, 12).map((e) => e.name);
          setExamOptions(['All Exams', ...names]);
        })
        .catch(() => setExamOptions(['All Exams', 'SSC CGL', 'IBPS PO', 'UPSC CSE', 'NEET UG', 'GATE', 'IELTS']));
    }
  }, [user]);

  if (!user) return null;

  const filtered = SAMPLE_RANKINGS.filter((row) => {
    const examMatch = examFilter === 'All Exams' || row.exam === examFilter;
    const stateMatch = stateFilter === 'All States' || row.state === stateFilter;
    return examMatch && stateMatch;
  });

  const isUserRanked = user.rank !== null && user.rank !== undefined;

  return (
    <AppLayout title="Leaderboard">
      <div className="bg-white rounded-2xl shadow-md p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h2 className="font-display text-2xl font-extrabold text-[#1E3A5F] mb-1">🇮🇳 All-India Ranking</h2>
            <p className="text-slate-500">See how you stack up nationwide.</p>
          </div>
          <div className="flex gap-3">
            <select
              value={examFilter}
              onChange={(e) => setExamFilter(e.target.value)}
              className="px-3 py-2 rounded-2xl border border-slate-200 text-sm bg-white focus:border-[#D4AF37] outline-none"
            >
              {examOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            <select
              value={stateFilter}
              onChange={(e) => setStateFilter(e.target.value)}
              className="px-3 py-2 rounded-2xl border border-slate-200 text-sm bg-white focus:border-[#D4AF37] outline-none"
            >
              {STATES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-10">
            <div className="text-5xl mb-3">🔍</div>
            <p className="text-slate-500">No rankings found for this filter yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-400 border-b border-slate-100">
                  <th className="py-2 pr-4">Rank</th>
                  <th className="py-2 pr-4">Name</th>
                  <th className="py-2 pr-4">State</th>
                  <th className="py-2 pr-4">Exam</th>
                  <th className="py-2 pr-4">Level</th>
                  <th className="py-2 pr-4 text-right">Score</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((row) => (
                  <tr key={row.rank} className="border-b border-slate-50">
                    <td className="py-3 pr-4 font-extrabold text-[#1E3A5F]">#{row.rank}</td>
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-[#1E3A5F] text-white flex items-center justify-center text-xs font-bold">
                          {row.initials}
                        </div>
                        <span className="font-bold text-slate-700">{row.name}</span>
                      </div>
                    </td>
                    <td className="py-3 pr-4 text-slate-500">{row.state}</td>
                    <td className="py-3 pr-4 text-slate-500">{row.exam}</td>
                    <td className="py-3 pr-4">
                      <span className="text-xs font-bold px-2 py-1 rounded-full bg-[#1E3A5F]/5 text-[#1E3A5F]">
                        {row.levelEmoji} {row.levelTitle}
                      </span>
                    </td>
                    <td className="py-3 pr-4 text-right font-extrabold text-[#D4AF37]">{row.score.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Your rank */}
        <div className="mt-6 sticky bottom-0">
          {isUserRanked ? (
            <div className="bg-[#1E3A5F] rounded-2xl p-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#D4AF37] text-[#1E3A5F] flex items-center justify-center text-xs font-extrabold">
                  {user.initials}
                </div>
                <div>
                  <p className="font-bold">{user.name} (You)</p>
                  <p className="text-xs text-[#E8C84A]">{user.levelEmoji} {user.levelTitle}</p>
                </div>
              </div>
              <p className="font-extrabold text-[#D4AF37]">Rank #{user.rank}</p>
            </div>
          ) : (
            <div className="bg-[#FDF6E3] rounded-2xl p-4 text-center">
              <p className="text-slate-600">Complete a test to get ranked! 📝</p>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
EOF

echo "→ Creating src/pages/tournaments/Tournaments.jsx"
cat > src/pages/tournaments/Tournaments.jsx << 'EOF'
import React, { useState } from 'react';
import AppLayout from '../../components/layout/AppLayout';
import { useAuth } from '../../context/AuthContext';

const SAMPLE_TOURNAMENTS = [
  { id: 't1', name: 'SSC CGL Mega Mock Marathon', exam: 'SSC CGL', prize: 'Top 100 get exclusive "Champion" badge 🏅', start: '2026-06-20', end: '2026-06-25', participants: 4820, status: 'upcoming' },
  { id: 't2', name: 'Banking Awareness Sprint', exam: 'IBPS PO', prize: 'Top 50 featured on Global Leaderboard', start: '2026-06-15', end: '2026-06-18', participants: 2150, status: 'live' },
  { id: 't3', name: 'NEET Biology Blitz', exam: 'NEET UG', prize: 'Top 200 get "Bio Champion" badge 🧬', start: '2026-06-10', end: '2026-06-13', participants: 6310, status: 'live' },
  { id: 't4', name: 'UPSC Prelims Power Hour', exam: 'UPSC CSE', prize: 'Top 100 get exclusive badge + certificate', start: '2026-07-01', end: '2026-07-05', participants: 1980, status: 'upcoming' },
  { id: 't5', name: 'GATE Quant Quest', exam: 'GATE', prize: 'Top 50 get "Quant Master" badge', start: '2026-05-20', end: '2026-05-25', participants: 1240, status: 'past' },
  { id: 't6', name: 'IELTS Vocabulary Vault', exam: 'IELTS', prize: 'Top 100 featured profile spotlight', start: '2026-05-01', end: '2026-05-10', participants: 870, status: 'past' },
];

const TABS = [
  { id: 'upcoming', label: 'Upcoming' },
  { id: 'live', label: 'Live' },
  { id: 'past', label: 'Past' },
];

export default function Tournaments() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('live');
  const [joined, setJoined] = useState({});

  if (!user) return null;

  const filtered = SAMPLE_TOURNAMENTS.filter((t) => t.status === activeTab);

  const toggleJoin = (id) => {
    setJoined((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const formatDate = (d) =>
    new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });

  return (
    <AppLayout title="Tournaments">
      <div className="mb-6">
        <h2 className="font-display text-2xl font-extrabold text-[#1E3A5F] mb-1">🏆 Tournaments</h2>
        <p className="text-slate-500">Compete, climb the ranks, and earn exclusive badges — entry is always free.</p>
      </div>

      <div className="flex gap-2 mb-6 bg-white rounded-2xl p-1 shadow-md w-fit">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2 rounded-xl font-bold text-sm transition-all ${
              activeTab === tab.id ? 'bg-[#1E3A5F] text-white' : 'text-slate-500 hover:text-[#1E3A5F]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-md p-10 text-center">
          <div className="text-5xl mb-3">🗓️</div>
          <p className="text-slate-500">No {activeTab} tournaments right now — check back soon!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {filtered.map((t) => (
            <div key={t.id} className="bg-white rounded-2xl shadow-md p-5 border border-slate-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#FDF6E3] text-[#7C2D12]">{t.exam}</span>
                {t.status === 'live' && (
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-red-100 text-red-600 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /> LIVE
                  </span>
                )}
              </div>
              <h3 className="font-display font-extrabold text-lg text-[#1E3A5F] mb-1">{t.name}</h3>
              <p className="text-sm text-slate-500 mb-3">🎁 {t.prize}</p>
              <div className="flex items-center justify-between text-sm text-slate-400 mb-4">
                <span>📅 {formatDate(t.start)} – {formatDate(t.end)}</span>
                <span>👥 {t.participants.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-600">Entry: Free 🎉</span>
                {t.status !== 'past' ? (
                  <button
                    onClick={() => toggleJoin(t.id)}
                    className={`px-4 py-2 rounded-2xl font-bold text-sm transition-all ${
                      joined[t.id]
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-[#D4AF37] text-[#1E3A5F] hover:bg-[#E8C84A]'
                    }`}
                  >
                    {joined[t.id] ? 'Joined ✓' : 'Join'}
                  </button>
                ) : (
                  <span className="text-xs font-bold text-slate-400 px-4 py-2 rounded-2xl bg-slate-50">Ended</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </AppLayout>
  );
}
EOF

echo ""
echo "✅ BATCH E complete — 7 files created:"
echo "   src/pages/hall/HallHub.jsx          → /hall"
echo "   src/pages/hall/HallHome.jsx         → /hall/:hallId"
echo "   src/pages/hall/CreateHall.jsx       → /hall/create"
echo "   src/pages/hall/BattleArena.jsx      → /hall/:hallId/battle (full-screen, no AppLayout)"
echo "   src/pages/hall/HallLeaderboard.jsx  → /hall/leaderboard"
echo "   src/pages/leaderboard/Leaderboard.jsx → /leaderboard"
echo "   src/pages/tournaments/Tournaments.jsx → /tournaments"
echo ""
echo "⚠️  NEXT STEP: Add these 7 routes + imports to src/App.jsx:"
echo "   import HallHub from './pages/hall/HallHub'"
echo "   import HallHome from './pages/hall/HallHome'"
echo "   import CreateHall from './pages/hall/CreateHall'"
echo "   import BattleArena from './pages/hall/BattleArena'"
echo "   import HallLeaderboard from './pages/hall/HallLeaderboard'"
echo "   import Leaderboard from './pages/leaderboard/Leaderboard'"
echo "   import Tournaments from './pages/tournaments/Tournaments'"
echo ""
echo "   <Route path='/hall' element={<HallHub />} />"
echo "   <Route path='/hall/create' element={<CreateHall />} />"
echo "   <Route path='/hall/leaderboard' element={<HallLeaderboard />} />"
echo "   <Route path='/hall/:hallId' element={<HallHome />} />"
echo "   <Route path='/hall/:hallId/battle' element={<BattleArena />} />"
echo "   <Route path='/leaderboard' element={<Leaderboard />} />"
echo "   <Route path='/tournaments' element={<Tournaments />} />"
