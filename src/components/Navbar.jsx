import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useIdioma } from '../context/IdiomaContext'
import api from '../services/api'

export default function Navbar() {
  const { logout } = useAuth()
  const { idioma, setIdioma, t } = useIdioma()
  const navigate = useNavigate()
  const [solicitudesPendientes, setSolicitudesPendientes] = useState(0)
  const [menuAbierto, setMenuAbierto] = useState(false)

  useEffect(() => {
    const cargar = async () => {
      try {
        const res = await api.get('/solicitudes/pendientes')
        setSolicitudesPendientes(res.data.length)
      } catch (err) {
        console.error(err)
      }
    }
    cargar()
    const interval = setInterval(cargar, 30000)
    return () => clearInterval(interval)
  }, [])

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout')
    } catch (err) {
      console.error('Error al fer logout:', err)
    } finally {
      logout()
      navigate('/admin/login')
    }
  }

  return (
    <nav className="bg-white border-b-4 px-6 py-3 flex justify-between items-center sticky top-0 z-50 shadow-sm"
      style={{ borderColor: '#C0392B' }}>

      <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/admin/dashboard')}>
        <div className="w-9 h-9 rounded flex items-center justify-center text-white text-xs font-bold"
          style={{ backgroundColor: '#C0392B' }}>
          APR
        </div>
        <div>
          <h1 className="text-base font-bold leading-tight" style={{ color: '#C0392B' }}>APR Xàtiva</h1>
          <p className="text-xs text-gray-400">{t.panelAdmin}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">

        <button
          onClick={() => navigate('/admin/solicitudes')}
          className="relative p-2 rounded-lg hover:bg-gray-100 transition"
          title={t.solicitudesPendientes}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          {solicitudesPendientes > 0 && (
            <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold"
              style={{ fontSize: '10px' }}>
              {solicitudesPendientes}
            </span>
          )}
        </button>

        <div className="flex gap-1 rounded-lg p-1" style={{ backgroundColor: '#A93226' }}>
          {['es', 'ca'].map(l => (
            <button key={l} onClick={() => setIdioma(l)}
              className={`px-2 py-1 rounded-md text-xs font-medium transition ${idioma === l ? 'bg-white' : 'text-white/70 hover:text-white'}`}
              style={idioma === l ? { color: '#C0392B' } : {}}>
              {l === 'ca' ? 'VAL' : 'ES'}
            </button>
          ))}
        </div>

        <div className="relative">
          <button
            onClick={() => setMenuAbierto(!menuAbierto)}
            className="p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>

          {menuAbierto && (
            <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">

              <button
                onClick={() => { navigate('/admin/perfil'); setMenuAbierto(false) }}
                className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                {t.miPerfil}
              </button>

              <button
                onClick={() => { navigate('/admin/simulador'); setMenuAbierto(false) }}
                className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.361a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
                </svg>
                Simulador
              </button>

              <div className="border-t border-gray-100 my-1" />

              <button
                onClick={() => { handleLogout(); setMenuAbierto(false) }}
                className="w-full px-4 py-2.5 text-left text-sm flex items-center gap-2 transition hover:bg-red-50"
                style={{ color: '#C0392B' }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                {t.cerrarSesion}
              </button>

            </div>
          )}
        </div>

      </div>
    </nav>
  )
}