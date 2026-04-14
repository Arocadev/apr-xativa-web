import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

export default function SolicitudesPage() {
  const [solicitudes, setSolicitudes] = useState([])
  const [loading, setLoading] = useState(true)
  const [observaciones, setObservaciones] = useState('')
  const [rechazandoId, setRechazandoId] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    cargarSolicitudes()
  }, [])

  const cargarSolicitudes = async () => {
    try {
      const res = await api.get('/api/solicitudes/pendientes')
      setSolicitudes(res.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const aprobar = async (id) => {
    try {
      await api.put(`/api/solicitudes/${id}/aprobar`)
      cargarSolicitudes()
    } catch (err) {
      console.error(err)
    }
  }

  const rechazar = async (id) => {
    try {
      await api.put(`/api/solicitudes/${id}/rechazar`, { observaciones })
      setRechazandoId(null)
      setObservaciones('')
      cargarSolicitudes()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">APR Xàtiva — Panel Admin</h1>
        <button
          onClick={() => navigate('/admin/dashboard')}
          className="text-blue-600 hover:underline text-sm"
        >
          ← Volver al dashboard
        </button>
      </nav>

      <div className="p-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Solicitudes pendientes</h2>

        {loading ? (
          <p className="text-gray-500">Cargando...</p>
        ) : solicitudes.length === 0 ? (
          <div className="bg-white rounded-2xl shadow p-8 text-center text-gray-500">
            No hay solicitudes pendientes
          </div>
        ) : (
          <div className="space-y-4">
            {solicitudes.map((s) => (
              <div key={s.id} className="bg-white rounded-2xl shadow p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-gray-800">Solicitud #{s.id}</p>
                    <p className="text-sm text-gray-500 mt-1">Usuario ID: {s.usuarioId}</p>
                    <p className="text-sm text-gray-500">
                      Fecha: {new Date(s.createdAt).toLocaleDateString('es-ES')}
                    </p>
                  </div>
                  <span className="bg-yellow-100 text-yellow-700 text-xs font-semibold px-3 py-1 rounded-full">
                    {s.estado}
                  </span>
                </div>

                {rechazandoId === s.id ? (
                  <div className="mt-4 space-y-3">
                    <textarea
                      value={observaciones}
                      onChange={(e) => setObservaciones(e.target.value)}
                      placeholder="Motivo del rechazo..."
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                      rows={3}
                    />
                    <div className="flex gap-3">
                      <button
                        onClick={() => rechazar(s.id)}
                        className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-lg transition"
                      >
                        Confirmar rechazo
                      </button>
                      <button
                        onClick={() => setRechazandoId(null)}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm px-4 py-2 rounded-lg transition"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={() => aprobar(s.id)}
                      className="bg-green-500 hover:bg-green-600 text-white text-sm px-4 py-2 rounded-lg transition"
                    >
                      Aprobar
                    </button>
                    <button
                      onClick={() => setRechazandoId(s.id)}
                      className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-lg transition"
                    >
                      Rechazar
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}