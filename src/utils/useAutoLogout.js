import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function useAutoLogout(minutos = 30) {
  const { logout, token } = useAuth()
  const navigate = useNavigate()
  const timer = useRef(null)

  const resetTimer = () => {
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      logout()
      navigate('/admin/login')
    }, minutos * 60 * 1000)
  }

  useEffect(() => {
    if (!token) return
    const eventos = ['mousemove', 'keydown', 'click', 'scroll']
    eventos.forEach(e => window.addEventListener(e, resetTimer))
    resetTimer()
    return () => {
      eventos.forEach(e => window.removeEventListener(e, resetTimer))
      if (timer.current) clearTimeout(timer.current)
    }
  }, [token])
}