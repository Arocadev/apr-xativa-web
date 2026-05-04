import { useState, useEffect } from 'react'
import { useIdioma } from '../context/IdiomaContext'
import api from '../services/api'
import Navbar from '../components/Navbar'

const EyeIcon = ({ visible }) => visible ? (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 4.411m0 0L21 21" />
  </svg>
) : (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
)

export default function UsuariosPage() {
  const { t } = useIdioma()
  const [usuarios, setUsuarios] = useState([])
  const [loading, setLoading] = useState(true)
  const [confirmandoId, setConfirmandoId] = useState(null)
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [mostrarPasswordForm, setMostrarPasswordForm] = useState(false)
  const [error, setError] = useState('')
  const [exito, setExito] = useState('')
  const [busqueda, setBusqueda] = useState('')
  const [form, setForm] = useState({
    dni: '', nombre: '', apellidos: '', email: '',
    password: '', tipo: 'A.1', numCamas: 0, numPlazas: 0, numTrabajadores: 0
  })

  useEffect(() => { cargarUsuarios() }, [])

  const cargarUsuarios = async () => {
    try {
      const res = await api.get('/usuarios')
      setUsuarios(res.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const usuariosFiltrados = usuarios.filter(u =>
    u.dni.toLowerCase().includes(busqueda.toLowerCase()) ||
    u.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    u.apellidos.toLowerCase().includes(busqueda.toLowerCase())
  )

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleCrear = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await api.post('/usuarios/admin/registro', form)
      setMostrarFormulario(false)
      setExito(t.usuarioCreado)
      setTimeout(() => setExito(''), 3000)
      setForm({ dni: '', nombre: '', apellidos: '', email: '', password: '', tipo: 'A.1', numCamas: 0, numPlazas: 0, numTrabajadores: 0 })
      cargarUsuarios()
    } catch (err) {
      setError(err.response?.data?.mensaje || t.errorCrear)
    }
  }

  const handleDesactivar = async (id) => {
    try {
      await api.delete(`/usuarios/${id}`)
      setConfirmandoId(null)
      cargarUsuarios()
    } catch (err) { console.error(err) }
  }

  const handleReactivar = async (id) => {
    try {
      await api.put(`/usuarios/${id}/reactivar`)
      cargarUsuarios()
    } catch (err) { console.error(err) }
  }

  const inputClass = "w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none transition"

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f8f7f5', fontFamily: "'Georgia', 'Times New Roman', serif" }}>
      <Navbar />

      <div className="max-w-6xl mx-auto px-8 py-10">

        {/* Cabecera */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="w-1 h-10 rounded" style={{ backgroundColor: '#C0392B' }} />
            <h2 className="text-2xl font-bold text-gray-800">{t.usuarios}</h2>
          </div>
          <button
            onClick={() => setMostrarFormulario(!mostrarFormulario)}
            className="text-white text-sm px-5 py-2.5 rounded-lg transition hover:opacity-90 font-medium"
            style={{ backgroundColor: '#C0392B', fontFamily: 'sans-serif' }}>
            {mostrarFormulario ? t.cancelar : t.nuevoUsuario}
          </button>
        </div>

        {/* Éxito */}
        {exito && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl mb-5 text-sm"
            style={{ fontFamily: 'sans-serif' }}>
            {exito}
          </div>
        )}

        {/* Formulario nuevo usuario */}
        {mostrarFormulario && (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-1 h-8 rounded" style={{ backgroundColor: '#C0392B' }} />
              <h3 className="text-lg font-bold text-gray-800">{t.crearUsuario}</h3>
            </div>
            <form onSubmit={handleCrear} className="grid grid-cols-1 md:grid-cols-2 gap-4" style={{ fontFamily: 'sans-serif' }}>
              {[
                { label: t.dni, name: 'dni', type: 'text' },
                { label: t.nombre, name: 'nombre', type: 'text' },
                { label: t.apellidos, name: 'apellidos', type: 'text' },
                { label: t.email, name: 'email', type: 'email' },
              ].map(({ label, name, type }) => (
                <div key={name}>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-widest mb-1.5">{label}</label>
                  <input
                    name={name} type={type} value={form[name]} onChange={handleChange}
                    className={inputClass}
                    onFocus={e => e.target.style.borderColor = '#C0392B'}
                    onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                    required
                  />
                </div>
              ))}

              {/* Campo contraseña con ojo */}
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-widest mb-1.5">{t.contrasena}</label>
                <div className="relative">
                  <input
                    name="password"
                    type={mostrarPasswordForm ? 'text' : 'password'}
                    value={form.password}
                    onChange={handleChange}
                    className={inputClass + ' pr-11'}
                    onFocus={e => e.target.style.borderColor = '#C0392B'}
                    onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setMostrarPasswordForm(!mostrarPasswordForm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                  >
                    <EyeIcon visible={mostrarPasswordForm} />
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-widest mb-1.5">{t.tipo}</label>
                <select name="tipo" value={form.tipo} onChange={handleChange}
                  className={inputClass}
                  onFocus={e => e.target.style.borderColor = '#C0392B'}
                  onBlur={e => e.target.style.borderColor = '#e5e7eb'}>
                  {['A.1','A.2','A.3','B','C','D','E','F','G','H.1','H.2'].map(o => <option key={o}>{o}</option>)}
                </select>
              </div>

              {error && <p className="text-sm col-span-2" style={{ color: '#C0392B' }}>{error}</p>}
              <div className="col-span-2 flex gap-3 pt-2 border-t border-gray-100">
                <button type="submit"
                  className="text-white px-6 py-2.5 rounded-lg text-sm transition hover:opacity-90 font-medium"
                  style={{ backgroundColor: '#C0392B' }}>
                  {t.crearUsuario}
                </button>
                <button type="button" onClick={() => setMostrarFormulario(false)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-6 py-2.5 rounded-lg text-sm transition font-medium">
                  {t.cancelar}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Buscador */}
        <div className="mb-5">
          <div className="relative w-full md:w-96">
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
        </div>

        {/* Tabla */}
        {loading ? (
          <p className="text-gray-400 text-sm" style={{ fontFamily: 'sans-serif' }}>{t.cargando}</p>
        ) : (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full text-sm" style={{ fontFamily: 'sans-serif' }}>
              <thead>
                <tr style={{ backgroundColor: '#C0392B' }}>
                  {[t.dni, t.nombre, t.email, t.tipo, t.rol, t.estado, ''].map((h, i) => (
                    <th key={i} className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-widest">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {usuariosFiltrados.map((u, i) => (
                  <tr key={u.id} className="hover:bg-gray-50 transition" style={{ backgroundColor: i % 2 === 0 ? 'white' : '#fafafa' }}>
                    <td className="px-6 py-4 font-mono text-gray-700 text-xs">{u.dni}</td>
                    <td className="px-6 py-4 font-medium text-gray-800">{u.nombre} {u.apellidos}</td>
                    <td className="px-6 py-4 text-gray-500">{u.email}</td>
                    <td className="px-6 py-4 text-gray-500">{u.tipo}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${
                        u.rol === 'ADMIN'
                          ? 'bg-purple-50 text-purple-700 border-purple-200'
                          : 'bg-blue-50 text-blue-700 border-blue-200'
                      }`}>
                        {u.rol}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${
                        u.activo
                          ? 'bg-green-50 text-green-700 border-green-200'
                          : 'bg-red-50 border-red-200'
                      }`} style={!u.activo ? { color: '#C0392B' } : {}}>
                        {u.activo ? t.activo : t.inactivo}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {u.rol !== 'ADMIN' && (
                        u.activo ? (
                          confirmandoId === u.id ? (
                            <div className="flex gap-2">
                              <button onClick={() => handleDesactivar(u.id)}
                                className="text-white text-xs px-3 py-1 rounded-lg transition hover:opacity-90"
                                style={{ backgroundColor: '#C0392B' }}>
                                {t.confirmar}
                              </button>
                              <button onClick={() => setConfirmandoId(null)}
                                className="bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-lg transition">
                                {t.cancelar}
                              </button>
                            </div>
                          ) : (
                            <button onClick={() => setConfirmandoId(u.id)}
                              className="text-xs font-semibold transition hover:opacity-70"
                              style={{ color: '#C0392B' }}>
                              {t.desactivar}
                            </button>
                          )
                        ) : (
                          <button onClick={() => handleReactivar(u.id)}
                            className="text-green-600 hover:text-green-800 text-xs font-semibold transition">
                            {t.reactivar}
                          </button>
                        )
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}