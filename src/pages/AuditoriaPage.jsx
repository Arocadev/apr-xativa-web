import { useState, useEffect } from 'react'
import { useIdioma } from '../context/IdiomaContext'
import api from '../services/api'
import Navbar from '../components/Navbar'

const eventColors = {
  LOGIN: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
  LOGOUT: { bg: 'bg-gray-50', text: 'text-gray-600', border: 'border-gray-200' },
  REGISTRO_USUARIO: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
  SOLICITUD_APROBADA: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
  SOLICITUD_RECHAZADA: { bg: 'bg-red-50', border: 'border-red-200' },
  VEHICULO_ALTA: { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200' },
  VEHICULO_BAJA: { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200' },
  DERECHO_PERMANENTE_CREADO: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
  DERECHO_PUNTUAL_CREADO: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
  DERECHO_INVITADO_CREADO: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
  DERECHO_ELIMINADO: { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200' },
}

const eventIcons = {
  LOGIN: '🔓',
  LOGOUT: '🔒',
  REGISTRO_USUARIO: '👤',
  SOLICITUD_APROBADA: '✅',
  SOLICITUD_RECHAZADA: '❌',
  VEHICULO_ALTA: '🚗',
  VEHICULO_BAJA: '🚫',
  DERECHO_PERMANENTE_CREADO: '🛡️',
  DERECHO_PUNTUAL_CREADO: '📅',
  DERECHO_INVITADO_CREADO: '👥',
  DERECHO_ELIMINADO: '🗑️',
}

const SkeletonFila = () => (
  <tr className="animate-pulse">
    {[...Array(5)].map((_, i) => (
      <td key={i} className="px-6 py-4">
        <div className="h-4 bg-gray-200 rounded w-full" />
      </td>
    ))}
  </tr>
)

const EVENTS_PER_PAGE = 20

export default function AuditoriaPage() {
  const { t } = useIdioma()
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [errorGlobal, setErrorGlobal] = useState('')
  const [filtroEvento, setFiltroEvento] = useState('')
  const [filtroDni, setFiltroDni] = useState('')
  const [pagina, setPagina] = useState(0)
  const [totalPagines, setTotalPagines] = useState(0)
  const [totalElements, setTotalElements] = useState(0)

  useEffect(() => {
    cargarLogs()
  }, [pagina])

  const cargarLogs = async () => {
    setLoading(true)
    setErrorGlobal('')
    try {
      const res = await api.get(`/auditoria?page=${pagina}&size=${EVENTS_PER_PAGE}`)
      setLogs(res.data.content)
      setTotalPagines(res.data.totalPages)
      setTotalElements(res.data.totalElements)
    } catch (err) {
      setErrorGlobal(err.response?.data?.mensaje || 'Error al carregar l\'auditoria')
    } finally {
      setLoading(false)
    }
  }

  const logsFiltrats = logs.filter(log => {
    const coincideixEvento = !filtroEvento || log.evento === filtroEvento
    const coincideixDni = !filtroDni ||
      (log.usuarioDni?.toLowerCase().includes(filtroDni.toLowerCase())) ||
      (log.realizadoPorDni?.toLowerCase().includes(filtroDni.toLowerCase()))
    return coincideixEvento && coincideixDni
  })

  const eventosUnics = [...new Set(logs.map(l => l.evento))]

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f8f7f5', fontFamily: "'Georgia', 'Times New Roman', serif" }}>
      <Navbar />

      <div className="max-w-7xl mx-auto px-8 py-10">

        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-1 h-10 rounded" style={{ backgroundColor: '#C0392B' }} />
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{t.auditoria}</h2>
              <p className="text-sm text-gray-400 mt-0.5" style={{ fontFamily: 'sans-serif' }}>
                {totalElements} registres totals
              </p>
            </div>
          </div>

          <button
            onClick={cargarLogs}
            className="flex items-center gap-2 text-sm px-4 py-2 rounded-lg border transition hover:bg-gray-50"
            style={{ fontFamily: 'sans-serif', borderColor: '#e5e7eb', color: '#6b7280' }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Actualitzar
          </button>
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

        {/* Filtres */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-5 py-4 mb-5 flex items-center gap-4 flex-wrap"
          style={{ fontFamily: 'sans-serif' }}>

          <div className="relative">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Filtrar per DNI..."
              value={filtroDni}
              onChange={e => setFiltroDni(e.target.value)}
              className="border border-gray-200 rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none transition w-48"
              onFocus={e => e.target.style.borderColor = '#C0392B'}
              onBlur={e => e.target.style.borderColor = '#e5e7eb'}
            />
          </div>

          <select
            value={filtroEvento}
            onChange={e => setFiltroEvento(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none transition"
            onFocus={e => e.target.style.borderColor = '#C0392B'}
            onBlur={e => e.target.style.borderColor = '#e5e7eb'}>
            <option value="">{t.todosLosEventos}</option>
            {eventosUnics.map(e => (
              <option key={e} value={e}>{eventIcons[e] || ''} {e}</option>
            ))}
          </select>

          {(filtroEvento || filtroDni) && (
            <button
              onClick={() => { setFiltroEvento(''); setFiltroDni('') }}
              className="text-xs font-medium transition hover:opacity-70"
              style={{ color: '#C0392B' }}>
              Netejar filtres ×
            </button>
          )}

          <span className="text-xs text-gray-400 ml-auto">
            {logsFiltrats.length} / {logs.length} en aquesta pàgina
          </span>
        </div>

        {/* Taula */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-sm" style={{ fontFamily: 'sans-serif' }}>
            <thead>
              <tr style={{ backgroundColor: '#C0392B' }}>
                {[t.evento, 'DNI usuari', t.detall ?? 'Detall', t.realizadoPor, t.fecha].map((h, i) => (
                  <th key={i} className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-widest">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                [...Array(8)].map((_, i) => <SkeletonFila key={i} />)
              ) : logsFiltrats.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-400 text-sm">
                    {t.noHayAuditoria}
                  </td>
                </tr>
              ) : (
                logsFiltrats.map((log, i) => {
                  const colors = eventColors[log.evento] || { bg: 'bg-gray-50', text: 'text-gray-600', border: 'border-gray-200' }
                  return (
                    <tr key={log.id} className="hover:bg-gray-50 transition"
                      style={{ backgroundColor: i % 2 === 0 ? 'white' : '#fafafa' }}>
                      <td className="px-6 py-3">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${colors.bg} ${colors.text} ${colors.border}`}
                          style={log.evento === 'SOLICITUD_RECHAZADA' ? { color: '#C0392B' } : {}}>
                          <span>{eventIcons[log.evento] || '•'}</span>
                          {log.evento.replace(/_/g, ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-3 font-mono text-xs text-gray-600">
                        {log.usuarioDni || '—'}
                      </td>
                      <td className="px-6 py-3 text-gray-500 text-xs max-w-xs truncate">
                        {log.detalle || '—'}
                      </td>
                      <td className="px-6 py-3 font-mono text-xs text-gray-500">
                        {log.realizadoPorDni || '—'}
                      </td>
                      <td className="px-6 py-3 text-gray-400 text-xs whitespace-nowrap">
                        {new Date(log.createdAt).toLocaleString('es-ES', {
                          day: '2-digit', month: '2-digit', year: 'numeric',
                          hour: '2-digit', minute: '2-digit'
                        })}
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>

          {!loading && totalPagines > 1 && (
            <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between"
              style={{ fontFamily: 'sans-serif' }}>
              <p className="text-xs text-gray-400">
                Pàgina {pagina + 1} de {totalPagines} · {totalElements} registres
              </p>
              <div className="flex gap-1">
                <button
                  onClick={() => setPagina(p => Math.max(0, p - 1))}
                  disabled={pagina === 0}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium transition disabled:opacity-30 disabled:cursor-not-allowed bg-gray-100 hover:bg-gray-200 text-gray-600">
                  ←
                </button>
                {[...Array(Math.min(totalPagines, 7))].map((_, i) => {
                  const idx = totalPagines <= 7 ? i : Math.max(0, Math.min(pagina - 3, totalPagines - 7)) + i
                  return (
                    <button key={idx}
                      onClick={() => setPagina(idx)}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium transition"
                      style={{
                        backgroundColor: pagina === idx ? '#C0392B' : '#f3f4f6',
                        color: pagina === idx ? 'white' : '#4b5563'
                      }}>
                      {idx + 1}
                    </button>
                  )
                })}
                <button
                  onClick={() => setPagina(p => Math.min(totalPagines - 1, p + 1))}
                  disabled={pagina === totalPagines - 1}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium transition disabled:opacity-30 disabled:cursor-not-allowed bg-gray-100 hover:bg-gray-200 text-gray-600">
                  →
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}