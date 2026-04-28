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

  const StatBadge = ({ label, value, color }) => (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '6px 20px',
      borderRadius: '8px',
      background: color === 'gray' ? '#f9fafb' : color === 'green' ? '#f0fdf4' : '#fef2f2',
      border: `1px solid ${color === 'gray' ? '#e5e7eb' : color === 'green' ? '#bbf7d0' : '#fecaca'}`,
    }}>
      <span style={{
        fontSize: '20px',
        fontWeight: '700',
        color: color === 'gray' ? '#111827' : color === 'green' ? '#16a34a' : '#dc2626',
        lineHeight: 1.2
      }}>{value}</span>
      <span style={{
        fontSize: '11px',
        fontWeight: '500',
        color: color === 'gray' ? '#9ca3af' : color === 'green' ? '#16a34a' : '#dc2626',
        textTransform: 'uppercase',
        letterSpacing: '0.05em'
      }}>{label}</span>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800">
      <Navbar />
      <div style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>

          {/* Izquierda — título */}
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', margin: 0 }}
              className="dark:text-white">
              Simulador de càmeres APR
            </h2>
            <p style={{ fontSize: '13px', color: '#6b7280', margin: '2px 0 0 0' }}>
              Zona 1.A — La Seu · Xàtiva
            </p>
          </div>

          {/* Centro — stats */}
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <StatBadge label="Total" value={stats.total} color="gray" />
            <StatBadge label="Permesos" value={stats.permitidos} color="green" />
            <StatBadge label="Denegats" value={stats.denegados} color="red" />
          </div>

          {/* Derecha — botón + estado */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={activo ? parar : iniciar}
              style={{
                padding: '7px 16px',
                borderRadius: '7px',
                fontSize: '13px',
                fontWeight: '500',
                border: 'none',
                cursor: 'pointer',
                background: activo ? '#ef4444' : '#22c55e',
                color: 'white',
                transition: 'opacity 0.15s'
              }}
              onMouseEnter={e => e.target.style.opacity = '0.85'}
              onMouseLeave={e => e.target.style.opacity = '1'}
            >
              {activo ? '⏹ Aturar' : '▶ Iniciar'}
            </button>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 12px',
              borderRadius: '7px',
              fontSize: '12px',
              fontWeight: '500',
              border: `1px solid ${activo ? '#bbf7d0' : '#e5e7eb'}`,
              background: activo ? '#f0fdf4' : '#f9fafb',
              color: activo ? '#16a34a' : '#9ca3af'
            }}>
              <div style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                background: activo ? '#22c55e' : '#9ca3af',
                animation: activo ? 'pulse 1.5s infinite' : 'none'
              }} />
              {activo ? 'En línia' : 'Aturat'}
            </div>
          </div>
        </div>

        {/* Layout dos columnas */}
        <div style={{ display: 'flex', gap: '20px', height: 'calc(100vh - 220px)' }}>

          {/* Terminal */}
          <div style={{
            flex: 1,
            background: '#0d1117',
            borderRadius: '10px',
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

          {/* Panel derecho */}
          <div style={{ width: '280px', display: 'flex', flexDirection: 'column', gap: '12px' }}>

            {/* Últim accés */}
            <div style={{
              flex: 1,
              background: 'white',
              borderRadius: '10px',
              padding: '16px',
              boxShadow: '0 1px 4px rgba(0,0,0,0.08)'
            }} className="dark:bg-gray-900">
              <p style={{ fontSize: '11px', fontWeight: '600', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 12px 0' }}>
                Últim accés
              </p>
              {ultimoResultado ? (
                <div>
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '3px 10px',
                    borderRadius: '5px',
                    fontSize: '11px',
                    fontWeight: '600',
                    marginBottom: '10px',
                    background: ultimoResultado.acceso ? '#f0fdf4' : '#fef2f2',
                    color: ultimoResultado.acceso ? '#16a34a' : '#dc2626',
                    border: `1px solid ${ultimoResultado.acceso ? '#bbf7d0' : '#fecaca'}`
                  }}>
                    {ultimoResultado.acceso ? '✅ PERMÈS' : '❌ DENEGAT'}
                  </div>
                  <p style={{
                    fontSize: '26px',
                    fontFamily: 'monospace',
                    fontWeight: '700',
                    color: '#111827',
                    margin: '0 0 6px 0',
                    letterSpacing: '0.05em'
                  }} className="dark:text-white">
                    {ultimoResultado.matricula}
                  </p>
                  <p style={{ fontSize: '13px', color: '#6b7280', margin: '0 0 12px 0' }}>
                    {ultimoResultado.motiu || ultimoResultado.motivo}
                  </p>
                  {ultimoResultado.acceso && (
                    <div style={{ borderTop: '1px solid #f3f4f6', paddingTop: '10px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '12px', color: '#9ca3af' }}>Tipus</span>
                        <span style={{ fontSize: '12px', color: '#374151', fontWeight: '500' }}>{ultimoResultado.tipoDerecho}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '12px', color: '#9ca3af' }}>Acred.</span>
                        <span style={{ fontSize: '12px', color: '#374151', fontWeight: '500' }}>{ultimoResultado.tipoAcred}</span>
                      </div>
                      {ultimoResultado.fechaFin && (
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ fontSize: '12px', color: '#9ca3af' }}>Fins</span>
                          <span style={{ fontSize: '12px', color: '#374151', fontWeight: '500' }}>
                            {ultimoResultado.fechaFin.split('-').reverse().join('/')}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <p style={{ fontSize: '13px', color: '#9ca3af' }}>Cap accés registrat</p>
              )}
            </div>

            {/* Info sistema */}
            <div style={{
              background: 'white',
              borderRadius: '10px',
              padding: '16px',
              boxShadow: '0 1px 4px rgba(0,0,0,0.08)'
            }} className="dark:bg-gray-900">
              <p style={{ fontSize: '11px', fontWeight: '600', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 10px 0' }}>
                Sistema
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {[
                  ['Zona', '1.A — La Seu'],
                  ['Municipi', 'Xàtiva'],
                  ['Interval', '2s'],
                  ['Data', new Date().toLocaleDateString('ca-ES')]
                ].map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '12px', color: '#9ca3af' }}>{k}</span>
                    <span style={{ fontSize: '12px', color: '#374151', fontWeight: '500' }} className="dark:text-gray-300">{v}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}