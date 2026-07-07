import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token') || null)
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refreshToken') || null)
  const [usuario, setUsuario] = useState(
    JSON.parse(localStorage.getItem('usuario') || 'null')
  )

  const login = (tokenData, refreshTokenData, usuarioData) => {
    setToken(tokenData)
    setRefreshToken(refreshTokenData)
    setUsuario(usuarioData)
    localStorage.setItem('token', tokenData)
    localStorage.setItem('refreshToken', refreshTokenData)
    localStorage.setItem('usuario', JSON.stringify(usuarioData))
  }

  const logout = () => {
    setToken(null)
    setRefreshToken(null)
    setUsuario(null)
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('usuario')
  }

  const isAdmin = () => usuario?.rol === 'ADMIN'

  return (
    <AuthContext.Provider value={{ token, refreshToken, usuario, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}