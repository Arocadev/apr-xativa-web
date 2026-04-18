import { useState, useEffect } from 'react'
import { useIdioma } from '../context/IdiomaContext'
import api from '../services/api'
import Navbar from '../components/Navbar'

export default function VehiculosPage() {
  const { t } = useIdioma()
  const [usuarios, setUsuarios] = useState([])
  const [vehiculos, setVehiculos] = useState([])
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    api.get('/api/usuarios').then(res => setUsuarios(res.data))
  }, [])

  const buscarVehiculos = async (usuarioId) => {
    setUsuarioSeleccionado(usuarioId)
    if (!usuarioId) { setVehiculos([]); return }
    setLoading(true)
    try {
      const res = await api.get(`/api/vehiculos?usuarioId=${usuarioId}`)
      setVehiculos(res.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800">
      <Navbar />

      <div className="p-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">{t.vehiculos}</h2>

        <div className="bg-white rounded-2xl shadow p-6 mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">{t.seleccionaUsuario}</label>
          <select
            value={usuarioSeleccionado}
            onChange={(e) => buscarVehiculos(e.target.value)}
            className="w-full md:w-96 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">{t.seleccionaUsuario}</option>
            {usuarios.map(u => (
              <option key={u.id} value={u.id}>{u.dni} — {u.nombre} {u.apellidos}</option>
            ))}
          </select>
        </div>

        {loading ? (
          <p className="text-gray-500">{t.cargando}</p>
        ) : vehiculos.length > 0 ? (
          <div className="bg-white rounded-2xl shadow overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="px-6 py-3 text-left">{t.matricula}</th>
                  <th className="px-6 py-3 text-left">{t.tipoAcred}</th>
                  <th className="px-6 py-3 text-left">{t.estado}</th>
                  <th className="px-6 py-3 text-left">{t.fechaAlta}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {vehiculos.map(v => (
                  <tr key={v.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-mono">{v.matricula}</td>
                    <td className="px-6 py-4">{v.tipoAcred}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${v.activo ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {v.activo ? t.activo : t.inactivo}
                      </span>
                    </td>
                    <td className="px-6 py-4">{new Date(v.createdAt).toLocaleDateString('es-ES')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : usuarioSeleccionado ? (
          <p className="text-gray-500">{t.sinVehiculos}</p>
        ) : null}
      </div>
    </div>
  )
}