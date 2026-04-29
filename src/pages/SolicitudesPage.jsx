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
  const [documentosModal, setDocumentosModal] = useState(null)
  const [documentos, setDocumentos] = useState([])

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

  const verDocumentos = async (usuarioId) => {
    try {
      const res = await api.get(`/documentos/usuario/${usuarioId}`)
      setDocumentos(res.data)
      setDocumentosModal(usuarioId)
    } catch (err) {
      console.error(err)
    }
  }

  const verArchivo = async (documentoId) => {
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`http://localhost:8080/api/documentos/ver/${documentoId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      const contentType = res.headers.get('content-type')
      const blob = await res.blob()
      const file = new Blob([blob], { type: contentType })
      const url = URL.createObjectURL(file)
      window.open(url, '_blank')
    } catch (err) {
      console.error(err)
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
    <div className="min-h-screen" style={{ backgroundColor: '#f8f7f5', fontFamily: "'Georgia', 'Times New Roman', serif" }}>
      <Navbar />

      {/* Modal documentos */}
      {documentosModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-1 h-8 rounded" style={{ backgroundColor: '#C0392B' }} />
              <h3 className="text-lg font-bold text-gray-800">{t.documentos}</h3>
            </div>
            {documentos.length === 0 ? (
              <p className="text-gray-400 text-sm text-center py-4">{t.sinDocumentos}</p>
            ) : (
              <ul className="space-y-2">
                {documentos.map((d) => (
                  <li key={d.id} className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-3">
                    <p className="font-semibold text-gray-700 text-sm">{d.tipoDoc}</p>
                    <p className="text-gray-400 text-xs mt-0.5">{new Date(d.subidoAt).toLocaleDateString('es-ES')}</p>
                    <button
                      onClick={() => verArchivo(d.id)}
                      className="text-xs font-semibold mt-2 inline-block transition hover:opacity-70"
                      style={{ color: '#C0392B', background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
                    >
                      {t.verDocumentos} →
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <button
              onClick={() => setDocumentosModal(null)}
              className="mt-5 w-full py-2.5 rounded-xl text-sm font-medium transition bg-gray-100 hover:bg-gray-200 text-gray-600"
              style={{ fontFamily: 'sans-serif' }}>
              {t.cerrar}
            </button>
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto px-8 py-10">

        {/* Cabecera */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1 h-10 rounded" style={{ backgroundColor: '#C0392B' }} />
          <h2 className="text-2xl font-bold text-gray-800">{t.solicitudes}</h2>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setTab('pendientes')}
            className="px-5 py-2 rounded-lg text-sm font-medium transition"
            style={{
              fontFamily: 'sans-serif',
              backgroundColor: tab === 'pendientes' ? '#C0392B' : 'white',
              color: tab === 'pendientes' ? 'white' : '#6b7280',
              boxShadow: tab === 'pendientes' ? 'none' : '0 1px 3px rgba(0,0,0,0.1)'
            }}>
            {t.pendientes} ({solicitudes.length})
          </button>
          <button
            onClick={() => setTab('historial')}
            className="px-5 py-2 rounded-lg text-sm font-medium transition"
            style={{
              fontFamily: 'sans-serif',
              backgroundColor: tab === 'historial' ? '#C0392B' : 'white',
              color: tab === 'historial' ? 'white' : '#6b7280',
              boxShadow: tab === 'historial' ? 'none' : '0 1px 3px rgba(0,0,0,0.1)'
            }}>
            {t.historial} ({historial.length})
          </button>
        </div>

        {loading ? (
          <p className="text-gray-400 text-sm" style={{ fontFamily: 'sans-serif' }}>{t.cargando}</p>
        ) : tab === 'pendientes' ? (
          solicitudes.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-12 text-center">
              <p className="text-gray-400 text-sm" style={{ fontFamily: 'sans-serif' }}>{t.noHaySolicitudes}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {solicitudes.map((s) => (
                <div key={s.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="font-bold text-gray-800">Sol·licitud #{s.id}</p>
                      <p className="text-sm text-gray-400 mt-1" style={{ fontFamily: 'sans-serif' }}>
                        {t.usuarios} ID: {s.usuarioId}
                      </p>
                      <p className="text-sm text-gray-400" style={{ fontFamily: 'sans-serif' }}>
                        {t.fecha}: {new Date(s.createdAt).toLocaleDateString('es-ES')}
                      </p>
                    </div>
                    <span className="bg-amber-50 text-amber-600 border border-amber-200 text-xs font-semibold px-3 py-1 rounded-full"
                      style={{ fontFamily: 'sans-serif' }}>
                      {s.estado}
                    </span>
                  </div>

                  {rechazandoId === s.id ? (
                    <div className="space-y-3 pt-4 border-t border-gray-100">
                      <textarea
                        value={observaciones}
                        onChange={(e) => setObservaciones(e.target.value)}
                        placeholder={t.motivoRechazo}
                        className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none transition"
                        style={{ fontFamily: 'sans-serif' }}
                        onFocus={e => e.target.style.borderColor = '#C0392B'}
                        onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                        rows={3}
                      />
                      <div className="flex gap-3">
                        <button
                          onClick={() => rechazar(s.id)}
                          className="text-white text-sm px-5 py-2 rounded-lg transition hover:opacity-90"
                          style={{ backgroundColor: '#C0392B', fontFamily: 'sans-serif' }}>
                          {t.confirmarRechazo}
                        </button>
                        <button
                          onClick={() => setRechazandoId(null)}
                          className="bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm px-5 py-2 rounded-lg transition"
                          style={{ fontFamily: 'sans-serif' }}>
                          {t.cancelar}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex gap-3 pt-4 border-t border-gray-100">
                      <button
                        onClick={() => verDocumentos(s.usuarioId)}
                        className="text-sm px-4 py-2 rounded-lg border transition hover:opacity-80"
                        style={{ borderColor: '#C0392B', color: '#C0392B', fontFamily: 'sans-serif', background: 'white' }}>
                        {t.verDocumentos}
                      </button>
                      <button
                        onClick={() => aprobar(s.id)}
                        className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded-lg transition"
                        style={{ fontFamily: 'sans-serif' }}>
                        {t.aprobar}
                      </button>
                      <button
                        onClick={() => setRechazandoId(s.id)}
                        className="text-white text-sm px-4 py-2 rounded-lg transition hover:opacity-90"
                        style={{ backgroundColor: '#C0392B', fontFamily: 'sans-serif' }}>
                        {t.rechazar}
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )
        ) : (
          historial.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-12 text-center">
              <p className="text-gray-400 text-sm" style={{ fontFamily: 'sans-serif' }}>{t.noHayHistorial}</p>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <table className="w-full text-sm" style={{ fontFamily: 'sans-serif' }}>
                <thead>
                  <tr style={{ backgroundColor: '#C0392B' }}>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-widest">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-widest">Usuari ID</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-widest">{t.estado}</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-widest">{t.fecha}</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-widest">{t.fechaGestion}</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-widest">{t.observaciones}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {historial.map((s, i) => (
                    <tr key={s.id} className="hover:bg-gray-50 transition" style={{ backgroundColor: i % 2 === 0 ? 'white' : '#fafafa' }}>
                      <td className="px-6 py-4 font-medium text-gray-700">#{s.id}</td>
                      <td className="px-6 py-4 text-gray-500">{s.usuarioId}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                          s.estado === 'APROBADA'
                            ? 'bg-green-50 text-green-700 border border-green-200'
                            : 'bg-red-50 border border-red-200'
                        }`}
                          style={s.estado !== 'APROBADA' ? { color: '#C0392B' } : {}}>
                          {s.estado}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-500">{new Date(s.createdAt).toLocaleDateString('es-ES')}</td>
                      <td className="px-6 py-4 text-gray-500">{s.gestionadaAt ? new Date(s.gestionadaAt).toLocaleDateString('es-ES') : '-'}</td>
                      <td className="px-6 py-4 text-gray-500">{s.observaciones || '-'}</td>
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