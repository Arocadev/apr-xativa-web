import { useState, useEffect } from 'react'
import { useIdioma } from '../context/IdiomaContext'
import api from '../services/api'
import Navbar from '../components/Navbar'

export default function UsuariosPage() {
  const { t } = useIdioma()
  const [usuarios, setUsuarios] = useState([])
  const [loading, setLoading] = useState(true)
  const [confirmandoId, setConfirmandoId] = useState(null)
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [error, setError] = useState('')
  const [exito, setExito] = useState('')
  const [busqueda, setBusqueda] = useState('')
  const [form, setForm] = useState({
    dni: '', nombre: '', apellidos: '', email: '',
    password: '', tipo: 'A.1', numCamas: 0, numPlazas: 0, numTrabajadores: 0
  })

  useEffect(() => {
    cargarUsuarios()
  }, [])

  const cargarUsuarios = async () => {
    try {
      const res = await api.get('/api/usuarios')
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
      await api.post('/api/usuarios/registro', form)
      setMostrarFormulario(false)
      setExito(t.usuarioCreado)
      setTimeout(() => setExito(''), 3000)
      setForm({
        dni: '', nombre: '', apellidos: '', email: '',
        password: '', tipo: 'A.1', numCamas: 0, numPlazas: 0, numTrabajadores: 0
      })
      cargarUsuarios()
    } catch (err) {
      setError(err.response?.data?.mensaje || t.errorCrear)
    }
  }

  const handleDesactivar = async (id) => {
    try {
      await api.delete(`/api/usuarios/${id}`)
      setConfirmandoId(null)
      cargarUsuarios()
    } catch (err) {
      console.error(err)
    }
  }

  const handleReactivar = async (id) => {
    try {
      await api.put(`/api/usuarios/${id}/reactivar`)
      cargarUsuarios()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800">
      <Navbar />

      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-700">{t.usuarios}</h2>
          <button
            onClick={() => setMostrarFormulario(!mostrarFormulario)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition"
          >
            {mostrarFormulario ? t.cancelar : t.nuevoUsuario}
          </button>
        </div>

        {exito && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-4">
            {exito}
          </div>
        )}

        {mostrarFormulario && (
          <div className="bg-white rounded-2xl shadow p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">{t.crearUsuario}</h3>
            <form onSubmit={handleCrear} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.dni}</label>
                <input name="dni" value={form.dni} onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="12345678A" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.nombre}</label>
                <input name="nombre" value={form.nombre} onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.apellidos}</label>
                <input name="apellidos" value={form.apellidos} onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.email}</label>
                <input name="email" type="email" value={form.email} onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.contrasena}</label>
                <input name="password" type="password" value={form.password} onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.tipo}</label>
                <select name="tipo" value={form.tipo} onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>A.1</option><option>A.2</option><option>A.3</option>
                  <option>B</option><option>C</option><option>D</option>
                  <option>E</option><option>F</option><option>G</option>
                  <option>H.1</option><option>H.2</option>
                </select>
              </div>
              {error && <p className="text-red-500 text-sm col-span-2">{error}</p>}
              <div className="col-span-2">
                <button type="submit"
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg text-sm transition">
                  {t.crearUsuario}
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="mb-4">
          <input
            type="text"
            placeholder={t.buscar}
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full md:w-96 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {loading ? (
          <p className="text-gray-500">{t.cargando}</p>
        ) : (
          <div className="bg-white rounded-2xl shadow overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="px-6 py-3 text-left">{t.dni}</th>
                  <th className="px-6 py-3 text-left">{t.nombre}</th>
                  <th className="px-6 py-3 text-left">{t.email}</th>
                  <th className="px-6 py-3 text-left">{t.tipo}</th>
                  <th className="px-6 py-3 text-left">{t.rol}</th>
                  <th className="px-6 py-3 text-left">{t.estado}</th>
                  <th className="px-6 py-3 text-left">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {usuariosFiltrados.map((u) => (
                  <tr key={u.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-mono">{u.dni}</td>
                    <td className="px-6 py-4">{u.nombre} {u.apellidos}</td>
                    <td className="px-6 py-4">{u.email}</td>
                    <td className="px-6 py-4">{u.tipo}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${u.rol === 'ADMIN' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                        {u.rol}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${u.activo ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {u.activo ? t.activo : t.inactivo}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {u.rol !== 'ADMIN' && (
                        u.activo ? (
                          confirmandoId === u.id ? (
                            <div className="flex gap-2">
                              <button onClick={() => handleDesactivar(u.id)}
                                className="text-white bg-red-500 hover:bg-red-600 text-xs px-2 py-1 rounded">
                                {t.confirmar}
                              </button>
                              <button onClick={() => setConfirmandoId(null)}
                                className="text-gray-600 bg-gray-200 hover:bg-gray-300 text-xs px-2 py-1 rounded">
                                {t.cancelar}
                              </button>
                            </div>
                          ) : (
                            <button onClick={() => setConfirmandoId(u.id)}
                              className="text-red-500 hover:text-red-700 text-xs font-medium">
                              {t.desactivar}
                            </button>
                          )
                        ) : (
                          <button onClick={() => handleReactivar(u.id)}
                            className="text-green-500 hover:text-green-700 text-xs font-medium">
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