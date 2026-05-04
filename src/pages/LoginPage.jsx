import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useIdioma } from '../context/IdiomaContext'
import api from '../services/api'

export default function LoginPage() {
  const [dni, setDni] = useState('')
  const [password, setPassword] = useState('')
  const [mostrarPassword, setMostrarPassword] = useState(false)
  const [errorKey, setErrorKey] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()
  const { idioma, setIdioma, t } = useIdioma()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorKey('')
    setLoading(true)
    try {
      const res = await api.post('/auth/login', { dni, password })
      const rol = res.data.rol
      if (rol === 'ADMIN') {
        login(res.data.token, { email: res.data.email, rol })
        navigate('/admin/dashboard')
      } else {
        setErrorKey('errorRol')
      }
    } catch (err) {
      setErrorKey('errorCredenciales')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>

      {/* Mitad izquierda — roja */}
      <div className="hidden md:flex flex-col justify-center items-center w-1/2 px-16 text-white relative overflow-hidden"
        style={{ backgroundColor: '#C0392B' }}>
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(255,255,255,0.15) 40px, rgba(255,255,255,0.15) 80px)'
        }} />
        <div className="relative z-10 text-center">
          <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center text-2xl font-bold mx-auto mb-8"
            style={{ color: '#C0392B' }}>
            APR
          </div>
          <h1 className="text-5xl font-bold mb-3 tracking-tight">APR Xàtiva</h1>
          <p className="text-white/70 text-lg italic mb-8">Nucli Antic</p>
          <div className="w-16 h-px bg-white/30 mx-auto mb-8" />
          <p className="text-white/60 text-sm max-w-xs leading-relaxed" style={{ fontFamily: 'sans-serif' }}>
            {t.descripcio}
          </p>
        </div>
      </div>

      {/* Mitad derecha — blanca */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 px-8 bg-white relative">

        {/* Selector idioma */}
        <div className="absolute top-6 right-6">
          <div className="flex gap-1 rounded-lg p-1" style={{ backgroundColor: '#A93226' }}>
            {['ca', 'es'].map(l => (
              <button key={l} onClick={() => { setIdioma(l); setErrorKey('') }}
                className={`px-3 py-1 rounded-md text-xs font-medium transition ${idioma === l ? 'bg-white' : 'text-white/70 hover:text-white'}`}
                style={idioma === l ? { color: '#C0392B' } : {}}>
                {l === 'ca' ? 'VAL' : 'ES'}
              </button>
            ))}
          </div>
        </div>

        <div className="w-full max-w-sm">

          {/* Logo mobile */}
          <div className="md:hidden text-center mb-10">
            <div className="w-14 h-14 rounded-xl flex items-center justify-center text-white text-xl font-bold mx-auto mb-4"
              style={{ backgroundColor: '#C0392B' }}>
              APR
            </div>
            <h1 className="text-2xl font-bold" style={{ color: '#C0392B' }}>APR Xàtiva</h1>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-1">{t.benvingut}</h2>
            <p className="text-gray-400 text-sm" style={{ fontFamily: 'sans-serif' }}>{t.subtitulo}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5" style={{ fontFamily: 'sans-serif' }}>
                {t.dni}
              </label>
              <input
                type="text"
                value={dni}
                onChange={(e) => setDni(e.target.value.toUpperCase())}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none transition"
                style={{ fontFamily: 'sans-serif' }}
                onFocus={e => e.target.style.borderColor = '#C0392B'}
                onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5" style={{ fontFamily: 'sans-serif' }}>
                {t.contrasena}
              </label>
              <div className="relative">
                <input
                  type={mostrarPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 pr-11 text-sm focus:outline-none transition"
                  style={{ fontFamily: 'sans-serif' }}
                  onFocus={e => e.target.style.borderColor = '#C0392B'}
                  onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                  required
                />
                <button
                  type="button"
                  onClick={() => setMostrarPassword(!mostrarPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                >
                  {mostrarPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 4.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {errorKey && (
              <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                <p className="text-red-600 text-sm" style={{ fontFamily: 'sans-serif' }}>{t[errorKey]}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full text-white font-semibold py-3 rounded-lg transition disabled:opacity-50 hover:opacity-90 text-sm uppercase tracking-widest mt-2"
              style={{ backgroundColor: '#C0392B', fontFamily: 'sans-serif' }}
            >
              {loading ? t.carregant : t.iniciar}
            </button>
          </form>

          <p className="text-center text-gray-300 text-xs mt-10" style={{ fontFamily: 'sans-serif' }}>
            Ajuntament de Xàtiva © {new Date().getFullYear()}
          </p>
        </div>
      </div>

    </div>
  )
}