import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useIdioma } from '../context/IdiomaContext'

export default function Navbar() {
  const { usuario, logout } = useAuth()
  const { idioma, setIdioma, t } = useIdioma()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  return (
    <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-gray-800 cursor-pointer" onClick={() => navigate('/admin/dashboard')}>
        APR Xàtiva — {t.panelAdmin}
      </h1>
      <div className="flex items-center gap-4">
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
        <span className="text-gray-600 text-sm">{usuario?.email}</span>
        <button onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-lg transition">
          {t.cerrarSesion}
        </button>
      </div>
    </nav>
  )
}