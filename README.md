<div align="center">

# APR Xàtiva — Web

**Landing page pública + panel de administración municipal**  
*Public landing page + municipal admin panel*

[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-6-purple?logo=vite)](https://vitejs.dev)
[![Tailwind](https://img.shields.io/badge/Tailwind_CSS-4-cyan?logo=tailwindcss)](https://tailwindcss.com)
[![Axios](https://img.shields.io/badge/Axios-JWT-green)](https://axios-http.com)

</div>

---

## ¿Qué es APR Xàtiva?

Sistema de gestión de Áreas de Prioridad Residencial para el Ayuntamiento de Xàtiva. Este repositorio contiene el frontend web: una landing page pública informativa y un panel de administración completo para el personal municipal.

> Proyecto TFG del CFGS DAM en el IES Dr. Lluís Simarro — nota **10/10**. Cedido al Ayuntamiento de Xàtiva como base para una posible implantación real.

---

## ✨ Funcionalidades principales

### 🌐 Landing page pública
- 🗺️ **Mapa interactivo** — zonas APR del nucli antic marcadas en colores con Leaflet/OpenStreetMap
- ❓ **FAQ** — acordeón interactivo con las preguntas más frecuentes
- 📱 **Descarga de la app** — botones para Android e iOS
- 🌍 **Multiidioma** — Valencià / Castellano / English con cambio dinámico sin recarga

### 🖥️ Panel de administración
- 📊 **Dashboard** — estadísticas en tiempo real con skeleton loading
- 📋 **Solicitudes** — gestión de pendientes + historial con filtro por fechas y paginación
- 👥 **Usuarios** — búsqueda en tiempo real, activar/desactivar, creación directa, paginación
- 🚗 **Vehículos** — consulta por usuario con historial activo/inactivo
- 🎫 **Derechos de acceso** — visualización de permanentes y puntuales por usuario
- 📷 **Simulador de cámaras** — terminal estilo consola con logs en tiempo real y estadísticas
- 🔍 **Auditoría** — log paginado de todas las acciones con filtro por evento y DNI
- 👤 **Perfil** — datos del administrador

### 🔐 Seguridad
- JWT automático en todas las peticiones via interceptor Axios
- **Refresh token** — renovación automática del JWT sin re-login, con cola de peticiones paralelas
- Logout con revocación del refresh token en el servidor
- Redirección automática al login en sesión expirada

### 🎨 UX / UI
- Skeleton loading en dashboard, usuarios y solicitudes
- Paginación en todas las tablas con muchos registros
- Mensajes de error claros en cada acción
- Diseño consistente con tipografía Georgia + Tailwind CSS

---

## 🛠️ Stack tecnológico

| Capa | Tecnología |
|------|-----------|
| Framework | React 19 + Vite |
| Estilos | Tailwind CSS |
| HTTP | Axios + interceptores JWT + refresh automático |
| Mapa | Leaflet + react-leaflet + OpenStreetMap |
| Estado global | React Context API |
| Routing | React Router v6 |

---

## 📁 Estructura del proyecto

```
src/
├── components/
│   ├── Navbar.jsx
│   └── RutaProtegida.jsx
├── context/
│   ├── AuthContext.jsx
│   ├── IdiomaContext.jsx
│   └── TemaContext.jsx
├── pages/
│   ├── LandingPage.jsx
│   ├── LoginPage.jsx
│   ├── DashboardPage.jsx
│   ├── SolicitudesPage.jsx
│   ├── UsuariosPage.jsx
│   ├── VehiculosPage.jsx
│   ├── DerechosPage.jsx
│   ├── AuditoriaPage.jsx
│   ├── SimuladorPage.jsx
│   └── PerfilPage.jsx
└── services/
    └── api.js
```

---

## 🚀 Instalación

```bash
git clone https://github.com/ArocaDev/apr-xativa-web.git
cd apr-xativa-web
npm install
npm run dev
```

El backend debe estar corriendo en `http://localhost:8080`. Para cambiar la URL:

```bash
# .env
VITE_API_URL=http://localhost:8080/api
```

---

## 🗺️ Roadmap

- [ ] Despliegue en Vercel con dominio apr.aroca.dev
- [ ] Dashboard con gráficas de accesos
- [ ] Tiempo real con WebSockets
- [ ] Capturas de pantalla y demo en vídeo

---

## 🔗 Repositorios del proyecto

| Componente | Repositorio |
|---|---|
| Backend API REST | [apr-xativa-backend](https://github.com/ArocaDev/apr-xativa-backend) |
| Panel web + Landing (este repo) | [apr-xativa-web](https://github.com/ArocaDev/apr-xativa-web) |
| App móvil Android | [apr-xativa-android](https://github.com/ArocaDev/apr-xativa-android) |

---

## 👤 Autor

**Alejandro Rodríguez Calabuig**  
[github.com/ArocaDev](https://github.com/ArocaDev) · [LinkedIn](https://linkedin.com/in/alejandro-rodriguez-calabuig-a871a1230)

---

## 📄 Licencia

Proyecto académico — cedido al Ayuntamiento de Xàtiva para posible uso institucional.
