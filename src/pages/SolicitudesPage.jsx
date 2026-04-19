import { useState, useEffect } from 'react'
import { useIdioma } from '../context/IdiomaContext'
import api from '../services/api'
import Navbar from '../components/Navbar'

export default function SolicitudesPage() {
  const { t } = useIdioma()
  const [solicitudes, setSolicitudes] = useState([])
  const [historial, setHistorial] = useState([])
  const [loading, setLoading] = useState(true)
  const [observaciones, setObservaciones] = useState('')
  const [rechazandoId, setRechazandoId] = useState(null)
  const [tab, setTab] = useState('pendientes')

  useEffect(() => {
    cargarSolicitudes()
  }, [])

  const cargarSolicitudes = async () => {
    try {
      const [pendientes, todas] = await Promise.all([
        api.get('/solicitudes/pendientes'),
        api.get('/solicitudes/todas'),
      ])
      setSolicitudes(pendientes.data)
      setHistorial(todas.data.filter(s => s.estado !== 'PENDIENTE'))
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const aprobar = async (id) => {
    try {
      await api.put(`/solicitudes/${id}/aprobar`)
      cargarSolicitudes()
    } catch (err) {
      console.error(err)
    }
  }

  const rechazar = async (id) => {
    try {
      await api.put(`/solicitudes/${id}/rechazar`, { observaciones })
      setRechazandoId(null)
      setObservaciones('')
      cargarSolicitudes()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800">
      <Navbar />

      <div className="p-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">{t.solicitudes}</h2>

        <div className="flex gap-4 mb-6">
          <button onClick={() => setTab('pendientes')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${tab === 'pendientes' ? 'bg-yellow-500 text-white' : 'bg-white text-gray-600 shadow'}`}>
            {t.pendientes} ({solicitudes.length})
          </button>
          <button onClick={() => setTab('historial')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${tab === 'historial' ? 'bg-blue-500 text-white' : 'bg-white text-gray-600 shadow'}`}>
            {t.historial} ({historial.length})
          </button>
        </div>

        {loading ? (
          <p className="text-gray-500">{t.cargando}</p>
        ) : tab === 'pendientes' ? (
          solicitudes.length === 0 ? (
            <div className="bg-white rounded-2xl shadow p-8 text-center text-gray-500">
              {t.noHaySolicitudes}
            </div>
          ) : (
            <div className="space-y-4">
              {solicitudes.map((s) => (
                <div key={s.id} className="bg-white rounded-2xl shadow p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-gray-800">Solicitud #{s.id}</p>
                      <p className="text-sm text-gray-500 mt-1">Usuario ID: {s.usuarioId}</p>
                      <p className="text-sm text-gray-500">{t.fecha}: {new Date(s.createdAt).toLocaleDateString('es-ES')}</p>
                    </div>
                    <span className="bg-yellow-100 text-yellow-700 text-xs font-semibold px-3 py-1 rounded-full">{s.estado}</span>
                  </div>
                  {rechazandoId === s.id ? (
                    <div className="mt-4 space-y-3">
                      <textarea
                        value={observaciones}
                        onChange={(e) => setObservaciones(e.target.value)}
                        placeholder={t.motivoRechazo}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                        rows={3}
                      />
                      <div className="flex gap-3">
                        <button onClick={() => rechazar(s.id)} className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-lg transition">{t.confirmarRechazo}</button>
                        <button onClick={() => setRechazandoId(null)} className="bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm px-4 py-2 rounded-lg transition">{t.cancelar}</button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex gap-3 mt-4">
                      <button onClick={() => aprobar(s.id)} className="bg-green-500 hover:bg-green-600 text-white text-sm px-4 py-2 rounded-lg transition">{t.aprobar}</button>
                      <button onClick={() => setRechazandoId(s.id)} className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-lg transition">{t.rechazar}</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )
        ) : (
          historial.length === 0 ? (
            <div className="bg-white rounded-2xl shadow p-8 text-center text-gray-500">
              {t.noHayHistorial}
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-gray-600">
                  <tr>
                    <th className="px-6 py-3 text-left">ID</th>
                    <th className="px-6 py-3 text-left">Usuario ID</th>
                    <th className="px-6 py-3 text-left">{t.estado}</th>
                    <th className="px-6 py-3 text-left">{t.fecha}</th>
                    <th className="px-6 py-3 text-left">{t.fechaGestion}</th>
                    <th className="px-6 py-3 text-left">{t.observaciones}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {historial.map((s) => (
                    <tr key={s.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">#{s.id}</td>
                      <td className="px-6 py-4">{s.usuarioId}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${s.estado === 'APROBADA' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {s.estado}
                        </span>
                      </td>
                      <td className="px-6 py-4">{new Date(s.createdAt).toLocaleDateString('es-ES')}</td>
                      <td className="px-6 py-4">{s.gestionadaAt ? new Date(s.gestionadaAt).toLocaleDateString('es-ES') : '-'}</td>
                      <td className="px-6 py-4">{s.observaciones || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        )}
      </div>
    </div>
  )
}