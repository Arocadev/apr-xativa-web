import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  if (!config.url.includes('/auth/login')) {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('usuario')
      if (!window.location.pathname.includes('/admin/login')) {
        window.location.href = '/admin/login'
      }
      return Promise.reject(error)
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