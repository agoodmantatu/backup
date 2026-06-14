#!/bin/bash
# ═══════════════════════════════════════════════════════════════
# BATCH F — Classroom / Ebooks
# Routes: /classroom, /classroom/planner, /classroom/pdf,
#         /ebooks, /ebooks/my, /ebooks/upload, /ebooks/:ebookId
# Run from project root (e.g. ~/tryit-educations)
# ═══════════════════════════════════════════════════════════════

set -e

mkdir -p src/pages/classroom
mkdir -p src/pages/ebooks

echo "→ Creating src/pages/classroom/ClassroomHub.jsx"
cat > src/pages/classroom/ClassroomHub.jsx << 'EOF'
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../../components/layout/AppLayout';
import { useAuth } from '../../context/AuthContext';

const HUB_CARDS = [
  { id: 'planner', title: 'Study Planner', desc: 'Plan your week, track sessions, build consistency.', emoji: '🗓️', color: 'from-[#1E3A5F] to-[#0F2140]', path: '/classroom/planner' },
  { id: 'pdf', title: 'PDF Library', desc: 'Notes, previous papers, and study material — all in one place.', emoji: '📚', color: 'from-[#064E3B] to-[#0B6B53]', path: '/classroom/pdf' },
  { id: 'ebooks', title: 'Ebook Store', desc: 'Browse, read, and collect ebooks for every exam.', emoji: '📖', color: 'from-[#7C2D12] to-[#9A3F1F]', path: '/ebooks' },
];

