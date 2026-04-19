import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useIdioma } from '../context/IdiomaContext'
import { useTema } from '../context/TemaContext'
import api from '../services/api'

export default function Navbar() {
  const { usuario, logout } = useAuth()
  const { idioma, setIdioma, t } = useIdioma()
  const navigate = useNavigate()
  const { oscuro, setOscuro } = useTema()
  const [solicitudesPendientes, setSolicitudesPendientes] = useState(0)

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

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  return (
    <nav className="bg-white dark:bg-gray-900 shadow px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-gray-800 dark:text-white cursor-pointer" onClick={() => navigate('/admin/dashboard')}>
        APR Xàtiva — {t.panelAdmin}
      </h1>
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/admin/solicitudes')}
          className="relative"
        >
          <span className="text-gray-600 text-sm">🔔</span>
          {solicitudesPendientes > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {solicitudesPendientes}
            </span>
          )}
        </button>
        <button onClick={() => setOscuro(!oscuro)} className="text-gray-600 hover:text-gray-800 text-xl">
            {oscuro ? '☀️' : '🌙'}
        </button>
        <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
          <button onClick={() => setIdioma('es')}
            className={`px-3 py-1 rounded-md text-xs font-medium transition ${idioma === 'es' ? 'bg-white shadow text-gray-800' : 'text-gray-500'}`}>
            ES
          </button>
          <button onClick={() => setIdioma('ca')}
            className={`px-3 py-1 rounded-md text-xs font-medium transition ${idioma === 'ca' ? 'bg-white shadow text-gray-800' : 'text-gray-500'}`}>
            VAL
          </button>
        </div>
        <button onClick={() => navigate('/admin/perfil')} className="text-gray-600 hover:text-gray-800 text-xl">
            👤
        </button>
        <button onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-lg transition">
          {t.cerrarSesion}
        </button>
      </div>
    </nav>
  )
}