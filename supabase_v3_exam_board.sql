-- TryIT Educations — Schema v3
-- Run in Supabase SQL Editor

CREATE TABLE IF NOT EXISTS exam_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  posted_by UUID REFERENCES profiles(id),
  name TEXT NOT NULL,
  conducting_body TEXT NOT NULL,
  govt_type TEXT CHECK (govt_type IN ('central','state','university','school')),
  state TEXT DEFAULT 'All India',
  eligibility TEXT,
  app_open_date DATE,
  app_close_date DATE,
  exam_date DATE NOT NULL,
  result_date DATE,
  official_url TEXT NOT NULL,
  languages TEXT[] DEFAULT '{}',
  is_verified BOOLEAN DEFAULT FALSE,
  thumbs_up INTEGER DEFAULT 0,
  pin_count INTEGER DEFAULT 0,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS user_pinned_exams (
  user_id UUID REFERENCES profiles(id),
  exam_id UUID REFERENCES exam_notifications(id) ON DELETE CASCADE,
  pinned_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, exam_id)
);

CREATE TABLE IF NOT EXISTS exam_courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mentor_id UUID REFERENCES profiles(id),
  exam_id UUID REFERENCES exam_notifications(id),
  title TEXT NOT NULL,
  duration_days INTEGER CHECK (duration_days IN (30,60,90)),
  price INTEGER NOT NULL,
  max_slots INTEGER DEFAULT 20,
  enrolled_count INTEGER DEFAULT 0,
  start_date DATE NOT NULL,
  includes TEXT[] DEFAULT '{}',
  subjects TEXT[] DEFAULT '{}',
  status TEXT DEFAULT 'open',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS course_enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES exam_courses(id),
  student_id UUID REFERENCES profiles(id),
  amount_paid INTEGER NOT NULL,
  payment_method TEXT,
  payment_id TEXT,
  enrolled_at TIMESTAMPTZ DEFAULT NOW(),
  status TEXT DEFAULT 'active',
  UNIQUE (course_id, student_id)
);

ALTER TABLE exam_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_pinned_exams ENABLE ROW LEVEL SECURITY;
ALTER TABLE exam_courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_enrollments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "exam_notif_read" ON exam_notifications FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "exam_notif_insert" ON exam_notifications FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "pinned_read" ON user_pinned_exams FOR SELECT TO authenticated USING (true);
CREATE POLICY "pinned_insert" ON user_pinned_exams FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "courses_read" ON exam_courses FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "courses_insert" ON exam_courses FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "enrollments_read" ON course_enrollments FOR SELECT TO authenticated USING (true);
CREATE POLICY "enrollments_insert" ON course_enrollments FOR INSERT TO authenticated WITH CHECK (true);

SELECT 'Schema v3 complete!' as status;
