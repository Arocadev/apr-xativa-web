import { useState, useEffect, useRef } from 'react'
import api from '../services/api'
import Navbar from '../components/Navbar'

export default function SimuladorPage() {
  const [activo, setActivo] = useState(false)
  const [logs, setLogs] = useState([])
  const [stats, setStats] = useState({ total: 0, permitidos: 0, denegados: 0 })
  const [ultimoResultado, setUltimoResultado] = useState(null)
  const intervalRef = useRef(null)
  const terminalRef = useRef(null)

  const ahora = () => new Date().toLocaleTimeString('es-ES')

  const añadirLog = (linea, tipo = 'info') => {
    setLogs(prev => [...prev, { linea, tipo, id: Date.now() + Math.random() }])
  }

  const comprobar = async () => {
    const hora = ahora()
    añadirLog(`[${hora}] Detectant matrícula...`, 'info')
    await new Promise(r => setTimeout(r, 300))
    try {
      const res = await api.get('/simulador/comprobar')
      const data = res.data
      const hora2 = ahora()
      añadirLog(`[${hora2}] Consultant backend...`, 'info')
      await new Promise(r => setTimeout(r, 200))
      const hora3 = ahora()
      setUltimoResultado(data)
      if (data.acceso) {
        añadirLog(`[${hora3}] ${data.matricula}  ✅ ACCÉS PERMÈS — ${data.tipoDerecho === 'PERMANENTE' ? 'Dret permanent' : 'Dret puntual'}`, 'ok')
        setStats(prev => ({ total: prev.total + 1, permitidos: prev.permitidos + 1, denegados: prev.denegados }))
      } else {
        añadirLog(`[${hora3}] ${data.matricula}  ❌ ACCÉS DENEGAT — ${data.motivo}`, 'error')
        setStats(prev => ({ total: prev.total + 1, permitidos: prev.permitidos, denegados: prev.denegados + 1 }))
      }
      añadirLog('', 'spacer')
    } catch (err) {
      añadirLog(`[${ahora()}] ⚠️ Error de connexió`, 'warn')
    }
  }

  const iniciar = () => {
    setActivo(true)
    setLogs([])
    setStats({ total: 0, permitidos: 0, denegados: 0 })
    setUltimoResultado(null)
    añadirLog('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'divider')
    añadirLog('  📷  CÀMERA APR — ZONA 1.A  LA SEU', 'title')
    añadirLog('  Sistema de control d\'accés iniciat', 'title')
    añadirLog('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'divider')
    añadirLog('', 'spacer')
    comprobar()
    intervalRef.current = setInterval(comprobar, 2000)
  }

  const parar = () => {
    setActivo(false)
    clearInterval(intervalRef.current)
    añadirLog('', 'spacer')
    añadirLog('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'divider')
    añadirLog('  Sistema aturat', 'title')
    añadirLog('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'divider')
  }

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [logs])

  useEffect(() => {
    return () => clearInterval(intervalRef.current)
  }, [])

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f8f7f5', fontFamily: "'Georgia', 'Times New Roman', serif" }}>
      <Navbar />

      <div className="max-w-6xl mx-auto px-8 py-10">

        {/* Cabecera */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-1 h-10 rounded" style={{ backgroundColor: '#C0392B' }} />
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Simulador de càmeres APR</h2>
              <p className="text-sm text-gray-400 mt-0.5" style={{ fontFamily: 'sans-serif' }}>
                Zona 1.A — La Seu · Xàtiva · {new Date().toLocaleDateString('ca-ES')}
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-3" style={{ fontFamily: 'sans-serif' }}>
            <div className="bg-white border border-gray-100 rounded-xl px-5 py-3 text-center shadow-sm">
              <p className="text-2xl font-semibold text-gray-700">{stats.total}</p>
              <p className="text-xs text-gray-400 uppercase tracking-widest">Total</p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-xl px-5 py-3 text-center shadow-sm">
              <p className="text-2xl font-semibold text-green-600">{stats.permitidos}</p>
              <p className="text-xs text-green-500 uppercase tracking-widest">Permesos</p>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-xl px-5 py-3 text-center shadow-sm">
              <p className="text-2xl font-semibold" style={{ color: '#C0392B' }}>{stats.denegados}</p>
              <p className="text-xs uppercase tracking-widest" style={{ color: '#C0392B' }}>Denegats</p>
            </div>
          </div>

          {/* Botón + estado */}
          <div className="flex items-center gap-3" style={{ fontFamily: 'sans-serif' }}>
            <button
              onClick={activo ? parar : iniciar}
              className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition hover:opacity-90"
              style={{ backgroundColor: activo ? '#C0392B' : '#16a34a' }}>
              {activo ? '⏹ Aturar' : '▶ Iniciar'}
            </button>
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-medium"
              style={{
                borderColor: activo ? '#bbf7d0' : '#e5e7eb',
                backgroundColor: activo ? '#f0fdf4' : '#f9fafb',
                color: activo ? '#16a34a' : '#9ca3af'
              }}>
              <div className="w-2 h-2 rounded-full"
                style={{ backgroundColor: activo ? '#22c55e' : '#9ca3af' }} />
              {activo ? 'En línia' : 'Aturat'}
            </div>
          </div>
        </div>

        {/* Layout dos columnas */}
        <div style={{ display: 'flex', gap: '20px', height: 'calc(100vh - 280px)' }}>

          {/* Terminal */}
          <div style={{
            flex: 1,
            background: '#0d1117',
            borderRadius: '12px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 4px 24px rgba(0,0,0,0.18)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 16px',
              background: '#161b22',
              borderBottom: '1px solid #21262d'
            }}>
              <div style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#ff5f57' }} />
              <div style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#febc2e' }} />
              <div style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#28c840' }} />
              <span style={{ marginLeft: '8px', color: '#484f58', fontSize: '12px', fontFamily: 'monospace' }}>
                camara-apr — control_acces
              </span>
            </div>
            <div
              ref={terminalRef}
              style={{
                flex: 1,
                padding: '16px',
                fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                fontSize: '13px',
                overflowY: 'auto',
                lineHeight: '1.6'
              }}
            >
              {logs.length === 0 && (
                <p style={{ color: '#484f58' }}>Premeu "Iniciar" per començar...</p>
              )}
              {logs.map((log) => (
                log.tipo === 'spacer' ? (
                  <div key={log.id} style={{ height: '8px' }} />
                ) : (
                  <p key={log.id} style={{
                    margin: 0,
                    color:
                      log.tipo === 'ok' ? '#3fb950' :
                      log.tipo === 'error' ? '#f85149' :
                      log.tipo === 'warn' ? '#d29922' :
                      log.tipo === 'divider' ? '#30363d' :
                      log.tipo === 'title' ? '#58a6ff' :
                      '#8b949e'
                  }}>
                    {log.linea}
                  </p>
                )
              ))}
            </div>
          </div>

          {/* Panel derecho — Últim accés */}
          <div style={{ width: '280px' }}>
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 h-full">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4"
                style={{ fontFamily: 'sans-serif' }}>
                Últim accés
              </p>
              {ultimoResultado ? (
                <div style={{ fontFamily: 'sans-serif' }}>
                  <div className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold mb-3 border"
                    style={{
                      backgroundColor: ultimoResultado.acceso ? '#f0fdf4' : '#fef2f2',
                      color: ultimoResultado.acceso ? '#16a34a' : '#C0392B',
                      borderColor: ultimoResultado.acceso ? '#bbf7d0' : '#fecaca'
                    }}>
                    {ultimoResultado.acceso ? '✅ PERMÈS' : '❌ DENEGAT'}
                  </div>
                  <p className="font-mono font-bold text-gray-800 mb-1" style={{ fontSize: '26px', letterSpacing: '0.05em' }}>
                    {ultimoResultado.matricula}
                  </p>
                  <p className="text-sm text-gray-400 mb-3">
                    {ultimoResultado.motiu || ultimoResultado.motivo}
                  </p>
                  {ultimoResultado.acceso && (
                    <div className="border-t border-gray-100 pt-3 space-y-1.5">
                      {[
                        ['Tipus', ultimoResultado.tipoDerecho],
                        ['Acred.', ultimoResultado.tipoAcred],
                        ultimoResultado.fechaFin && ['Fins', ultimoResultado.fechaFin.split('-').reverse().join('/')]
                      ].filter(Boolean).map(([k, v]) => (
                        <div key={k} className="flex justify-between">
                          <span className="text-xs text-gray-400">{k}</span>
                          <span className="text-xs font-medium text-gray-700">{v}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-sm text-gray-400" style={{ fontFamily: 'sans-serif' }}>Cap accés registrat</p>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}