import { createContext, useContext, useState, useEffect } from 'react'

const TemaContext = createContext(null)

export function TemaProvider({ children }) {
  const [oscuro, setOscuro] = useState(false)

  useEffect(() => {
    if (oscuro) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [oscuro])

  return (
    <TemaContext.Provider value={{ oscuro, setOscuro }}>
      {children}
    </TemaContext.Provider>
  )
}

export function useTema() {
  return useContext(TemaContext)
}