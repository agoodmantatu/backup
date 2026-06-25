src = open('src/pages/student/StudentTest.jsx', encoding='utf-8').read()

# Fix: 1 min per question for quick/subject, exam time -10% for mock
src = src.replace(
    "{ id: 'quick',   label: '⚡ Quick Test',    questions: 10,  time: 10,  desc: '10 questions in 10 min' },",
    "{ id: 'quick',   label: '⚡ Quick Test',    questions: 10,  time: 10,  desc: '10 questions · 1 min each' },"
)
src = src.replace(
    "{ id: 'subject', label: '📚 Subject Test',  questions: 25,  time: 25,  desc: '25 questions in 25 min' },",
    "{ id: 'subject', label: '📚 Subject Test',  questions: 25,  time: 25,  desc: '25 questions · 1 min each' },"
)
src = src.replace(
    "{ id: 'mock',    label: '🎯 Full Mock',     questions: 100, time: 120, desc: '100 questions in 2 hours' },",
    "{ id: 'mock',    label: '🎯 Full Mock',     questions: 100, time: 108, desc: '100 questions · 108 min (exam time -10%)' },"
)

# Fix startTest to always use 1 min per question for quick/subject
src = src.replace(
    "    const type = EXAM_TYPES.find(e => e.id === examType)\n    const q = SAMPLE_QUESTIONS.slice(0, Math.min(type.questions, SAMPLE_QUESTIONS.length))\n    setQuestions(q)\n    setAnswers({})\n    setCurrent(0)\n    setTimeLeft(type.time * 60)\n    setTotalTime(type.time * 60)",
    """    const type = EXAM_TYPES.find(e => e.id === examType)
    const q = SAMPLE_QUESTIONS.slice(0, Math.min(type.questions, SAMPLE_QUESTIONS.length))
    // 1 min per question for quick/subject, exam time -10% for mock
    const timeSeconds = examType === 'mock'
      ? Math.round(type.time * 60)
      : q.length * 60
    setQuestions(q)
    setAnswers({})
    setCurrent(0)
    setTimeLeft(timeSeconds)
    setTotalTime(timeSeconds)"""
)

open('src/pages/student/StudentTest.jsx', 'w', encoding='utf-8').write(src)
print('Timer fixed')
