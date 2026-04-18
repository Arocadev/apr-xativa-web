import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import SolicitudesPage from './pages/SolicitudesPage'
import UsuariosPage from './pages/UsuariosPage'
import RutaProtegida from './components/RutaProtegida'
import VehiculosPage from './pages/VehiculosPage'
import DerechosPage from './pages/DerechosPage'
import PerfilPage from './pages/PerfilPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>Landing page</div>} />
        <Route path="/admin/login" element={<LoginPage />} />
        <Route path="/admin/dashboard" element={
          <RutaProtegida>
            <DashboardPage />
          </RutaProtegida>
        } />
        <Route path="/admin/solicitudes" element={
          <RutaProtegida>
            <SolicitudesPage />
          </RutaProtegida>
        } />
        <Route path="/admin/usuarios" element={
          <RutaProtegida>
            <UsuariosPage />
          </RutaProtegida>
        } />
        <Route path="/admin/vehiculos" element={
          <RutaProtegida>
            <VehiculosPage />
          </RutaProtegida>
        } />
        <Route path="/admin/derechos" element={
          <RutaProtegida>
            <DerechosPage />
          </RutaProtegida>
        } />
        <Route path="/admin/perfil" element={
          <RutaProtegida>
            <PerfilPage />
          </RutaProtegida>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App