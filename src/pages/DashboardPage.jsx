import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useIdioma } from '../context/IdiomaContext'
import api from '../services/api'
import useAutoLogout from '../utils/useAutoLogout'
import Navbar from '../components/Navbar'

export default function DashboardPage() {
  const { t } = useIdioma()
  const navigate = useNavigate()
  useAutoLogout(30)
  const [stats, setStats] = useState({
    solicitudesPendientes: 0,
    totalUsuarios: 0,
    totalVehiculos: 0,
  })

  useEffect(() => {
    const cargarStats = async () => {
      try {
        const [solicitudes, usuarios, vehiculos] = await Promise.all([
          api.get('/solicitudes/pendientes'),
          api.get('/usuarios'),
          api.get('/vehiculos/todos'),
        ])
        setStats({
          solicitudesPendientes: solicitudes.data.length,
          totalUsuarios: usuarios.data.length,
          totalVehiculos: vehiculos.data.length,
        })
      } catch (err) {
        console.error(err)
      }
    }
    cargarStats()
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800">
      <Navbar />

      <div className="p-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">{t.resumenGeneral}</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow p-4 flex items-center gap-4">
            <p className="text-sm text-gray-500">{t.solicitudesPendientes}</p>
            <p className="text-2xl font-bold text-yellow-500">{stats.solicitudesPendientes}</p>
          </div>
          <div className="bg-white rounded-xl shadow p-4 flex items-center gap-4">
            <p className="text-sm text-gray-500">{t.totalUsuarios}</p>
            <p className="text-2xl font-bold text-blue-500">{stats.totalUsuarios}</p>
          </div>
          <div className="bg-white rounded-xl shadow p-4 flex items-center gap-4">
            <p className="text-sm text-gray-500">{t.vehiculosAutorizados}</p>
            <p className="text-2xl font-bold text-green-500">{stats.totalVehiculos}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button onClick={() => navigate('/admin/solicitudes')}
            className="bg-white hover:bg-yellow-50 border border-yellow-200 rounded-2xl shadow p-6 text-left transition">
            <h3 className="text-lg font-semibold text-gray-800">{t.solicitudes}</h3>
            <p className="text-gray-500 text-sm mt-1">{t.gestionarSolicitudes}</p>
          </button>
          <button onClick={() => navigate('/admin/usuarios')}
            className="bg-white hover:bg-blue-50 border border-blue-200 rounded-2xl shadow p-6 text-left transition">
            <h3 className="text-lg font-semibold text-gray-800">{t.usuarios}</h3>
            <p className="text-gray-500 text-sm mt-1">{t.gestionarUsuarios}</p>
          </button>
          <button onClick={() => navigate('/admin/vehiculos')}
            className="bg-white hover:bg-green-50 border border-green-200 rounded-2xl shadow p-6 text-left transition">
            <h3 className="text-lg font-semibold text-gray-800">{t.vehiculos}</h3>
            <p className="text-gray-500 text-sm mt-1">{t.consultarVehiculos}</p>
          </button>
          <button onClick={() => navigate('/admin/derechos')}
            className="bg-white hover:bg-purple-50 border border-purple-200 rounded-2xl shadow p-6 text-left transition">
            <h3 className="text-lg font-semibold text-gray-800">{t.derechos}</h3>
            <p className="text-gray-500 text-sm mt-1">{t.consultarDerechos}</p>
          </button>
        </div>
      </div>
    </div>
  )
}