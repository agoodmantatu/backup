# TryIT Dashboard Restructuring - Complete Implementation Guide

## 📋 Overview

This document outlines the complete restructuring of TryIT dashboards across all 4 roles with unified layout, theme application, logout functionality, and data interconnections.

## 🎯 What Was Done

### 1. **Unified Dashboard Layout Component**
**File:** `src/components/layout/DashboardLayout.jsx`

A reusable dashboard wrapper that provides:
- ✅ **Auto-hiding sidebar** (fixed on desktop, collapsible on mobile)
- ✅ **Unified header** with title and customization bar
- ✅ **Logout button** for all roles
- ✅ **Theme application** across all pages
- ✅ **Customizable widgets** - users can show/hide dashboard items
- ✅ **Consistent styling** using theme colors

**Props:**
```jsx
<DashboardLayout
  role="student|mentor|institution|family"
  navigation={[{icon, label, path}, ...]}
  title="Page Title"
  customizableItems={[{id, label, visible}, ...]}
  onCustomizationChange={callback}
>
  {/* Content */}
</DashboardLayout>
```

### 2. **Data Interconnection Service**
**File:** `src/lib/dataInterconnect.js`

Provides real-time data sync between all roles:

#### **Doubt System** (Student ↔ Mentor ↔ Institution)
```javascript
// Student posts a doubt
doubtSystem.postDoubt(studentId, examId, subject, topic, question)

// Mentor/Institution sees pending doubts
doubtSystem.getDoubts(userId, 'mentor', {status: 'open'})

// Mentor assigns and resolves
doubtSystem.assignDoubt(doubtId, mentorId)
doubtSystem.resolveDoubt(doubtId, solution, videoUrl)
```

#### **Question Papers** (Mentor/Institution → Students)
```javascript
// Upload question paper
paperSystem.uploadPaper(uploaderId, 'mentor', exam, subject, topic, pdfUrl)

// Students see available papers
paperSystem.getPapersForStudent(studentId, examId, subject)

// Track downloads
paperSystem.trackDownload(paperId)
```

#### **Family Tracking** (Real-time progress monitoring)
```javascript
// Get child's progress
familyTracking.getChildProgress(childId)

// Get daily stats
familyTracking.getDailyStats(childId, days=7)

// Get weak areas
familyTracking.getWeakAreas(childId)

// Export all data
familyTracking.exportChildData(childId, format='json')

// Subscribe to real-time updates
notificationSystem.subscribeToChildProgress(childId, callback)
```

### 3. **Refactored Dashboards**

#### **Mentor Dashboard** (NEW)
**File:** `src/pages/mentor/MentorDashboardRefactored.jsx`
**Route:** `/mentor-hub/v2`

Features:
- ✅ Logout button in sidebar
- ✅ Pending doubts with assignment functionality
- ✅ Active students table
- ✅ Real-time doubt notifications
- ✅ Customizable widgets
- ✅ Theme-driven colors throughout

#### **Institution Dashboard** (NEW)
**File:** `src/pages/institution/InstitutionDashboardRefactored.jsx`
**Route:** `/institution/v2`

Features:
- ✅ Logout button in sidebar
- ✅ 6 customizable stat cards
- ✅ Active halls management
- ✅ Student doubts visibility
- ✅ Recent activity feed
- ✅ Real-time updates from students and mentors

#### **Family Dashboard** (ENHANCED)
**File:** `src/pages/family/FamilyDashboardRefactored.jsx`
**Route:** `/family/v2`

Features:
- ✅ View multiple family members
- ✅ Real-time progress tracking
- ✅ Daily activity stats
- ✅ Study streak tracking
- ✅ Subject-wise performance
- ✅ Exam readiness score
- ✅ **Data export** functionality (JSON format)
- ✅ Customizable dashboard items

## 🔄 Data Flow & Interconnections

### Student → Mentor/Institution (Doubts)
```
Student posts doubt
    ↓
doubtSystem.postDoubt() creates record
    ↓
Mentor/Institution receives notification
    ↓
notificationSystem.subscribeToDoubts() triggers update
    ↓
Doubt appears in their dashboard
    ↓
Mentor assigns and resolves
    ↓
Student sees resolution
```

### Mentor/Institution → Students (Papers)
```
Mentor/Institution uploads question paper
    ↓
paperSystem.uploadPaper() stores metadata
    ↓
notificationSystem.subscribeToNewPapers() notifies students
    ↓
Paper appears in student's materials
    ↓
Student downloads (tracked)
```

### Family → Students (Progress)
```
Student completes test/questions
    ↓
familyTracking.getChildProgress() updates stats
    ↓
notificationSystem.subscribeToChildProgress() notifies parent
    ↓
Parent dashboard shows real-time activity
    ↓
Parent can download complete data
```

## 🎨 Theme Application

All dashboards now properly apply theme colors:

