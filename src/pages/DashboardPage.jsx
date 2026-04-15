import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'

export default function DashboardPage() {
  const { usuario, logout } = useAuth()
  const navigate = useNavigate()
  const [stats, setStats] = useState({
    solicitudesPendientes: 0,
    totalUsuarios: 0,
    totalVehiculos: 0,
  })

  useEffect(() => {
    const cargarStats = async () => {
      try {
        const [solicitudes, usuarios, vehiculos] = await Promise.all([
          api.get('/api/solicitudes/pendientes'),
          api.get('/api/usuarios'),
          api.get('/api/vehiculos/todos'),
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

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">APR Xàtiva — Panel Admin</h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-600 text-sm">{usuario?.email}</span>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-lg transition"
          >
            Tancar sessió
          </button>
        </div>
      </nav>

      <div className="p-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Resum general</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow p-4 flex items-center gap-4">
            <p className="text-sm text-gray-500">Sol·licituds pendents</p>
            <p className="text-2xl font-bold text-yellow-500">{stats.solicitudesPendientes}</p>
          </div>
          <div className="bg-white rounded-xl shadow p-4 flex items-center gap-4">
            <p className="text-sm text-gray-500">Total usuaris</p>
            <p className="text-2xl font-bold text-blue-500">{stats.totalUsuarios}</p>
          </div>
          <div className="bg-white rounded-xl shadow p-4 flex items-center gap-4">
            <p className="text-sm text-gray-500">Vehicles autoritzats</p>
            <p className="text-2xl font-bold text-green-500">{stats.totalVehiculos}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => navigate('/admin/solicitudes')}
            className="bg-white hover:bg-yellow-50 border border-yellow-200 rounded-2xl shadow p-6 text-left transition"
          >
            <h3 className="text-lg font-semibold text-gray-800">Sol·licituds</h3>
            <p className="text-gray-500 text-sm mt-1">Gestiona les sol·licituds d'autorització</p>
          </button>
          <button
            onClick={() => navigate('/admin/usuarios')}
            className="bg-white hover:bg-blue-50 border border-blue-200 rounded-2xl shadow p-6 text-left transition"
          >
            <h3 className="text-lg font-semibold text-gray-800">Usuaris</h3>
            <p className="text-gray-500 text-sm mt-1">Consulta i gestiona els usuaris registrats</p>
          </button>
          <button
            onClick={() => navigate('/admin/vehiculos')}
            className="bg-white hover:bg-green-50 border border-green-200 rounded-2xl shadow p-6 text-left transition"
          >
            <h3 className="text-lg font-semibold text-gray-800">Vehicles</h3>
            <p className="text-gray-500 text-sm mt-1">Consulta els vehicles per usuari</p>
          </button>
          <button
            onClick={() => navigate('/admin/derechos')}
            className="bg-white hover:bg-purple-50 border border-purple-200 rounded-2xl shadow p-6 text-left transition"
          >
            <h3 className="text-lg font-semibold text-gray-800">Drets d'accés</h3>
            <p className="text-gray-500 text-sm mt-1">Consulta els drets d'accés actius</p>
          </button>
        </div>
      </div>
    </div>
  )
}