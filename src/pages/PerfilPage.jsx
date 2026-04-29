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
      await api.put('/usuarios/cambiar-password', {
        passwordActual: form.passwordActual,
        passwordNueva: form.passwordNueva
      })
      setExito(t.passwordCambiada)
      setTimeout(() => setExito(''), 3000)
      setForm({ passwordActual: '', passwordNueva: '', passwordConfirm: '' })
    } catch (err) {
      setError(err.response?.data?.mensaje || 'Error al cambiar la contrasenya')
    }
  }

  const inputClass = "w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none transition"

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f8f7f5', fontFamily: "'Georgia', 'Times New Roman', serif" }}>
      <Navbar />

      <div className="max-w-2xl mx-auto px-8 py-10">

        {/* Cabecera */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1 h-10 rounded" style={{ backgroundColor: '#C0392B' }} />
          <h2 className="text-2xl font-bold text-gray-800">{t.miPerfil}</h2>
        </div>

        {/* Datos del administrador */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-5">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-1 h-7 rounded" style={{ backgroundColor: '#C0392B' }} />
            <h3 className="font-bold text-gray-800">{t.datosAdmin}</h3>
          </div>
          <div className="space-y-3" style={{ fontFamily: 'sans-serif' }}>
            <div className="flex items-center gap-3 bg-gray-50 rounded-lg px-4 py-3">
              <span className="text-xs text-gray-400 uppercase tracking-widest w-16">Email</span>
              <span className="text-sm font-medium text-gray-700">{usuario?.email}</span>
            </div>
            <div className="flex items-center gap-3 bg-gray-50 rounded-lg px-4 py-3">
              <span className="text-xs text-gray-400 uppercase tracking-widest w-16">{t.rol}</span>
              <span className="text-sm font-medium text-gray-700">{usuario?.rol}</span>
            </div>
          </div>
        </div>

        {/* Cambiar contraseña */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-1 h-7 rounded" style={{ backgroundColor: '#C0392B' }} />
            <h3 className="font-bold text-gray-800">{t.cambiarPassword}</h3>
          </div>
          <form onSubmit={handleCambiarPassword} className="space-y-4" style={{ fontFamily: 'sans-serif' }}>
            {[
              { label: t.passwordActual, name: 'passwordActual' },
              { label: t.passwordNueva, name: 'passwordNueva' },
              { label: t.confirmarPassword, name: 'passwordConfirm' },
            ].map(({ label, name }) => (
              <div key={name}>
                <label className="block text-xs font-medium text-gray-400 uppercase tracking-widest mb-1.5">{label}</label>
                <input
                  name={name} type="password" value={form[name]} onChange={handleChange}
                  className={inputClass}
                  onFocus={e => e.target.style.borderColor = '#C0392B'}
                  onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                  required
                />
              </div>
            ))}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                <p className="text-sm" style={{ color: '#C0392B' }}>{error}</p>
              </div>
            )}
            {exito && (
              <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-3">
                <p className="text-sm text-green-700">{exito}</p>
              </div>
            )}

            <button type="submit"
              className="text-white px-6 py-2.5 rounded-lg text-sm font-medium transition hover:opacity-90"
              style={{ backgroundColor: '#C0392B' }}>
              {t.cambiarPassword}
            </button>
          </form>
        </div>

      </div>
    </div>
  )
}