```javascript
const { theme } = useTheme()
const p = theme?.primary || '#1E3A5F'
const a = theme?.accent || '#C9A84C'
const t = theme?.text || '#1E293B'
const m = theme?.textLight || '#64748B'
const bg = theme?.background || '#F8FAFC'
const c = theme?.surface || '#FFFFFF'
const b = theme?.border || '#E2E8F0'
```

- Sidebar: `theme.primary`
- Accent elements: `theme.accent`
- Text: `theme.text`
- Cards: `theme.surface`
- Background: `theme.background`

## 👤 User Management

### Logout Button
Located in every sidebar footer:
```jsx
<button onClick={handleLogout}>
  🚪 Logout
</button>
```

Clears:
- Authentication context
- User session
- Local storage (dashboard customization is preserved)

### User Profile Card
Shows in sidebar:
```jsx
<div>
  <p>{user?.name || 'User'}</p>
  <p>{role.charAt(0).toUpperCase() + role.slice(1)}</p>
</div>
```

## ⚙️ Customization System

Each dashboard has customizable widgets:

```javascript
const CUSTOMIZABLE_ITEMS = [
  { id: 'stats', label: 'Statistics Cards', visible: true },
  { id: 'pending_doubts', label: 'Pending Doubts', visible: true },
  // ...
]
```

Saves to localStorage:
```javascript
localStorage.setItem(
  `dashboard_customization_${role}`,
  JSON.stringify(visibleItems)
)
```

## 📱 Mobile Responsiveness

- **Desktop (≥768px):** Sidebar always visible
- **Mobile (<768px):** Sidebar collapsible with hamburger menu
- **Overlay:** Semi-transparent overlay when sidebar opens on mobile
- **Auto-hide:** Sidebar closes when navigation item is clicked

## 🚀 Usage Instructions

### For Student Role
```jsx
import DashboardLayout from '../../components/layout/DashboardLayout'

<DashboardLayout
  role="student"
  navigation={STUDENT_NAV}
  title="Student Dashboard"
  customizableItems={CUSTOMIZABLE_ITEMS}
>
  {/* Your content */}
</DashboardLayout>
```

### For Mentor Role
Navigate to `/mentor-hub/v2` to see refactored version

### For Institution Role
Navigate to `/institution/v2` to see refactored version

### For Family Role
Navigate to `/family/v2` to see refactored version with data export

## 📊 Real-Time Features

All dashboards use Supabase real-time subscriptions:

```javascript
// Subscribe to changes
const subscription = supabase
  .from('table_name')
  .on('INSERT', payload => {
    // Handle new data
  })
  .subscribe()

// Cleanup
subscription.unsubscribe()
```

## 📥 Data Export

Family members can export child data:

```javascript
const data = await familyTracking.exportChildData(childId, 'json')

// Data includes:
// - Progress snapshots
// - Daily statistics (365 days)
// - Weak areas
// - Exam readiness
// - Study streaks
// - All subjects & topics
```

## 🔐 Role-Based Access

Protected routes:
```jsx
<Route 
  path="/mentor-hub/v2" 
  element={<RoleGuard allowedRoles={['mentor','institution']}>
    <MentorDashboardRefactored />
  </RoleGuard>} 
/>
```

## ✅ Checklist: What's Included

- [x] Unified DashboardLayout component
- [x] Logout button in all dashboards
- [x] Theme application across all pages
- [x] Auto-hiding sidebar (mobile/desktop responsive)
- [x] Customizable widget system
- [x] Data interconnection service
- [x] Doubt system (Student ↔ Mentor ↔ Institution)
- [x] Question paper sharing system
- [x] Family real-time tracking
- [x] Data export for families
- [x] Real-time notifications
- [x] Mentor dashboard refactored
- [x] Institution dashboard refactored
- [x] Family dashboard enhanced
- [x] Proper route configuration

## 🔮 Future Enhancements

- [ ] User preferences storage to Supabase
- [ ] Advanced analytics dashboard
- [ ] Batch operations (download multiple reports)
- [ ] Video upload for doubt resolutions
- [ ] Progress comparison (student vs peer)
- [ ] AI recommendations based on progress
- [ ] Mobile app integration
- [ ] Offline mode support

## 📝 Notes

1. The old dashboards are still available at their original routes
2. New v2 routes run alongside for gradual migration
3. All theme colors are applied dynamically
4. Customization persists in localStorage
5. Real-time features require Supabase setup
6. All 4 roles now have consistent UI/UX

## 🆘 Troubleshooting

**Logout button not working?**
- Check AuthContext has logout function
- Verify user state is properly cleared

**Themes not applying?**
- Ensure ThemeProvider wraps app
- Check theme object has required colors
- Verify CSS variables are set on root

**Sidebar not hiding on mobile?**
- Check window.innerWidth calculation
- Verify resize event listener is active

**Data not syncing in real-time?**
- Check Supabase connection
- Verify RLS policies allow access
- Check subscription setup in useEffect

---

**Last Updated:** 2026-07-01
**Version:** 2.0 (Unified Dashboard System)