export default function ClassroomHub() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [todaysPlan, setTodaysPlan] = useState([]);

  useEffect(() => {
    if (!user) return;
    try {
      const stored = JSON.parse(localStorage.getItem(`studyBlocks_${user.email}`) || '[]');
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const today = days[new Date().getDay()];
      setTodaysPlan(stored.filter((b) => b.day === today).slice(0, 3));
    } catch {
      setTodaysPlan([]);
    }
  }, [user]);

  if (!user) return null;

  return (
    <AppLayout title="Classroom">
      <div className="mb-6">
        <h2 className="font-display text-2xl font-extrabold text-[#1E3A5F] mb-1">Your Classroom 🎓</h2>
        <p className="text-slate-500">Plan, study, and read — everything you need to prep.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        {HUB_CARDS.map((c) => (
          <div
            key={c.id}
            onClick={() => navigate(c.path)}
            className={`bg-gradient-to-br ${c.color} rounded-2xl shadow-md p-6 cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all text-white`}
          >
            <div className="text-4xl mb-3">{c.emoji}</div>
            <h3 className="font-display font-extrabold text-lg mb-1">{c.title}</h3>
            <p className="text-sm text-white/80">{c.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-md p-5 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-extrabold text-[#1E3A5F]">Today's Plan</h3>
          <button onClick={() => navigate('/classroom/planner')} className="text-sm font-bold text-[#1E3A5F] hover:text-[#D4AF37]">
            Open Planner →
          </button>
        </div>

        {todaysPlan.length === 0 ? (
          <div className="text-center py-6">
            <div className="text-4xl mb-2">🗓️</div>
            <p className="text-slate-500 mb-4">No study blocks for today — plan your day!</p>
            <button onClick={() => navigate('/classroom/planner')} className="px-5 py-2 rounded-2xl bg-[#D4AF37] text-[#1E3A5F] font-bold">
              + Add Study Block
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {todaysPlan.map((b) => (
              <div key={b.id} className="flex items-center justify-between p-3 rounded-2xl bg-[#F8FAFC]">
                <div>
                  <p className="font-bold text-slate-700">{b.subject}</p>
                  <p className="text-xs text-slate-400">{b.time} · {b.duration} min</p>
                </div>
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${b.done ? 'bg-emerald-100 text-emerald-700' : 'bg-[#FDF6E3] text-[#7C2D12]'}`}>
                  {b.done ? 'Done ✓' : 'Pending'}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
EOF

echo "→ Creating src/pages/classroom/StudyPlanner.jsx"
cat > src/pages/classroom/StudyPlanner.jsx << 'EOF'
import React, { useState, useEffect } from 'react';
import AppLayout from '../../components/layout/AppLayout';
import { useAuth } from '../../context/AuthContext';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const SAMPLE_BLOCKS = [
  { id: 'b1', day: 'Mon', subject: 'Quantitative Aptitude', time: '6:00 AM', duration: 60, done: false },
  { id: 'b2', day: 'Mon', subject: 'English Comprehension', time: '8:00 PM', duration: 45, done: true },
  { id: 'b3', day: 'Tue', subject: 'General Awareness', time: '7:00 AM', duration: 30, done: false },
  { id: 'b4', day: 'Wed', subject: 'Reasoning', time: '6:30 AM', duration: 60, done: false },
  { id: 'b5', day: 'Thu', subject: 'Current Affairs', time: '8:00 PM', duration: 30, done: true },
  { id: 'b6', day: 'Fri', subject: 'Mock Test', time: '5:00 PM', duration: 120, done: false },
  { id: 'b7', day: 'Sat', subject: 'Revision', time: '9:00 AM', duration: 90, done: false },
];

export default function StudyPlanner() {
  const { user } = useAuth();
  const [blocks, setBlocks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ subject: '', day: 'Mon', time: '', duration: 30 });

  const storageKey = user ? `studyBlocks_${user.email}` : null;

  useEffect(() => {
    if (!storageKey) return;
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      setBlocks(JSON.parse(stored));
    } else {
      setBlocks(SAMPLE_BLOCKS);
      localStorage.setItem(storageKey, JSON.stringify(SAMPLE_BLOCKS));
    }
  }, [storageKey]);

  if (!user) return null;

  const persist = (next) => {
    setBlocks(next);
    if (storageKey) localStorage.setItem(storageKey, JSON.stringify(next));
  };

  const toggleDone = (id) => {
    persist(blocks.map((b) => (b.id === id ? { ...b, done: !b.done } : b)));
  };

  const handleAdd = () => {
    if (!form.subject.trim() || !form.time.trim()) return;
    const newBlock = { id: 'b' + Date.now(), ...form, done: false };
    persist([...blocks, newBlock]);
    setForm({ subject: '', day: 'Mon', time: '', duration: 30 });
    setShowForm(false);
  };

  return (
    <AppLayout title="Study Planner">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h2 className="font-display text-2xl font-extrabold text-[#1E3A5F] mb-1">Weekly Study Plan 🗓️</h2>
          <p className="text-slate-500">Build a consistent routine — small steps, big results.</p>
        </div>
        <button
          onClick={() => setShowForm((s) => !s)}
          className="px-4 py-2 rounded-2xl bg-[#D4AF37] text-[#1E3A5F] font-bold shadow-md hover:bg-[#E8C84A] transition-all"
        >
          + Add Study Block
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl shadow-md p-5 mb-6">
          <h3 className="font-display font-extrabold text-[#1E3A5F] mb-4">New Study Block</h3>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <input
              type="text"
              placeholder="Subject"
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              className="px-4 py-2 rounded-2xl border border-slate-200 focus:border-[#D4AF37] outline-none sm:col-span-2"
            />
            <select
              value={form.day}
              onChange={(e) => setForm({ ...form, day: e.target.value })}
              className="px-4 py-2 rounded-2xl border border-slate-200 focus:border-[#D4AF37] outline-none bg-white"
            >
              {DAYS.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="e.g. 6:00 AM"
              value={form.time}
              onChange={(e) => setForm({ ...form, time: e.target.value })}
              className="px-4 py-2 rounded-2xl border border-slate-200 focus:border-[#D4AF37] outline-none"
            />
          </div>
          <div className="flex items-center gap-3 mt-3">
            <label className="text-sm font-bold text-slate-600">Duration (min)</label>
            <input
              type="number"
              min="10"
              step="5"
              value={form.duration}
              onChange={(e) => setForm({ ...form, duration: Number(e.target.value) })}
              className="w-24 px-3 py-2 rounded-2xl border border-slate-200 focus:border-[#D4AF37] outline-none"
            />
            <button
              onClick={handleAdd}
              className="ml-auto px-5 py-2 rounded-2xl bg-[#1E3A5F] text-white font-bold hover:bg-[#0F2140] transition-all"
            >
              Add Block
            </button>
          </div>
        </div>
      )}

      {/* Weekly grid */}
      <div className="grid grid-cols-1 sm:grid-cols-7 gap-3">
        {DAYS.map((day) => {
          const dayBlocks = blocks.filter((b) => b.day === day);
          return (
            <div key={day} className="bg-white rounded-2xl shadow-md p-3 min-h-[160px]">
              <h4 className="font-display font-extrabold text-[#1E3A5F] text-sm mb-3 text-center">{day}</h4>
              {dayBlocks.length === 0 ? (
                <p className="text-xs text-slate-400 text-center mt-6">No sessions</p>
              ) : (
                <div className="space-y-2">
                  {dayBlocks.map((b) => (
                    <div
                      key={b.id}
                      className={`rounded-xl p-2 text-xs ${b.done ? 'bg-emerald-50 text-emerald-700' : 'bg-[#FDF6E3] text-[#7C2D12]'}`}
                    >
                      <div className="flex items-start gap-2">
                        <input
                          type="checkbox"
                          checked={b.done}
                          onChange={() => toggleDone(b.id)}
                          className="mt-0.5 accent-[#D4AF37]"
                        />
                        <div>
                          <p className="font-bold">{b.subject}</p>
                          <p className="opacity-70">{b.time} · {b.duration}m</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </AppLayout>
  );
}
EOF

echo "→ Creating src/pages/classroom/PDFLibrary.jsx"
cat > src/pages/classroom/PDFLibrary.jsx << 'EOF'
import React, { useState } from 'react';
import AppLayout from '../../components/layout/AppLayout';
import { useAuth } from '../../context/AuthContext';

// TODO: replace with Supabase study_materials table query once populated
const SAMPLE_MATERIALS = [
  { id: 'm1', title: 'SSC CGL Maths Shortcuts', subject: 'Quantitative Aptitude', exam: 'SSC CGL', size: '4.2 MB', tier: 'Free' },
  { id: 'm2', title: 'IBPS PO Previous Year Papers (2020-25)', subject: 'General', exam: 'IBPS PO', size: '12.8 MB', tier: 'Premium' },
  { id: 'm3', title: 'NEET Biology NCERT Summary', subject: 'Biology', exam: 'NEET UG', size: '6.5 MB', tier: 'Free' },
  { id: 'm4', title: 'UPSC Prelims Polity Notes', subject: 'Polity', exam: 'UPSC CSE', size: '9.1 MB', tier: 'Premium' },
  { id: 'm5', title: 'GATE CSE Algorithms Crash Course', subject: 'Computer Science', exam: 'GATE', size: '7.4 MB', tier: 'Free' },
  { id: 'm6', title: 'IELTS Writing Task 2 Templates', subject: 'English', exam: 'IELTS', size: '2.1 MB', tier: 'Free' },
  { id: 'm7', title: 'Railways RRB Reasoning Practice Set', subject: 'Reasoning', exam: 'Railways RRB', size: '5.3 MB', tier: 'Premium' },
  { id: 'm8', title: 'Defence NDA Maths Formula Book', subject: 'Mathematics', exam: 'NDA/CDS', size: '3.6 MB', tier: 'Free' },
  { id: 'm9', title: 'State PSC Current Affairs Digest', subject: 'General Awareness', exam: 'State PSC', size: '8.0 MB', tier: 'Premium' },
  { id: 'm10', title: 'Teaching Exams Pedagogy Notes', subject: 'Pedagogy', exam: 'CTET/TET', size: '4.9 MB', tier: 'Free' },
];

export default function PDFLibrary() {
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const [examFilter, setExamFilter] = useState('All Exams');

  if (!user) return null;

  const examOptions = ['All Exams', ...new Set(SAMPLE_MATERIALS.map((m) => m.exam))];

  const filtered = SAMPLE_MATERIALS.filter((m) => {
    const searchMatch =
      m.title.toLowerCase().includes(search.toLowerCase()) ||
      m.subject.toLowerCase().includes(search.toLowerCase());
    const examMatch = examFilter === 'All Exams' || m.exam === examFilter;
    return searchMatch && examMatch;
  });

  return (
    <AppLayout title="PDF Library">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="font-display text-2xl font-extrabold text-[#1E3A5F] mb-1">PDF Library 📚</h2>
          <p className="text-slate-500">Notes, previous papers, and study material — free or premium.</p>
        </div>
        <div className="flex gap-3">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search materials..."
            className="px-4 py-2 rounded-2xl border border-slate-200 focus:border-[#D4AF37] outline-none w-48"
          />
          <select
            value={examFilter}
            onChange={(e) => setExamFilter(e.target.value)}
            className="px-3 py-2 rounded-2xl border border-slate-200 text-sm bg-white focus:border-[#D4AF37] outline-none"
          >
            {examOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-md p-10 text-center">
          <div className="text-5xl mb-3">🔍</div>
          <p className="text-slate-500">No materials found — try a different search or filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((m) => (
            <div key={m.id} className="bg-white rounded-2xl shadow-md p-5 border border-slate-100">
              <div className="flex items-center justify-between mb-3">
                <span className="text-3xl">📄</span>
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full ${
                    m.tier === 'Premium' ? 'bg-[#3B2A6B]/10 text-[#3B2A6B]' : 'bg-emerald-100 text-emerald-700'
                  }`}
                >
                  {m.tier === 'Premium' ? '⭐ Premium' : '🎉 Free'}
                </span>
              </div>
              <h3 className="font-display font-extrabold text-[#1E3A5F] mb-1">{m.title}</h3>
              <p className="text-sm text-slate-500 mb-3">{m.subject} · {m.exam}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">{m.size}</span>
                <div className="flex gap-2">
                  <button className="px-3 py-1.5 rounded-2xl border-2 border-[#1E3A5F] text-[#1E3A5F] text-sm font-bold hover:bg-[#1E3A5F] hover:text-white transition-all">
                    View
                  </button>
                  <button className="px-3 py-1.5 rounded-2xl bg-[#D4AF37] text-[#1E3A5F] text-sm font-bold hover:bg-[#E8C84A] transition-all">
                    Download
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </AppLayout>
  );
}
EOF

echo "→ Creating src/pages/ebooks/EbookStore.jsx"
cat > src/pages/ebooks/EbookStore.jsx << 'EOF'
import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../../components/layout/AppLayout';
import { useAuth } from '../../context/AuthContext';

const SAMPLE_EBOOKS = [
  { id: 'eb1', title: 'Mastering Quantitative Aptitude', author: 'Dr. R. Krishnan', tag: 'SSC CGL', price: 'Free', rating: 4.5, emoji: '📘' },
  { id: 'eb2', title: 'Banking Awareness Made Simple', author: 'Anjali Mehra', tag: 'IBPS PO', price: '₹99', rating: 4.2, emoji: '📗' },
  { id: 'eb3', title: 'NEET Biology Quick Revision', author: 'Dr. S. Pillai', tag: 'NEET UG', price: 'Free', rating: 4.7, emoji: '📕' },
  { id: 'eb4', title: 'Indian Polity Essentials', author: 'M. Lakshmanan', tag: 'UPSC CSE', price: '₹149', rating: 4.6, emoji: '📙' },
  { id: 'eb5', title: 'GATE CS Algorithms Handbook', author: 'Prof. A. Verma', tag: 'GATE', price: 'Free', rating: 4.3, emoji: '📘' },
  { id: 'eb6', title: 'IELTS Writing Mastery', author: 'Sarah Thompson', tag: 'IELTS', price: '₹199', rating: 4.4, emoji: '📗' },
  { id: 'eb7', title: 'Reasoning Shortcuts & Tricks', author: 'Karthik Raj', tag: 'Railways RRB', price: 'Free', rating: 4.1, emoji: '📕' },
  { id: 'eb8', title: 'NDA Maths Formula Companion', author: 'Col. R. Singh (Retd.)', tag: 'NDA/CDS', price: 'Free', rating: 4.5, emoji: '📙' },
  { id: 'eb9', title: 'Current Affairs Yearly Digest 2026', author: 'TryIT Editorial', tag: 'General', price: 'Free', rating: 4.8, emoji: '📘' },
  { id: 'eb10', title: 'Pedagogy & Child Development', author: 'Dr. Meena Iyer', tag: 'CTET/TET', price: '₹79', rating: 4.3, emoji: '📗' },
  { id: 'eb11', title: 'English Grammar Foundations', author: 'James Wilson', tag: 'General', price: 'Free', rating: 4.0, emoji: '📕' },
  { id: 'eb12', title: 'Static GK Complete Guide', author: 'TryIT Editorial', tag: 'State PSC', price: '₹49', rating: 4.2, emoji: '📙' },
];

export default function EbookStore() {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <AppLayout title="Ebook Store">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="font-display text-2xl font-extrabold text-[#1E3A5F] mb-1">Ebook Store 📖</h2>
          <p className="text-slate-500">Read, learn, and collect ebooks for every exam.</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => navigate('/ebooks/my')}
            className="px-4 py-2 rounded-2xl border-2 border-[#1E3A5F] text-[#1E3A5F] font-bold hover:bg-[#1E3A5F] hover:text-white transition-all"
          >
            📚 My Ebooks
          </button>
          {(user.role === 'mentor' || user.role === 'institution') && (
            <button
              onClick={() => navigate('/ebooks/upload')}
              className="px-4 py-2 rounded-2xl bg-[#D4AF37] text-[#1E3A5F] font-bold shadow-md hover:bg-[#E8C84A] transition-all"
            >
              ⬆️ Upload
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
        {SAMPLE_EBOOKS.map((eb) => (
          <div
            key={eb.id}
            onClick={() => navigate(`/ebooks/${eb.id}`)}
            className="bg-white rounded-2xl shadow-md p-4 cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all border border-slate-100"
          >
            <div className="w-full h-32 rounded-xl bg-gradient-to-br from-[#1E3A5F] to-[#0F2140] flex items-center justify-center text-5xl mb-3">
              {eb.emoji}
            </div>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#FDF6E3] text-[#7C2D12]">{eb.tag}</span>
            <h3 className="font-display font-extrabold text-sm text-[#1E3A5F] mt-2 line-clamp-2">{eb.title}</h3>
            <p className="text-xs text-slate-400 mt-1">{eb.author}</p>
            <div className="flex items-center justify-between mt-3">
              <span className="text-xs text-[#D4AF37] font-bold">{'★'.repeat(Math.round(eb.rating))} {eb.rating}</span>
              <span className={`text-xs font-bold ${eb.price === 'Free' ? 'text-emerald-600' : 'text-[#1E3A5F]'}`}>
                {eb.price}
              </span>
            </div>
          </div>
        ))}
      </div>
    </AppLayout>
  );
}
EOF

echo "→ Creating src/pages/ebooks/MyEbooks.jsx"
cat > src/pages/ebooks/MyEbooks.jsx << 'EOF'
import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../../components/layout/AppLayout';
import { useAuth } from '../../context/AuthContext';

// Sample saved ebooks — set to [] to preview the empty-state
const SAMPLE_MY_EBOOKS = [
  { id: 'eb1', title: 'Mastering Quantitative Aptitude', author: 'Dr. R. Krishnan', tag: 'SSC CGL', emoji: '📘', progress: 62 },
  { id: 'eb3', title: 'NEET Biology Quick Revision', author: 'Dr. S. Pillai', tag: 'NEET UG', emoji: '📕', progress: 28 },
  { id: 'eb9', title: 'Current Affairs Yearly Digest 2026', author: 'TryIT Editorial', tag: 'General', emoji: '📘', progress: 90 },
];

export default function MyEbooks() {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <AppLayout title="My Ebooks">
      <div className="mb-6">
        <h2 className="font-display text-2xl font-extrabold text-[#1E3A5F] mb-1">My Ebooks 📚</h2>
        <p className="text-slate-500">Pick up right where you left off.</p>
      </div>

      {SAMPLE_MY_EBOOKS.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-md p-10 text-center">
          <div className="text-5xl mb-3">📖</div>
          <p className="text-slate-600 mb-4">No ebooks yet — browse the store to find your next read!</p>
          <button
            onClick={() => navigate('/ebooks')}
            className="px-5 py-2 rounded-2xl bg-[#1E3A5F] text-white font-bold"
          >
            Browse Store →
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SAMPLE_MY_EBOOKS.map((eb) => (
            <div
              key={eb.id}
              onClick={() => navigate(`/ebooks/${eb.id}`)}
              className="bg-white rounded-2xl shadow-md p-5 cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all border border-slate-100"
            >
              <div className="flex gap-4">
                <div className="w-16 h-20 rounded-xl bg-gradient-to-br from-[#1E3A5F] to-[#0F2140] flex items-center justify-center text-3xl flex-shrink-0">
                  {eb.emoji}
                </div>
                <div className="flex-1">
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#FDF6E3] text-[#7C2D12]">{eb.tag}</span>
                  <h3 className="font-display font-extrabold text-sm text-[#1E3A5F] mt-1">{eb.title}</h3>
                  <p className="text-xs text-slate-400">{eb.author}</p>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                  <span>Progress</span>
                  <span className="font-bold text-[#D4AF37]">{eb.progress}%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#D4AF37] rounded-full" style={{ width: `${eb.progress}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </AppLayout>
  );
}
EOF

echo "→ Creating src/pages/ebooks/UploadEbook.jsx"
cat > src/pages/ebooks/UploadEbook.jsx << 'EOF'
import React, { useState } from 'react';
import AppLayout from '../../components/layout/AppLayout';
import { useAuth } from '../../context/AuthContext';

const TAG_OPTIONS = [
  'SSC CGL', 'IBPS PO', 'UPSC CSE', 'NEET UG', 'JEE Main', 'GATE',
  'IELTS', 'TOEFL', 'Railways RRB', 'State PSC', 'NDA/CDS', 'CTET/TET', 'General',
];

export default function UploadEbook() {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [tags, setTags] = useState([]);
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  if (!user) return null;

  const toggleTag = (tag) => {
    setTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  };

  const handleSubmit = () => {
    if (!title.trim() || !author.trim() || tags.length === 0) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <AppLayout title="Upload Ebook">
        <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-md p-10 text-center">
          <div className="text-5xl mb-4">✅</div>
          <h2 className="font-display text-2xl font-extrabold text-[#1E3A5F] mb-2">Submitted!</h2>
          <p className="text-slate-500">
            Your ebook <span className="font-bold text-slate-700">"{title}"</span> is under review.
            We'll notify you once it's live in the Ebook Store.
          </p>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout title="Upload Ebook">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-md p-6 sm:p-8">
        <h2 className="font-display text-2xl font-extrabold text-[#1E3A5F] mb-1">Share Your Ebook ⬆️</h2>
        <p className="text-slate-500 mb-6">Help fellow aspirants — submit for review and reach thousands of learners.</p>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Mastering Quantitative Aptitude"
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/30 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Author</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Author name"
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/30 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Subject / Exam Tags</label>
            <div className="flex flex-wrap gap-2">
              {TAG_OPTIONS.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`text-xs font-bold px-3 py-1.5 rounded-full border-2 transition-all ${
                    tags.includes(tag) ? 'bg-[#1E3A5F] text-white border-[#1E3A5F]' : 'border-slate-200 text-slate-500'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What will readers learn from this ebook?"
              rows={4}
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/30 outline-none resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Price (₹) — set 0 for Free</label>
            <input
              type="number"
              min="0"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-32 px-4 py-3 rounded-2xl border border-slate-200 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/30 outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Ebook File (PDF/EPUB)</label>
              <input
                type="file"
                className="w-full text-sm px-4 py-3 rounded-2xl border border-slate-200 bg-white file:mr-3 file:px-3 file:py-1.5 file:rounded-xl file:border-0 file:bg-[#FDF6E3] file:text-[#7C2D12] file:font-bold"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Cover Image</label>
              <input
                type="file"
                accept="image/*"
                className="w-full text-sm px-4 py-3 rounded-2xl border border-slate-200 bg-white file:mr-3 file:px-3 file:py-1.5 file:rounded-xl file:border-0 file:bg-[#FDF6E3] file:text-[#7C2D12] file:font-bold"
              />
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={!title.trim() || !author.trim() || tags.length === 0}
            className="w-full py-3 rounded-2xl bg-[#D4AF37] text-[#1E3A5F] font-bold shadow-md hover:bg-[#E8C84A] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit for Review
          </button>
        </div>
      </div>
    </AppLayout>
  );
}
EOF

echo "→ Creating src/pages/ebooks/EbookReader.jsx"
cat > src/pages/ebooks/EbookReader.jsx << 'EOF'
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EBOOK_INFO = {
  eb1: { title: 'Mastering Quantitative Aptitude', subject: 'Quantitative Aptitude' },
  eb2: { title: 'Banking Awareness Made Simple', subject: 'Banking Awareness' },
  eb3: { title: 'NEET Biology Quick Revision', subject: 'Biology' },
  eb4: { title: 'Indian Polity Essentials', subject: 'Polity' },
  eb5: { title: 'GATE CS Algorithms Handbook', subject: 'Computer Science' },
  eb6: { title: 'IELTS Writing Mastery', subject: 'English Writing' },
  eb7: { title: 'Reasoning Shortcuts & Tricks', subject: 'Reasoning' },
  eb8: { title: 'NDA Maths Formula Companion', subject: 'Mathematics' },
  eb9: { title: 'Current Affairs Yearly Digest 2026', subject: 'Current Affairs' },
  eb10: { title: 'Pedagogy & Child Development', subject: 'Pedagogy' },
  eb11: { title: 'English Grammar Foundations', subject: 'English Grammar' },
  eb12: { title: 'Static GK Complete Guide', subject: 'General Knowledge' },
};

// TODO: replace with real ebook content fetched from storage once populated
const TOTAL_PAGES = 12;

const buildPageContent = (subject, page) => `Chapter ${Math.ceil(page / 3)} — ${subject} Fundamentals

This page covers core concepts in ${subject} relevant to your exam preparation. Focus on understanding the underlying principles before moving to practice questions.

Key points to remember:
- Concept clarity matters more than memorization
- Practice previous year questions regularly
- Revisit difficult topics every few days using spaced repetition
- Take short breaks to retain information better

(Page ${page} of ${TOTAL_PAGES} — sample placeholder content for ${subject})`;

const FONT_SIZES = ['text-sm', 'text-base', 'text-lg', 'text-xl'];

export default function EbookReader() {
  const { ebookId } = useParams();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [fontIdx, setFontIdx] = useState(1);

  const ebook = EBOOK_INFO[ebookId] || { title: 'Untitled Ebook', subject: 'General' };
  const progress = Math.round((page / TOTAL_PAGES) * 100);

  const goPrev = () => setPage((p) => Math.max(1, p - 1));
  const goNext = () => setPage((p) => Math.min(TOTAL_PAGES, p + 1));

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      {/* Header */}
      <div className="bg-[#1E3A5F] text-white px-4 sm:px-6 py-4 flex items-center justify-between">
        <button
          onClick={() => navigate('/ebooks/my')}
          className="flex items-center gap-2 text-sm font-bold hover:text-[#E8C84A] transition-all"
        >
          ✕ Exit to Library
        </button>
        <div className="text-center">
          <p className="font-display font-extrabold text-sm sm:text-base">{ebook.title}</p>
          <p className="text-xs text-[#E8C84A]">{ebook.subject}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFontIdx((i) => Math.max(0, i - 1))}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 font-bold text-sm"
          >
            A-
          </button>
          <button
            onClick={() => setFontIdx((i) => Math.min(FONT_SIZES.length - 1, i + 1))}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 font-bold text-sm"
          >
            A+
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full h-1.5 bg-slate-200">
        <div className="h-full bg-[#D4AF37] transition-all duration-300" style={{ width: `${progress}%` }} />
      </div>

      {/* Page content */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-md p-8 sm:p-10 min-h-[400px] whitespace-pre-line">
          <p className={`text-slate-700 leading-relaxed ${FONT_SIZES[fontIdx]}`}>
            {buildPageContent(ebook.subject, page)}
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div className="px-4 sm:px-6 py-4 flex items-center justify-between bg-white border-t border-slate-100">
        <button
          onClick={goPrev}
          disabled={page === 1}
          className="px-5 py-2 rounded-2xl border-2 border-[#1E3A5F] text-[#1E3A5F] font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#1E3A5F] hover:text-white transition-all"
        >
          ← Prev
        </button>
        <span className="text-sm font-bold text-slate-500">
          Page {page} of {TOTAL_PAGES} · {progress}%
        </span>
        <button
          onClick={goNext}
          disabled={page === TOTAL_PAGES}
          className="px-5 py-2 rounded-2xl bg-[#D4AF37] text-[#1E3A5F] font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#E8C84A] transition-all"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
EOF

echo ""
echo "✅ BATCH F complete — 7 files created:"
echo "   src/pages/classroom/ClassroomHub.jsx   → /classroom"
echo "   src/pages/classroom/StudyPlanner.jsx   → /classroom/planner"
echo "   src/pages/classroom/PDFLibrary.jsx     → /classroom/pdf"
echo "   src/pages/ebooks/EbookStore.jsx        → /ebooks"
echo "   src/pages/ebooks/MyEbooks.jsx          → /ebooks/my"
echo "   src/pages/ebooks/UploadEbook.jsx       → /ebooks/upload"
echo "   src/pages/ebooks/EbookReader.jsx       → /ebooks/:ebookId (full-screen, no AppLayout)"
echo ""
echo "⚠️  NEXT STEP: Add these 7 routes + imports to src/App.jsx:"
echo "   import ClassroomHub from './pages/classroom/ClassroomHub'"
echo "   import StudyPlanner from './pages/classroom/StudyPlanner'"
echo "   import PDFLibrary from './pages/classroom/PDFLibrary'"
echo "   import EbookStore from './pages/ebooks/EbookStore'"
echo "   import MyEbooks from './pages/ebooks/MyEbooks'"
echo "   import UploadEbook from './pages/ebooks/UploadEbook'"
echo "   import EbookReader from './pages/ebooks/EbookReader'"
echo ""
echo "   <Route path='/classroom' element={<ClassroomHub />} />"
echo "   <Route path='/classroom/planner' element={<StudyPlanner />} />"
echo "   <Route path='/classroom/pdf' element={<PDFLibrary />} />"
echo "   <Route path='/ebooks' element={<EbookStore />} />"
echo "   <Route path='/ebooks/my' element={<MyEbooks />} />"
echo "   <Route path='/ebooks/upload' element={<UploadEbook />} />"
echo "   <Route path='/ebooks/:ebookId' element={<EbookReader />} />"
