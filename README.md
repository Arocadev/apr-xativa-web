<div align="center">

# APR Xàtiva — Panel Web

**Panel de administración para el sistema de control de acceso vehicular**

[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-6-purple?logo=vite)](https://vitejs.dev)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES2024-yellow?logo=javascript)](https://developer.mozilla.org/es/docs/Web/JavaScript)

</div>

---

## ¿Qué es APR Xàtiva?

APR Xàtiva es un sistema de control de acceso vehicular desarrollado como Trabajo de Fin de Grado (DAM) y adoptado por el Ajuntament de Xàtiva como propuesta técnica. Este repositorio contiene el panel web de administración y la landing page informativa pública.

🔧 **Backend:** [github.com/ArocaDev/apr-xativa-backend](https://github.com/ArocaDev/apr-xativa-backend)  
📱 **App Android:** [github.com/ArocaDev/apr-xativa-android](https://github.com/ArocaDev/apr-xativa-android)

---

## ✨ Funcionalidades

**Landing page pública:**
- Descripción del sistema APR y zonas del núcleo antiguo
- Mapa interactivo con Leaflet
- Guía de uso en 4 pasos
- Sección de descarga de la app
- Preguntas frecuentes
- Multiidioma: Valenciano, Español e Inglés

**Panel de administración:**
- Autenticación JWT con refresh token automático y cola para 401 paralelos
- Dashboard con estadísticas generales
- Gestión de vehículos — CRUD con búsqueda en tiempo real
- Gestión de usuarios — roles ADMIN y AGENTE, skeleton loading, paginación client-side
- Solicitudes de acceso — revisión de documentación, aprobación y rechazo
- Derechos de acceso — permanentes y puntuales
- Simulador de acceso — probabilidad 60/40 para testing
- Auditoría — paginación server-side, filtros por DNI y tipo de evento, badges de colores
- Notificaciones

---

## 📸 Capturas — Landing

<div align="center">

| Hero | ¿Qué es el APR? | Zonas y mapa |
|:-:|:-:|:-:|
| ![Hero](assets/web-hero.png) | ![Qué es](assets/web-que-es.png) | ![Mapa](assets/web-mapa.png) |

| ¿Cómo funciona? | Descarga | FAQ |
|:-:|:-:|:-:|
| ![Cómo funciona](assets/web-como-funciona.png) | ![Descarga](assets/web-descarga.png) | ![FAQ](assets/web-faq.png) |

</div>

---

## 🎬 Demo — Landing

<img src="assets/web-landing.gif" width="700" />

---

## 📸 Capturas — Panel de administración

<div align="center">

| Dashboard | Solicitudes | Detalle solicitud |
|:-:|:-:|:-:|
| ![Dashboard](assets/admin-dashboard.png) | ![Solicitudes](assets/admin-solicitudes.png) | ![Detalle](assets/admin-solicitud-nueva.png) |

| Usuarios | Crear usuario | Vehículos |
|:-:|:-:|:-:|
| ![Usuarios](assets/admin-usuarios.png) | ![Crear usuario](assets/admin-crear-usuario.png) | ![Vehículos](assets/admin-vehiculos.png) |

| Derechos de acceso | Simulador | Auditoría |
|:-:|:-:|:-:|
| ![Derechos](assets/admin-derechos.png) | ![Simulador](assets/admin-simulador.png) | ![Auditoría](assets/admin-auditoria.png) |

| Notificaciones | Perfil |
|:-:|:-:|
| ![Notificaciones](assets/admin-notificaciones.png) | ![Perfil](assets/admin-perfil.png) |

</div>

---

## 🎬 Demo — Panel de administración

**Gestión de usuarios**

<img src="assets/admin-usuarios.gif" width="700" />

**Gestión de vehículos**

<img src="assets/admin-vehiculos.gif" width="700" />

**Derechos de acceso**

<img src="assets/admin-derechos.gif" width="700" />

**Solicitudes de acceso**

<img src="assets/admin-solicitudes.gif" width="700" />

**Simulador de acceso**

<img src="assets/admin-simulador.gif" width="700" />

**Auditoría**

<img src="assets/admin-auditoria.gif" width="700" />

---

## 🛠️ Stack técnico

| Capa | Tecnología |
|------|-----------|
| Framework | React 19 |
| Bundler | Vite 6 |
| Routing | React Router v7 |
| HTTP | Axios con interceptor de refresh token |
| Mapas | Leaflet |
| Estilos | CSS Modules |
| Auth | JWT almacenado en localStorage |

---

## 📁 Estructura del proyecto

```
apr-xativa-frontend/
├── src/
│   ├── pages/
│   │   ├── landing/
│   │   ├── admin/
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── UsuariosPage.jsx
│   │   │   ├── VehiculosPage.jsx
│   │   │   ├── SolicitudesPage.jsx
│   │   │   ├── DerechosPage.jsx
│   │   │   ├── SimuladorPage.jsx
│   │   │   └── AuditoriaPage.jsx
│   │   └── auth/
│   ├── components/
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── api/
│   │   └── api.js
│   └── App.jsx
├── assets/
│   └── .gitkeep
└── vite.config.js
```

---

## 🚀 Instalación

```bash
git clone https://github.com/ArocaDev/apr-xativa-frontend.git
cd apr-xativa-frontend
npm install
cp .env.example .env
# Edita .env con la URL del backend
npm run dev
```

Accede en `http://localhost:5173`

---

## 🔑 Variables de entorno

```env
VITE_API_URL=http://localhost:8080
```

---

## 🗺️ Roadmap

- [x] Autenticación JWT con refresh token automático
- [x] Cola para gestionar 401 paralelos
- [x] Dashboard con estadísticas
- [x] Gestión de vehículos con búsqueda en tiempo real
- [x] Gestión de usuarios con skeleton loading y paginación
- [x] Solicitudes de acceso con revisión de documentación
- [x] Derechos de acceso permanentes y puntuales
- [x] Simulador de acceso 60/40
- [x] Auditoría con paginación server-side y filtros
- [x] Notificaciones
- [x] Landing page multiidioma con mapa Leaflet
- [ ] Migración a TypeScript

---

## 🏆 Reconocimiento

Proyecto calificado con **10/10** y adoptado por el **Ajuntament de Xàtiva** como propuesta técnica oficial.

---

## 👤 Autor

**Alejandro Rodríguez Calabuig**  
[github.com/ArocaDev](https://github.com/ArocaDev) · [LinkedIn](https://www.linkedin.com/in/alejandro-rodriguez-calabuig-a871a1230)

---

## 📄 Licencia

Proyecto académico — no licenciado para uso comercial.
