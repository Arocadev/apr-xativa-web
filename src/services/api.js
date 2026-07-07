import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  if (!config.url.includes('/auth/login') && !config.url.includes('/auth/refresh')) {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
  }
  return config
})

let refrescando = false
let colaEspera = []

const procesarCola = (error, token = null) => {
  colaEspera.forEach(({ resolve, reject }) => {
    if (error) reject(error)
    else resolve(token)
  })
  colaEspera = []
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry &&
        !originalRequest.url.includes('/auth/login') &&
        !originalRequest.url.includes('/auth/refresh')) {

      if (refrescando) {
        return new Promise((resolve, reject) => {
          colaEspera.push({ resolve, reject })
        }).then(token => {
          originalRequest.headers.Authorization = `Bearer ${token}`
          return api(originalRequest)
        }).catch(err => Promise.reject(err))
      }

      originalRequest._retry = true
      refrescando = true

      const refreshToken = localStorage.getItem('refreshToken')

      if (!refreshToken) {
        refrescando = false
        localStorage.removeItem('token')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('usuario')
        window.location.href = '/admin/login'
        return Promise.reject(error)
      }

      try {
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL || 'http://localhost:8080/api'}/auth/refresh`,
          { refreshToken }
        )
        const nuevoToken = res.data.token
        const nuevoRefresh = res.data.refreshToken

        localStorage.setItem('token', nuevoToken)
        localStorage.setItem('refreshToken', nuevoRefresh)

        procesarCola(null, nuevoToken)
        refrescando = false

        originalRequest.headers.Authorization = `Bearer ${nuevoToken}`
        return api(originalRequest)

      } catch (refreshError) {
        procesarCola(refreshError, null)
        refrescando = false
        localStorage.removeItem('token')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('usuario')
        window.location.href = '/admin/login'
        return Promise.reject(refreshError)
      }
    }

    if (error.response?.status === 403) {
      console.warn('Accés denegat')
      window.location.href = '/admin/dashboard'
      return Promise.reject(error)
    }

    if (error.response?.status >= 500) {
      console.error('Error del servidor:', error.response?.data)
      return Promise.reject(error)
    }

    if (!error.response) {
      console.error('Error de xarxa — el servidor no respon')
      return Promise.reject(error)
    }

    return Promise.reject(error)
  }
)

export default api