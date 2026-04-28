import { useState, useEffect, useRef } from 'react'
import api from '../services/api'
import Navbar from '../components/Navbar'

export default function SimuladorPage() {
  const [activo, setActivo] = useState(false)
  const [logs, setLogs] = useState([])
  const [stats, setStats] = useState({ total: 0, permitidos: 0, denegados: 0 })
  const intervalRef = useRef(null)
  const logsEndRef = useRef(null)

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
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [logs])

  useEffect(() => {
    return () => clearInterval(intervalRef.current)
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800">
      <Navbar />
      <div className="p-8 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-white mb-6">
          📷 Simulador de càmeres APR
        </h2>

        {/* Estadísticas */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow p-4 text-center">
            <p className="text-3xl font-bold text-gray-800 dark:text-white">{stats.total}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Accessos avui</p>
          </div>
          <div className="bg-green-50 dark:bg-green-900 rounded-2xl shadow p-4 text-center">
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">{stats.permitidos}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Permesos</p>
          </div>
          <div className="bg-red-50 dark:bg-red-900 rounded-2xl shadow p-4 text-center">
            <p className="text-3xl font-bold text-red-600 dark:text-red-400">{stats.denegados}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Denegats</p>
          </div>
        </div>

        {/* Terminal */}
        <div className="bg-gray-950 rounded-2xl shadow-xl overflow-hidden mb-6">
          <div className="flex items-center gap-2 px-4 py-3 bg-gray-900 border-b border-gray-800">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="ml-2 text-gray-400 text-xs font-mono">camara-apr — control_acces</span>
            <div className="ml-auto flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${activo ? 'bg-green-400 animate-pulse' : 'bg-gray-600'}`} />
              <span className="text-xs text-gray-400 font-mono">{activo ? 'EN LÍNIA' : 'ATURAT'}</span>
            </div>
          </div>

          <div className="p-4 font-mono text-sm overflow-y-auto" style={{ height: '400px' }}>
            {logs.length === 0 && (
              <p className="text-gray-600">Premeu "Iniciar simulació" per començar...</p>
            )}
            {logs.map((log) => (
              log.tipo === 'spacer' ? (
                <div key={log.id} className="h-2" />
              ) : (
                <p key={log.id} className={
                  log.tipo === 'ok' ? 'text-green-400' :
                  log.tipo === 'error' ? 'text-red-400' :
                  log.tipo === 'warn' ? 'text-yellow-400' :
                  log.tipo === 'divider' ? 'text-gray-600' :
                  log.tipo === 'title' ? 'text-cyan-400 font-bold' :
                  'text-gray-400'
                }>
                  {log.linea}
                </p>
              )
            ))}
            <div ref={logsEndRef} />
          </div>
        </div>

        {/* Botones */}
        <div className="flex gap-4">
          <button
            onClick={iniciar}
            disabled={activo}
            className="flex-1 bg-green-500 hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition"
          >
            ▶ Iniciar simulació
          </button>
          <button
            onClick={parar}
            disabled={!activo}
            className="flex-1 bg-red-500 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition"
          >
            ⏹ Aturar
          </button>
        </div>
      </div>
    </div>
  )
}