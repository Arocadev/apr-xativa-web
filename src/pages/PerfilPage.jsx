import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useIdioma } from '../context/IdiomaContext'
import api from '../services/api'
import Navbar from '../components/Navbar'

export default function PerfilPage() {
  const { usuario } = useAuth()
  const { t } = useIdioma()
  const [form, setForm] = useState({ passwordActual: '', passwordNueva: '', passwordConfirm: '' })
  const [error, setError] = useState('')
  const [exito, setExito] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleCambiarPassword = async (e) => {
    e.preventDefault()
    setError('')
    if (form.passwordNueva !== form.passwordConfirm) {
      setError(t.passwordNoCoinciden)
      return
    }
    try {
      await api.put('/api/usuarios/cambiar-password', {
        passwordActual: form.passwordActual,
        passwordNueva: form.passwordNueva
      })
      setExito(t.passwordCambiada)
      setTimeout(() => setExito(''), 3000)
      setForm({ passwordActual: '', passwordNueva: '', passwordConfirm: '' })
    } catch (err) {
      setError(err.response?.data?.mensaje || 'Error al cambiar la contraseña')
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800">
      <Navbar />

      <div className="p-8 max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">{t.miPerfil}</h2>

        <div className="bg-white rounded-2xl shadow p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">{t.datosAdmin}</h3>
          <div className="space-y-3 text-sm text-gray-600">
            <p><span className="font-medium text-gray-800">Email:</span> {usuario?.email}</p>
            <p><span className="font-medium text-gray-800">{t.rol}:</span> {usuario?.rol}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">{t.cambiarPassword}</h3>
          <form onSubmit={handleCambiarPassword} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.passwordActual}</label>
              <input name="passwordActual" type="password" value={form.passwordActual} onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.passwordNueva}</label>
              <input name="passwordNueva" type="password" value={form.passwordNueva} onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.confirmarPassword}</label>
              <input name="passwordConfirm" type="password" value={form.passwordConfirm} onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {exito && <p className="text-green-500 text-sm">{exito}</p>}
            <button type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm transition">
              {t.cambiarPassword}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}