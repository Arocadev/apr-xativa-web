//import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useIdioma } from '../context/IdiomaContext'
//import api from '../services/api'
import Navbar from '../components/Navbar'

export default function PerfilPage() {
  const { usuario } = useAuth()
  const { t } = useIdioma()
    /*
  const [form, setForm] = useState({
    passwordActual: '',
    passwordNueva: '',
    passwordConfirm: ''
  })

  const [error, setError] = useState('')
  const [exito, setExito] = useState('')

  const [mostrarPasswords, setMostrarPasswords] = useState({
    passwordActual: false,
    passwordNueva: false,
    passwordConfirm: false
  })

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
      setForm({
        passwordActual: '',
        passwordNueva: '',
        passwordConfirm: ''
      })
    } catch (err) {
      setError(err.response?.data?.mensaje || 'Error al cambiar la contrasenya')
    }
  }

  const inputClass =
    'w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none transition'


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
    */

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
            <div className="flex flex-col items-center justify-center p-8 text-center">
                <div className="text-4xl mb-4">🔒</div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    Cambio de contraseña desactivado
                </h3>
                <p className="text-sm text-gray-500">
                    Per motivos de seguridad, el cambio de contraseña
                    no está disponible en este entorno demo
                </p>
            </div>
            {/*
          <form onSubmit={handleCambiarPassword} className="space-y-4" style={{ fontFamily: 'sans-serif' }}>
            {[
              { label: t.passwordActual, name: 'passwordActual' },
              { label: t.passwordNueva, name: 'passwordNueva' },
              { label: t.confirmarPassword, name: 'passwordConfirm' },
            ].map(({ label, name }) => (
              <div key={name}>
                <label className="block text-xs font-medium text-gray-400 uppercase tracking-widest mb-1.5">{label}</label>
                <div className="relative">
                  <input
                    name={name}
                    type={mostrarPasswords[name] ? 'text' : 'password'}
                    value={form[name]}
                    onChange={handleChange}
                    className={inputClass + ' pr-11'}
                    onFocus={e => e.target.style.borderColor = '#C0392B'}
                    onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setMostrarPasswords(prev => ({ ...prev, [name]: !prev[name] }))}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                  >
                    <EyeIcon visible={mostrarPasswords[name]} />
                  </button>
                </div>
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
          */}
        </div>

      </div>
    </div>
  )
}