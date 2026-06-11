import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Onboarding() {
  const navigate = useNavigate()
  const [role, setRole] = useState('student')
  const [step, setStep] = useState(1) // 1: basic info, 2: role-specific
  const [formData, setFormData] = useState({})

  useEffect(() => {
    const savedRole = localStorage.getItem('tryit_role')
    if (savedRole) setRole(savedRole)
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    // Save all data to localStorage or backend
    localStorage.setItem('onboardingData', JSON.stringify(formData))
    navigate('/dashboard')
  }

  // Role-specific components will be inserted here
  // ...

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #F8FAFC, #E2E8F0)', padding: 24 }}>
      <div style={{ maxWidth: 600, margin: '0 auto', background: '#fff', borderRadius: 32, padding: 32, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#1E3A5F', marginBottom: 8 }}>Complete your profile</h1>
        <p style={{ color: '#475569', marginBottom: 24 }}>Tell us a bit about yourself to personalise your experience.</p>

        {step === 1 && (
          <>
            <div style={{ marginBottom: 20 }}>
              <label style={{ fontWeight: 600, display: 'block', marginBottom: 6 }}>Full Name *</label>
              <input name="fullName" value={formData.fullName || ''} onChange={handleChange} style={{ width: '100%', padding: 12, borderRadius: 12, border: '1px solid #CBD5E1' }} />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ fontWeight: 600, display: 'block', marginBottom: 6 }}>Date of Birth *</label>
              <input name="dob" type="date" value={formData.dob || ''} onChange={handleChange} style={{ width: '100%', padding: 12, borderRadius: 12, border: '1px solid #CBD5E1' }} />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ fontWeight: 600, display: 'block', marginBottom: 6 }}>Gender *</label>
              <select name="gender" value={formData.gender || ''} onChange={handleChange} style={{ width: '100%', padding: 12, borderRadius: 12, border: '1px solid #CBD5E1' }}>
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="transgender">Transgender</option>
              </select>
            </div>
            <button onClick={() => setStep(2)} style={{ background: '#D4AF37', color: '#1E3A5F', padding: 14, borderRadius: 40, fontWeight: 700, border: 'none', width: '100%', cursor: 'pointer' }}>Next →</button>
          </>
        )}

        {step === 2 && (
          <>
            {role === 'student' && <StudentForm formData={formData} handleChange={handleChange} />}
            {/* Other roles will be added in subsequent parts */}
            <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
              <button onClick={() => setStep(1)} style={{ flex: 1, padding: 12, borderRadius: 40, background: '#F1F5F9', border: 'none', cursor: 'pointer' }}>← Back</button>
              <button onClick={handleSubmit} style={{ flex: 1, padding: 12, borderRadius: 40, background: '#D4AF37', color: '#1E3A5F', fontWeight: 700, border: 'none', cursor: 'pointer' }}>Finish →</button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

// Student form component
function StudentForm({ formData, handleChange }) {
  const [exams, setExams] = useState(formData.exams || [])

  const addExam = (e) => {
    const exam = e.target.value
    if (exam && exams.length < 3 && !exams.includes(exam)) {
      const newExams = [...exams, exam]
      setExams(newExams)
      handleChange({ target: { name: 'exams', value: newExams } })
    }
    e.target.value = ''
  }

  const removeExam = (exam) => {
    const newExams = exams.filter(e => e !== exam)
    setExams(newExams)
    handleChange({ target: { name: 'exams', value: newExams } })
  }

  return (
    <>
      <div style={{ marginBottom: 20 }}>
        <label style={{ fontWeight: 600, display: 'block', marginBottom: 6 }}>Category (SC/ST/OBC/General) *</label>
        <select name="category" value={formData.category || ''} onChange={handleChange} style={{ width: '100%', padding: 12, borderRadius: 12, border: '1px solid #CBD5E1' }}>
          <option value="">Select</option>
          <option value="general">General</option>
          <option value="obc">OBC</option>
          <option value="sc">SC</option>
          <option value="st">ST</option>
        </select>
      </div>
      <div style={{ marginBottom: 20 }}>
        <label style={{ fontWeight: 600, display: 'block', marginBottom: 6 }}>State *</label>
        <input name="state" value={formData.state || ''} onChange={handleChange} style={{ width: '100%', padding: 12, borderRadius: 12, border: '1px solid #CBD5E1' }} />
      </div>
      <div style={{ marginBottom: 20 }}>
        <label style={{ fontWeight: 600, display: 'block', marginBottom: 6 }}>City *</label>
        <input name="city" value={formData.city || ''} onChange={handleChange} style={{ width: '100%', padding: 12, borderRadius: 12, border: '1px solid #CBD5E1' }} />
      </div>
      <div style={{ marginBottom: 20 }}>
        <label style={{ fontWeight: 600, display: 'block', marginBottom: 6 }}>Exams preparing for (max 3) *</label>
        <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
          <input placeholder="Type exam name" onKeyDown={(e) => e.key === 'Enter' && addExam(e)} style={{ flex: 1, padding: 10, borderRadius: 12, border: '1px solid #CBD5E1' }} />
          <button onClick={(e) => addExam({ target: { value: document.querySelector('input[placeholder="Type exam name"]').value } })} style={{ padding: '10px 16px', background: '#1E3A5F', color: '#fff', borderRadius: 12, border: 'none', cursor: 'pointer' }}>Add</button>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {exams.map(exam => (
            <span key={exam} style={{ background: '#E2E8F0', padding: '4px 12px', borderRadius: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
              {exam} <button onClick={() => removeExam(exam)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 16 }}>×</button>
            </span>
          ))}
        </div>
      </div>
    </>
  )
}
// Mentor form component
function MentorForm({ formData, handleChange }) {
  const [languages, setLanguages] = useState(formData.languages || ['English'])
  const addLanguage = (lang) => {
    if (lang && languages.length < 7 && !languages.includes(lang)) {
      const newLangs = [...languages, lang]
      setLanguages(newLangs)
      handleChange({ target: { name: 'languages', value: newLangs } })
    }
  }
  const removeLanguage = (lang) => {
    if (lang === 'English') return
    const newLangs = languages.filter(l => l !== lang)
    setLanguages(newLangs)
    handleChange({ target: { name: 'languages', value: newLangs } })
  }

  return (
    <>
      <div style={{ marginBottom: 20 }}>
        <label style={{ fontWeight: 600, display: 'block', marginBottom: 6 }}>State *</label>
        <input name="state" value={formData.state || ''} onChange={handleChange} style={{ width: '100%', padding: 12, borderRadius: 12, border: '1px solid #CBD5E1' }} />
      </div>
      <div style={{ marginBottom: 20 }}>
        <label style={{ fontWeight: 600, display: 'block', marginBottom: 6 }}>City *</label>
        <input name="city" value={formData.city || ''} onChange={handleChange} style={{ width: '100%', padding: 12, borderRadius: 12, border: '1px solid #CBD5E1' }} />
      </div>
      <div style={{ marginBottom: 20 }}>
        <label style={{ fontWeight: 600, display: 'block', marginBottom: 6 }}>Current working / Expertise *</label>
        <select name="expertise" value={formData.expertise || ''} onChange={handleChange} style={{ width: '100%', padding: 12, borderRadius: 12, border: '1px solid #CBD5E1' }}>
          <option value="">Select</option>
          <option value="topic">Specific topic</option>
          <option value="subject">Whole subject</option>
          <option value="exam">Specific exam</option>
          <option value="all">All of the above</option>
        </select>
      </div>
      <div style={{ marginBottom: 20 }}>
        <label style={{ fontWeight: 600, display: 'block', marginBottom: 6 }}>Subjects / Exams you handle</label>
        <input name="subjects" value={formData.subjects || ''} onChange={handleChange} placeholder="e.g., Mathematics, NEET, UPSC" style={{ width: '100%', padding: 12, borderRadius: 12, border: '1px solid #CBD5E1' }} />
      </div>
      <div style={{ marginBottom: 20 }}>
        <label style={{ fontWeight: 600, display: 'block', marginBottom: 6 }}>Languages you can teach (English + up to 7 Indian languages) *</label>
        <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
          <input id="langInput" placeholder="e.g., Hindi, Tamil" style={{ flex: 1, padding: 10, borderRadius: 12, border: '1px solid #CBD5E1' }} />
          <button onClick={() => { const inp = document.getElementById('langInput'); addLanguage(inp.value); inp.value = '' }} style={{ padding: '10px 16px', background: '#1E3A5F', color: '#fff', borderRadius: 12, border: 'none', cursor: 'pointer' }}>Add</button>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {languages.map(lang => (
            <span key={lang} style={{ background: '#E2E8F0', padding: '4px 12px', borderRadius: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
              {lang} {lang !== 'English' && <button onClick={() => removeLanguage(lang)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>×</button>}
            </span>
          ))}
        </div>
        <p style={{ fontSize: 12, color: '#64748B', marginTop: 6 }}>You can answer doubts in both English and your selected native languages.</p>
      </div>
    </>
  )
}
// Institution form component
function InstitutionForm({ formData, handleChange }) {
  const [languages, setLanguages] = useState(formData.languages || ['English'])
  const addLanguage = (lang) => {
    if (lang && languages.length < 7 && !languages.includes(lang)) {
      const newLangs = [...languages, lang]
      setLanguages(newLangs)
      handleChange({ target: { name: 'languages', value: newLangs } })
    }
  }
  const removeLanguage = (lang) => {
    if (lang === 'English') return
    const newLangs = languages.filter(l => l !== lang)
    setLanguages(newLangs)
    handleChange({ target: { name: 'languages', value: newLangs } })
  }

  return (
    <>
      <div style={{ marginBottom: 20 }}>
        <label style={{ fontWeight: 600, display: 'block', marginBottom: 6 }}>Institution Name *</label>
        <input name="instName" value={formData.instName || ''} onChange={handleChange} style={{ width: '100%', padding: 12, borderRadius: 12, border: '1px solid #CBD5E1' }} />
      </div>
      <div style={{ marginBottom: 20 }}>
        <label style={{ fontWeight: 600, display: 'block', marginBottom: 6 }}>City *</label>
        <input name="city" value={formData.city || ''} onChange={handleChange} style={{ width: '100%', padding: 12, borderRadius: 12, border: '1px solid #CBD5E1' }} />
      </div>
      <div style={{ marginBottom: 20 }}>
        <label style={{ fontWeight: 600, display: 'block', marginBottom: 6 }}>State *</label>
        <input name="state" value={formData.state || ''} onChange={handleChange} style={{ width: '100%', padding: 12, borderRadius: 12, border: '1px solid #CBD5E1' }} />
      </div>
      <div style={{ marginBottom: 20 }}>
        <label style={{ fontWeight: 600, display: 'block', marginBottom: 6 }}>Languages used for teaching (English + up to 7) *</label>
        <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
          <input id="instLangInput" placeholder="e.g., Telugu, Marathi" style={{ flex: 1, padding: 10, borderRadius: 12, border: '1px solid #CBD5E1' }} />
          <button onClick={() => { const inp = document.getElementById('instLangInput'); addLanguage(inp.value); inp.value = '' }} style={{ padding: '10px 16px', background: '#1E3A5F', color: '#fff', borderRadius: 12, border: 'none', cursor: 'pointer' }}>Add</button>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {languages.map(lang => (
            <span key={lang} style={{ background: '#E2E8F0', padding: '4px 12px', borderRadius: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
              {lang} {lang !== 'English' && <button onClick={() => removeLanguage(lang)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>×</button>}
            </span>
          ))}
        </div>
      </div>
      <div style={{ marginBottom: 20 }}>
        <label style={{ fontWeight: 600, display: 'block', marginBottom: 6 }}>Number of students currently enrolled *</label>
        <input name="studentCount" type="number" value={formData.studentCount || ''} onChange={handleChange} style={{ width: '100%', padding: 12, borderRadius: 12, border: '1px solid #CBD5E1' }} />
      </div>
      <div style={{ marginBottom: 20 }}>
        <label style={{ fontWeight: 600, display: 'block', marginBottom: 6 }}>Main subjects / exams covered *</label>
        <input name="subjects" value={formData.subjects || ''} onChange={handleChange} placeholder="e.g., NEET, JEE, UPSC, SSC" style={{ width: '100%', padding: 12, borderRadius: 12, border: '1px solid #CBD5E1' }} />
      </div>
      <div style={{ marginBottom: 20 }}>
        <label style={{ fontWeight: 600, display: 'block', marginBottom: 6 }}>Display name on test papers (e.g., "Vidhya Coaching Centre, Coimbatore for NEET")</label>
        <input name="displayName" value={formData.displayName || ''} onChange={handleChange} placeholder="Your institute name as you want it shown on tests" style={{ width: '100%', padding: 12, borderRadius: 12, border: '1px solid #CBD5E1' }} />
      </div>
    </>
  )
}
// Family Hub form component
function FamilyForm({ formData, handleChange }) {
  const [members, setMembers] = useState(formData.familyMembers || [])
  const [adminId, setAdminId] = useState(formData.adminId || '')

  const addMember = () => {
    const newMember = { id: Date.now(), role: '', exam: '' }
    const newMembers = [...members, newMember]
    setMembers(newMembers)
    handleChange({ target: { name: 'familyMembers', value: newMembers } })
    if (!adminId) setAdminId(newMember.id)
  }

  const updateMember = (id, field, value) => {
    const updated = members.map(m => m.id === id ? { ...m, [field]: value } : m)
    setMembers(updated)
    handleChange({ target: { name: 'familyMembers', value: updated } })
  }

  const removeMember = (id) => {
    const updated = members.filter(m => m.id !== id)
    setMembers(updated)
    handleChange({ target: { name: 'familyMembers', value: updated } })
    if (adminId === id && updated.length > 0) setAdminId(updated[0].id)
    else if (updated.length === 0) setAdminId('')
  }

  return (
    <>
      <div style={{ marginBottom: 20 }}>
        <label style={{ fontWeight: 600, display: 'block', marginBottom: 6 }}>How many family members will study? *</label>
        <button onClick={addMember} style={{ background: '#1E3A5F', color: '#fff', padding: '8px 16px', borderRadius: 12, border: 'none', cursor: 'pointer' }}>+ Add member</button>
      </div>
      {members.map(member => (
        <div key={member.id} style={{ border: '1px solid #E2E8F0', borderRadius: 16, padding: 16, marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
            <strong>Family member</strong>
            <button onClick={() => removeMember(member.id)} style={{ color: '#EF4444', background: 'none', border: 'none', cursor: 'pointer' }}>Remove</button>
          </div>
          <div style={{ marginBottom: 12 }}>
            <label>Role (e.g., Father, Mother, Son, Daughter) *</label>
            <input value={member.role} onChange={e => updateMember(member.id, 'role', e.target.value)} placeholder="e.g., Father preparing for Departmental exams" style={{ width: '100%', padding: 10, borderRadius: 12, border: '1px solid #CBD5E1', marginTop: 4 }} />
          </div>
          <div style={{ marginBottom: 12 }}>
            <label>Exam / Course preparing for *</label>
            <input value={member.exam} onChange={e => updateMember(member.id, 'exam', e.target.value)} placeholder="e.g., TNPSC Group 2, NEET, UPSC" style={{ width: '100%', padding: 10, borderRadius: 12, border: '1px solid #CBD5E1', marginTop: 4 }} />
          </div>
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <input type="radio" name="admin" checked={adminId === member.id} onChange={() => { setAdminId(member.id); handleChange({ target: { name: 'adminId', value: member.id } }) }} />
              This member is the admin (can monitor others' progress)
            </label>
          </div>
        </div>
      ))}
      {members.length === 0 && <p style={{ color: '#64748B' }}>Click "Add member" to start building your family study group.</p>}
    </>
  )
}
{step === 2 && (
  <>
    {role === 'student' && <StudentForm formData={formData} handleChange={handleChange} />}
    {role === 'mentor' && <MentorForm formData={formData} handleChange={handleChange} />}
    {role === 'institution' && <InstitutionForm formData={formData} handleChange={handleChange} />}
    {role === 'family' && <FamilyForm formData={formData} handleChange={handleChange} />}
    <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
      <button onClick={() => setStep(1)} style={{ flex: 1, padding: 12, borderRadius: 40, background: '#F1F5F9', border: 'none', cursor: 'pointer' }}>← Back</button>
      <button onClick={handleSubmit} style={{ flex: 1, padding: 12, borderRadius: 40, background: '#D4AF37', color: '#1E3A5F', fontWeight: 700, border: 'none', cursor: 'pointer' }}>Finish →</button>
    </div>
  </>
)}
