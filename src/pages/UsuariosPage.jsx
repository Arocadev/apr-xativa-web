import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState([])
  const [loading, setLoading] = useState(true)
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    dni: '', nombre: '', apellidos: '', email: '',
    password: '', tipo: 'A.1', numCamas: 0, numPlazas: 0, numTrabajadores: 0
  })
  const navigate = useNavigate()

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
      setForm({
        dni: '', nombre: '', apellidos: '', email: '',
        password: '', tipo: 'A.1', numCamas: 0, numPlazas: 0, numTrabajadores: 0
      })
      cargarUsuarios()
    } catch (err) {
      setError(err.response?.data?.mensaje || 'Error al crear el usuario')
    }
  }

  const handleDesactivar = async (id) => {
    try {
      await api.delete(`/api/usuarios/${id}`)
      cargarUsuarios()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">APR Xàtiva — Panel Admin</h1>
        <button onClick={() => navigate('/admin/dashboard')} className="text-blue-600 hover:underline text-sm">
          ← Volver al dashboard
        </button>
      </nav>

      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-700">Usuarios</h2>
          <button
            onClick={() => setMostrarFormulario(!mostrarFormulario)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition"
          >
            {mostrarFormulario ? 'Cancelar' : '+ Nuevo usuario'}
          </button>
        </div>

        {mostrarFormulario && (
          <div className="bg-white rounded-2xl shadow p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Crear usuario</h3>
            <form onSubmit={handleCrear} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">DNI</label>
                <input name="dni" value={form.dni} onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="12345678A" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                <input name="nombre" value={form.nombre} onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Apellidos</label>
                <input name="apellidos" value={form.apellidos} onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input name="email" type="email" value={form.email} onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
                <input name="password" type="password" value={form.password} onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
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
                  Crear usuario
                </button>
              </div>
            </form>
          </div>
        )}

        {loading ? (
          <p className="text-gray-500">Cargando...</p>
        ) : (
          <div className="bg-white rounded-2xl shadow overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="px-6 py-3 text-left">DNI</th>
                  <th className="px-6 py-3 text-left">Nombre</th>
                  <th className="px-6 py-3 text-left">Email</th>
                  <th className="px-6 py-3 text-left">Tipo</th>
                  <th className="px-6 py-3 text-left">Rol</th>
                  <th className="px-6 py-3 text-left">Estado</th>
                  <th className="px-6 py-3 text-left">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {usuarios.map((u) => (
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
                        {u.activo ? 'Activo' : 'Inactivo'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {u.activo && u.rol !== 'ADMIN' && (
                        <button
                          onClick={() => handleDesactivar(u.id)}
                          className="text-red-500 hover:text-red-700 text-xs font-medium"
                        >
                          Desactivar
                        </button>
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