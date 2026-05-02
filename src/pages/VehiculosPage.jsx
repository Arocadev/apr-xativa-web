import { useState, useEffect } from 'react'
import { useIdioma } from '../context/IdiomaContext'
import api from '../services/api'
import Navbar from '../components/Navbar'

export default function VehiculosPage() {
  const { t } = useIdioma()
  const [usuarios, setUsuarios] = useState([])
  const [vehiculos, setVehiculos] = useState([])
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState('')
  const [loading, setLoading] = useState(false)
  const [busqueda, setBusqueda] = useState('')

  useEffect(() => {
    api.get('/usuarios').then(res => setUsuarios(res.data))
  }, [])

  const usuariosFiltrados = usuarios.filter(u =>
    u.dni.toLowerCase().includes(busqueda.toLowerCase()) ||
    u.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    u.apellidos.toLowerCase().includes(busqueda.toLowerCase())
  )

  const buscarVehiculos = async (usuarioId) => {
    setUsuarioSeleccionado(usuarioId)
    if (!usuarioId) { setVehiculos([]); return }
    setLoading(true)
    try {
      const res = await api.get(`/vehiculos?usuarioId=${usuarioId}`)
      setVehiculos(res.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f8f7f5', fontFamily: "'Georgia', 'Times New Roman', serif" }}>
      <Navbar />

      <div className="max-w-5xl mx-auto px-8 py-10">

        <div className="flex items-center gap-3 mb-8">
          <div className="w-1 h-10 rounded" style={{ backgroundColor: '#C0392B' }} />
          <h2 className="text-2xl font-bold text-gray-800">{t.vehiculos}</h2>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
          <label className="block text-xs font-medium text-gray-400 uppercase tracking-widest mb-2"
            style={{ fontFamily: 'sans-serif' }}>
            {t.seleccionaUsuario}
          </label>

          <div className="relative w-full md:w-96 mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 absolute left-3 top-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder={t.buscar}
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full border border-gray-200 rounded-lg pl-9 pr-4 py-2.5 text-sm focus:outline-none transition bg-white"
              style={{ fontFamily: 'sans-serif' }}
              onFocus={e => e.target.style.borderColor = '#C0392B'}
              onBlur={e => e.target.style.borderColor = '#e5e7eb'}
            />
          </div>

          <select
            value={usuarioSeleccionado}
            onChange={(e) => buscarVehiculos(e.target.value)}
            className="w-full md:w-96 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none transition"
            style={{ fontFamily: 'sans-serif' }}
            onFocus={e => e.target.style.borderColor = '#C0392B'}
            onBlur={e => e.target.style.borderColor = '#e5e7eb'}
          >
            <option value="">{t.seleccionaUsuario}</option>
            {usuariosFiltrados.map(u => (
              <option key={u.id} value={u.id}>{u.dni} — {u.nombre} {u.apellidos}</option>
            ))}
          </select>
        </div>

        {loading ? (
          <p className="text-gray-400 text-sm" style={{ fontFamily: 'sans-serif' }}>{t.cargando}</p>
        ) : vehiculos.length > 0 ? (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full text-sm" style={{ fontFamily: 'sans-serif' }}>
              <thead>
                <tr style={{ backgroundColor: '#C0392B' }}>
                  {[t.matricula, t.tipoAcred, t.estado, t.fechaAlta].map((h, i) => (
                    <th key={i} className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-widest">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {vehiculos.map((v, i) => (
                  <tr key={v.id} className="hover:bg-gray-50 transition"
                    style={{ backgroundColor: i % 2 === 0 ? 'white' : '#fafafa' }}>
                    <td className="px-6 py-4 font-mono font-bold text-gray-700">{v.matricula}</td>
                    <td className="px-6 py-4 text-gray-500">{v.tipoAcred}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${
                        v.activo
                          ? 'bg-green-50 text-green-700 border-green-200'
                          : 'bg-red-50 border-red-200'
                      }`} style={!v.activo ? { color: '#C0392B' } : {}}>
                        {v.activo ? t.activo : t.inactivo}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500">{new Date(v.createdAt).toLocaleDateString('es-ES')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : usuarioSeleccionado ? (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-12 text-center">
            <p className="text-gray-400 text-sm" style={{ fontFamily: 'sans-serif' }}>{t.sinVehiculos}</p>
          </div>
        ) : null}

      </div>
    </div>
  )
}