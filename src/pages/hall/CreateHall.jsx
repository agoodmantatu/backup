import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
export default function CreateHall() {
  const nav = useNavigate()
  useEffect(() => { nav('/student/hall', { replace: true }) }, [])
  return null
}
