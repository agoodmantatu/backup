import { createContext, useContext, useState } from 'react'
import { useAuth } from './AuthContext'

const RoleContext = createContext(null)
export const useRole = () => useContext(RoleContext)

export function RoleProvider({ children }) {
  const { user } = useAuth() || {}
  const [role, setRole] = useState(() => user?.role || localStorage.getItem('tryit_role') || 'student')
  const changeRole = (r) => { setRole(r); localStorage.setItem('tryit_role', r) }
  return (
    <RoleContext.Provider value={{ role, setRole: changeRole }}>
      {children}
    </RoleContext.Provider>
  )
}
