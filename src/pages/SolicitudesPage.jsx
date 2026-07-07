import { useState, useEffect } from 'react'
import { useIdioma } from '../context/IdiomaContext'
import api from '../services/api'
import Navbar from '../components/Navbar'

const SkeletonCard = () => (
  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 animate-pulse">
    <div className="flex justify-between items-start mb-4">
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded w-32" />
        <div className="h-3 bg-gray-200 rounded w-24" />
        <div className="h-3 bg-gray-200 rounded w-28" />
      </div>
      <div className="h-6 bg-gray-200 rounded-full w-20" />
    </div>
    <div className="flex gap-3 pt-4 border-t border-gray-100">
      <div className="h-8 bg-gray-200 rounded-lg w-24" />
      <div className="h-8 bg-gray-200 rounded-lg w-20" />
      <div className="h-8 bg-gray-200 rounded-lg w-20" />
    </div>
  </div>
)

const SkeletonFila = () => (
  <tr className="animate-pulse">
    {[...Array(6)].map((_, i) => (
      <td key={i} className="px-6 py-4">
        <div className="h-4 bg-gray-200 rounded w-full" />
      </td>
    ))}
  </tr>
)

export default function SolicitudesPage() {
  const { t } = useIdioma()
  const [solicitudes, setSolicitudes] = useState([])
  const [historial, setHistorial] = useState([])
  const [loading, setLoading] = useState(true)
  const [errorGlobal, setErrorGlobal] = useState('')
  const [observaciones, setObservaciones] = useState('')
  const [rechazandoId, setRechazandoId] = useState(null)
  const [errorAccio, setErrorAccio] = useState('')
  const [tab, setTab] = useState('pendientes')
  const [documentosModal, setDocumentosModal] = useState(null)
  const [documentos, setDocumentos] = useState([])
  const [filtroDesde, setFiltroDesde] = useState('')
  const [filtroHasta, setFiltroHasta] = useState('')
  const [paginaHistorial, setPaginaHistorial] = useState(0)
  const historialPorPagina = 10

  useEffect(() => {
    cargarSolicitudes()
  }, [])

  const cargarSolicitudes = async () => {
    setLoading(true)
    setErrorGlobal('')
    try {
      const [pendientes, todas] = await Promise.all([
        api.get('/solicitudes/pendientes'),
        api.get('/solicitudes/todas'),
      ])
      setSolicitudes(pendientes.data)
      setHistorial(todas.data.filter(s => s.estado !== 'PENDIENTE'))
    } catch (err) {
      setErrorGlobal(err.response?.data?.mensaje || 'Error al carregar les sol·licituds')
    } finally {
      setLoading(false)
    }
  }

  const historialFiltrado = historial.filter(s => {
    const fecha = new Date(s.createdAt)
    const desde = filtroDesde ? new Date(filtroDesde) : null
    const hasta = filtroHasta ? new Date(filtroHasta) : null
    if (desde && fecha < desde) return false
    if (hasta) {
      const hastaFin = new Date(filtroHasta)
      hastaFin.setHours(23, 59, 59)
      if (fecha > hastaFin) return false
    }
    return true
  })

  const totalPaginesHistorial = Math.ceil(historialFiltrado.length / historialPorPagina)
  const historialPagina = historialFiltrado.slice(
    paginaHistorial * historialPorPagina,
    (paginaHistorial + 1) * historialPorPagina
  )

  const verDocumentos = async (usuarioId) => {
    try {
      const res = await api.get(`/documentos/usuario/${usuarioId}`)
      const todos = res.data
      const ultimo = todos.length > 0 ? [todos[todos.length - 1]] : []
      setDocumentos(ultimo)
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
      const contentType = res.headers.get('content-type') || 'application/octet-stream'
      const contentDisposition = res.headers.get('content-disposition')
      let nombreArchivo = `documento_${documentoId}`
      if (contentDisposition) {
        const match = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/)
        if (match) nombreArchivo = match[1].replace(/['"]/g, '')
      } else {
        if (contentType.includes('pdf')) nombreArchivo += '.pdf'
        else if (contentType.includes('jpeg') || contentType.includes('jpg')) nombreArchivo += '.jpg'
        else if (contentType.includes('png')) nombreArchivo += '.png'
      }
      const blob = await res.blob()
      const file = new Blob([blob], { type: contentType })
      const url = URL.createObjectURL(file)
      const a = document.createElement('a')
      a.href = url
      a.download = nombreArchivo
      a.click()
      URL.revokeObjectURL(url)
    } catch (err) {
      console.error(err)
    }
  }

  const aprobar = async (id) => {
    setErrorAccio('')
    try {
      await api.put(`/solicitudes/${id}/aprobar`)
      cargarSolicitudes()
    } catch (err) {
      setErrorAccio(err.response?.data?.mensaje || 'Error al aprovar la sol·licitud')
      setTimeout(() => setErrorAccio(''), 3000)
    }
  }

  const rechazar = async (id) => {
    setErrorAccio('')
    try {
      await api.put(`/solicitudes/${id}/rechazar`, { observaciones })
      setRechazandoId(null)
      setObservaciones('')
      cargarSolicitudes()
    } catch (err) {
      setErrorAccio(err.response?.data?.mensaje || 'Error al rebutjar la sol·licitud')
      setTimeout(() => setErrorAccio(''), 3000)
    }
  }

  const inputFecha = "border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none transition"

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f8f7f5', fontFamily: "'Georgia', 'Times New Roman', serif" }}>
      <Navbar />

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
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1 h-10 rounded" style={{ backgroundColor: '#C0392B' }} />
          <h2 className="text-2xl font-bold text-gray-800">{t.solicitudes}</h2>
        </div>

        {errorGlobal && (
          <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-5 text-sm flex items-center gap-2"
            style={{ fontFamily: 'sans-serif', color: '#C0392B' }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {errorGlobal}
          </div>
        )}

        {errorAccio && (
          <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-5 text-sm flex items-center gap-2"
            style={{ fontFamily: 'sans-serif', color: '#C0392B' }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {errorAccio}
          </div>
        )}

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
            {t.historial} ({historialFiltrado.length})
          </button>
        </div>

        {loading ? (
          tab === 'pendientes' ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <table className="w-full text-sm" style={{ fontFamily: 'sans-serif' }}>
                <thead>
                  <tr style={{ backgroundColor: '#C0392B' }}>
                    {['ID', 'DNI', t.estado, t.fecha, t.fechaGestion, t.observaciones].map((h, i) => (
                      <th key={i} className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-widest">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {[...Array(5)].map((_, i) => <SkeletonFila key={i} />)}
                </tbody>
              </table>
            </div>
          )
        ) : tab === 'pendientes' ? (
          solicitudes.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-12 text-center">
              <div className="text-4xl mb-3">✅</div>
              <p className="text-gray-400 text-sm" style={{ fontFamily: 'sans-serif' }}>{t.noHaySolicitudes}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {solicitudes.map((s) => (
                <div key={s.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="font-bold text-gray-800">Sol·licitud #{s.id}</p>
                      <p className="text-sm text-gray-400 mt-1 font-mono" style={{ fontFamily: 'monospace' }}>
                        {s.usuarioDni}
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
            <>
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-5 py-4 mb-4 flex items-center gap-4"
                style={{ fontFamily: 'sans-serif' }}>
                <span className="text-xs text-gray-400 uppercase tracking-widest">{t.fecha}</span>
                <div className="flex items-center gap-2">
                  <input type="date" value={filtroDesde}
                    onChange={e => { setFiltroDesde(e.target.value); setPaginaHistorial(0) }}
                    className={inputFecha}
                    onFocus={e => e.target.style.borderColor = '#C0392B'}
                    onBlur={e => e.target.style.borderColor = '#e5e7eb'} />
                  <span className="text-gray-400 text-sm">—</span>
                  <input type="date" value={filtroHasta}
                    onChange={e => { setFiltroHasta(e.target.value); setPaginaHistorial(0) }}
                    className={inputFecha}
                    onFocus={e => e.target.style.borderColor = '#C0392B'}
                    onBlur={e => e.target.style.borderColor = '#e5e7eb'} />
                </div>
                {(filtroDesde || filtroHasta) && (
                  <button
                    onClick={() => { setFiltroDesde(''); setFiltroHasta(''); setPaginaHistorial(0) }}
                    className="text-xs font-medium transition hover:opacity-70"
                    style={{ color: '#C0392B' }}>
                    {t.cancelar} ×
                  </button>
                )}
                <span className="text-xs text-gray-400 ml-auto">
                  {historialFiltrado.length} / {historial.length}
                </span>
              </div>

              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-sm" style={{ fontFamily: 'sans-serif' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#C0392B' }}>
                      {['ID', 'DNI', t.estado, t.fecha, t.fechaGestion, t.observaciones].map((h, i) => (
                        <th key={i} className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-widest">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {historialPagina.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-12 text-center text-gray-400 text-sm">
                          Cap sol·licitud coincideix amb el filtre
                        </td>
                      </tr>
                    ) : (
                      historialPagina.map((s, i) => (
                        <tr key={s.id} className="hover:bg-gray-50 transition" style={{ backgroundColor: i % 2 === 0 ? 'white' : '#fafafa' }}>
                          <td className="px-6 py-4 font-medium text-gray-700">#{s.id}</td>
                          <td className="px-6 py-4 font-mono text-xs text-gray-700">{s.usuarioDni}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                              s.estado === 'APROBADA'
                                ? 'bg-green-50 text-green-700 border border-green-200'
                                : 'bg-red-50 border border-red-200'
                            }`} style={s.estado !== 'APROBADA' ? { color: '#C0392B' } : {}}>
                              {s.estado}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-gray-500">{new Date(s.createdAt).toLocaleDateString('es-ES')}</td>
                          <td className="px-6 py-4 text-gray-500">{s.gestionadaAt ? new Date(s.gestionadaAt).toLocaleDateString('es-ES') : '-'}</td>
                          <td className="px-6 py-4 text-gray-500 max-w-xs truncate">{s.observaciones || '-'}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>

                {totalPaginesHistorial > 1 && (
                  <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between"
                    style={{ fontFamily: 'sans-serif' }}>
                    <p className="text-xs text-gray-400">
                      {paginaHistorial * historialPorPagina + 1}–{Math.min((paginaHistorial + 1) * historialPorPagina, historialFiltrado.length)} de {historialFiltrado.length}
                    </p>
                    <div className="flex gap-1">
                      <button
                        onClick={() => setPaginaHistorial(p => Math.max(0, p - 1))}
                        disabled={paginaHistorial === 0}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium transition disabled:opacity-30 disabled:cursor-not-allowed bg-gray-100 hover:bg-gray-200 text-gray-600">
                        ←
                      </button>
                      {[...Array(totalPaginesHistorial)].map((_, i) => (
                        <button key={i}
                          onClick={() => setPaginaHistorial(i)}
                          className="px-3 py-1.5 rounded-lg text-xs font-medium transition"
                          style={{
                            backgroundColor: paginaHistorial === i ? '#C0392B' : '#f3f4f6',
                            color: paginaHistorial === i ? 'white' : '#4b5563'
                          }}>
                          {i + 1}
                        </button>
                      ))}
                      <button
                        onClick={() => setPaginaHistorial(p => Math.min(totalPaginesHistorial - 1, p + 1))}
                        disabled={paginaHistorial === totalPaginesHistorial - 1}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium transition disabled:opacity-30 disabled:cursor-not-allowed bg-gray-100 hover:bg-gray-200 text-gray-600">
                        →
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          )
        )}
      </div>
    </div>
  )
}