// Redirect to standalone student hall page
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
export default function HallHub() {
  const nav = useNavigate()
  useEffect(() => { nav('/student/hall', { replace: true }) }, [])
  return null
}
