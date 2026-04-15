import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

export default function DerechosPage() {
  const [usuarios, setUsuarios] = useState([])
  const [derechos, setDerechos] = useState([])
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    api.get('/api/usuarios').then(res => setUsuarios(res.data))
  }, [])

  const buscarDerechos = async (usuarioId) => {
    setUsuarioSeleccionado(usuarioId)
    if (!usuarioId) { setDerechos([]); return }
    setLoading(true)
    try {
      const res = await api.get(`/api/derechos?usuarioId=${usuarioId}`)
      setDerechos(res.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">APR Xàtiva — Panel Admin</h1>
        <button onClick={() => navigate('/admin/dashboard')} className="text-blue-600 hover:underline text-sm">
          ← Volver al dashboard
        </button>
      </nav>

      <div className="p-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Derechos de acceso</h2>

        <div className="bg-white rounded-2xl shadow p-6 mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Selecciona un usuario</label>
          <select
            value={usuarioSeleccionado}
            onChange={(e) => buscarDerechos(e.target.value)}
            className="w-full md:w-96 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Selecciona usuario --</option>
            {usuarios.map(u => (
              <option key={u.id} value={u.id}>{u.dni} — {u.nombre} {u.apellidos}</option>
            ))}
          </select>
        </div>

        {loading ? (
          <p className="text-gray-500">Cargando...</p>
        ) : derechos.length > 0 ? (
          <div className="bg-white rounded-2xl shadow overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="px-6 py-3 text-left">Matrícula</th>
                  <th className="px-6 py-3 text-left">Tipo derecho</th>
                  <th className="px-6 py-3 text-left">Tipo acreditación</th>
                  <th className="px-6 py-3 text-left">Fecha inicio</th>
                  <th className="px-6 py-3 text-left">Fecha fin</th>
                  <th className="px-6 py-3 text-left">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {derechos.map(d => (
                  <tr key={d.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-mono">{d.matricula}</td>
                    <td className="px-6 py-4">{d.tipoDerecho}</td>
                    <td className="px-6 py-4">{d.tipoAcred}</td>
                    <td className="px-6 py-4">{d.fechaInicio}</td>
                    <td className="px-6 py-4">{d.fechaFin}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${d.activo ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {d.activo ? 'Activo' : 'Inactivo'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : usuarioSeleccionado ? (
          <p className="text-gray-500">Este usuario no tiene derechos de acceso.</p>
        ) : null}
      </div>
    </div>
  )
}