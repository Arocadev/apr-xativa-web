import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token') || null)
  const [usuario, setUsuario] = useState(
    JSON.parse(localStorage.getItem('usuario') || 'null')
  )

  const login = (tokenData, usuarioData) => {
    setToken(tokenData)
    setUsuario(usuarioData)
    localStorage.setItem('token', tokenData)
    localStorage.setItem('usuario', JSON.stringify(usuarioData))
  }

  const logout = () => {
    setToken(null)
    setUsuario(null)
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')
  }

  const isAdmin = () => usuario?.rol === 'ADMIN'

  return (
    <AuthContext.Provider value={{ token, usuario, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}