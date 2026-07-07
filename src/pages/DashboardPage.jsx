import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useIdioma } from '../context/IdiomaContext'
import api from '../services/api'
import useAutoLogout from '../utils/useAutoLogout'
import Navbar from '../components/Navbar'

const SkeletonStat = () => (
  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex flex-col items-center text-center animate-pulse">
    <div className="h-3 bg-gray-200 rounded w-24 mb-3" />
    <div className="h-8 bg-gray-200 rounded w-12" />
  </div>
)

const SkeletonCard = () => (
  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 flex flex-col items-center animate-pulse">
    <div className="w-12 h-12 rounded-xl bg-gray-200 mb-4" />
    <div className="h-4 bg-gray-200 rounded w-24 mb-2" />
    <div className="h-3 bg-gray-200 rounded w-32 mb-4" />
    <div className="h-3 bg-gray-200 rounded w-16 mt-auto" />
  </div>
)

export default function DashboardPage() {
  const { t } = useIdioma()
  const navigate = useNavigate()
  useAutoLogout(30)
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [errorGlobal, setErrorGlobal] = useState('')

  useEffect(() => {
    const cargarStats = async () => {
      setLoading(true)
      setErrorGlobal('')
      try {
        const [solicitudes, usuarios, vehiculos] = await Promise.all([
          api.get('/solicitudes/pendientes'),
          api.get('/usuarios'),
          api.get('/vehiculos/todos'),
        ])
        setStats({
          solicitudesPendientes: solicitudes.data.length,
          totalUsuarios: usuarios.data.length,
          totalVehiculos: vehiculos.data.length,
        })
      } catch (err) {
        setErrorGlobal(err.response?.data?.mensaje || 'Error al carregar les estadístiques')
      } finally {
        setLoading(false)
      }
    }
    cargarStats()
  }, [])

  const secciones = [
    {
      key: 'solicitudes',
      ruta: '/admin/solicitudes',
      titulo: t.solicitudes,
      descripcion: t.gestionarSolicitudes,
      badge: stats?.solicitudesPendientes > 0 ? stats.solicitudesPendientes : null,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      color: '#C0392B',
      bgHover: '#fff5f5',
    },
    {
      key: 'usuarios',
      ruta: '/admin/usuarios',
      titulo: t.usuarios,
      descripcion: t.gestionarUsuarios,
      badge: null,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      color: '#2563eb',
      bgHover: '#eff6ff',
    },
    {
      key: 'vehiculos',
      ruta: '/admin/vehiculos',
      titulo: t.vehiculos,
      descripcion: t.consultarVehiculos,
      badge: null,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
        </svg>
      ),
      color: '#16a34a',
      bgHover: '#f0fdf4',
    },
    {
      key: 'derechos',
      ruta: '/admin/derechos',
      titulo: t.derechos,
      descripcion: t.consultarDerechos,
      badge: null,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      color: '#7c3aed',
      bgHover: '#faf5ff',
    },
    {
      key: 'simulador',
      ruta: '/admin/simulador',
      titulo: 'Simulador',
      descripcion: t.simuladorDesc ?? 'Simula el reconeixement de matrícules per càmera',
      badge: null,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.361a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
        </svg>
      ),
      color: '#0891b2',
      bgHover: '#ecfeff',
    },
  ]

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f8f7f5', fontFamily: "'Georgia', 'Times New Roman', serif" }}>
      <Navbar />

      <div className="max-w-5xl mx-auto px-8 py-10">

        <div className="flex items-center gap-3 mb-10">
          <div className="w-1 h-10 rounded" style={{ backgroundColor: '#C0392B' }} />
          <h2 className="text-2xl font-bold text-gray-800">{t.resumenGeneral}</h2>
        </div>

        {errorGlobal && (
          <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-6 text-sm flex items-center gap-2"
            style={{ fontFamily: 'sans-serif', color: '#C0392B' }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {errorGlobal}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          {loading ? (
            [...Array(3)].map((_, i) => <SkeletonStat key={i} />)
          ) : (
            <>
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex flex-col items-center text-center">
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-2" style={{ fontFamily: 'sans-serif' }}>
                  {t.solicitudesPendientes}
                </p>
                <p className="text-3xl font-semibold" style={{ color: '#C0392B', fontFamily: 'sans-serif' }}>
                  {stats?.solicitudesPendientes ?? 0}
                </p>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex flex-col items-center text-center">
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-2" style={{ fontFamily: 'sans-serif' }}>
                  {t.totalUsuarios}
                </p>
                <p className="text-3xl font-semibold text-blue-600" style={{ fontFamily: 'sans-serif' }}>
                  {stats?.totalUsuarios ?? 0}
                </p>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex flex-col items-center text-center">
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-2" style={{ fontFamily: 'sans-serif' }}>
                  {t.vehiculosAutorizados}
                </p>
                <p className="text-3xl font-semibold text-green-600" style={{ fontFamily: 'sans-serif' }}>
                  {stats?.totalVehiculos ?? 0}
                </p>
              </div>
            </>
          )}
        </div>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-10 rounded" style={{ backgroundColor: '#C0392B' }} />
          <h2 className="text-2xl font-bold text-gray-800">{t.accesRapido}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {loading ? (
            [...Array(5)].map((_, i) => <SkeletonCard key={i} />)
          ) : (
            secciones.map((s) => (
              <button
                key={s.key}
                onClick={() => navigate(s.ruta)}
                className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 text-center transition group relative flex flex-col items-center"
                style={{ fontFamily: 'sans-serif' }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = s.bgHover}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'white'}
              >
                {s.badge && (
                  <span className="absolute top-4 right-4 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                    style={{ backgroundColor: '#C0392B' }}>
                    {s.badge}
                  </span>
                )}
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-white"
                  style={{ backgroundColor: s.color }}>
                  {s.icon}
                </div>
                <h3 className="font-bold text-gray-800 mb-1">{s.titulo}</h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-4">{s.descripcion}</p>
                <div className="mt-auto text-xs font-semibold uppercase tracking-widest"
                  style={{ color: s.color }}>
                  {t.acceder}
                </div>
              </button>
            ))
          )}
        </div>

      </div>
    </div>
  )
}