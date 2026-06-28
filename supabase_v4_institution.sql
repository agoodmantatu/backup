-- TryIT Institution Schema v4
DROP TABLE IF EXISTS institution_mentors CASCADE;
DROP TABLE IF EXISTS homework_submissions CASCADE;
DROP TABLE IF EXISTS homework CASCADE;

CREATE TABLE IF NOT EXISTS institution_mentors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  institution_id UUID NOT NULL,
  mentor_id UUID NOT NULL,
  hall_ids TEXT[] DEFAULT '{}',
  subjects TEXT[] DEFAULT '{}',
  status TEXT DEFAULT 'active'
    CHECK (status IN ('active','inactive','removed')),
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (institution_id, mentor_id)
);

CREATE TABLE IF NOT EXISTS homework (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  institution_id UUID NOT NULL,
  hall_id UUID,
  posted_by UUID NOT NULL,
  title TEXT NOT NULL,
  instructions TEXT,
  hw_type TEXT NOT NULL
    CHECK (hw_type IN ('mcq','written','pdf','reading')),
  due_at TIMESTAMPTZ NOT NULL,
  max_marks INTEGER DEFAULT 100,
  status TEXT DEFAULT 'active'
    CHECK (status IN ('active','completed','cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS homework_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  homework_id UUID REFERENCES homework(id) ON DELETE CASCADE,
  student_id UUID NOT NULL,
  answer_text TEXT,
  file_url TEXT,
  marks_obtained INTEGER,
  feedback TEXT,
  status TEXT DEFAULT 'submitted'
    CHECK (status IN ('submitted','reviewed','returned')),
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  reviewed_at TIMESTAMPTZ,
  UNIQUE (homework_id, student_id)
);

ALTER TABLE institution_mentors ENABLE ROW LEVEL SECURITY;
ALTER TABLE homework ENABLE ROW LEVEL SECURITY;
ALTER TABLE homework_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "inst_mentors_read" ON institution_mentors
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "inst_mentors_insert" ON institution_mentors
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "homework_read" ON homework
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "homework_insert" ON homework
  FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "homework_update" ON homework
  FOR UPDATE TO authenticated USING (true);

CREATE POLICY "hw_submissions_read" ON homework_submissions
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "hw_submissions_insert" ON homework_submissions
  FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "hw_submissions_update" ON homework_submissions
  FOR UPDATE TO authenticated USING (true);

SELECT 'Institution Schema v4 complete!' as status;
