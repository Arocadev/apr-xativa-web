# APR Xàtiva — Web

> Landing page pública + panel de administración municipal | Public landing page + municipal admin panel

---

## 🇪🇸 Español

Frontend web del sistema APR Xàtiva, que incluye la **landing page pública** informativa y el **panel de administración** para el personal municipal. Desarrollado como parte del TFG del CFGS DAM en el IES Dr. Lluís Simarro, con nota de **9/10**.

> El proyecto fue cedido al Ayuntamiento de Xàtiva como base para una posible implantación real.

---

### ✨ Funcionalidades

#### Landing page pública
- 🗺️ **Mapa interactivo** — zonas APR del nucli antic marcadas en colores con Leaflet/OpenStreetMap
- ❓ **FAQ** — acordeón interactivo con las preguntas más frecuentes
- 📱 **Descarga de la app** — botones para Android e iOS
- 🌍 **Multiidioma** — Valencià / Castellano / English con cambio dinámico sin recarga

#### Panel de administración
- 📊 **Dashboard** — estadísticas en tiempo real: solicitudes pendientes, usuarios y vehículos
- 📋 **Solicitudes** — gestión de pendientes + historial con filtro por fechas
- 👥 **Usuarios** — búsqueda en tiempo real, activar/desactivar, creación directa
- 🚗 **Vehículos** — consulta por usuario con historial activo/inactivo
- 🎫 **Derechos de acceso** — visualización de permanentes y puntuales por usuario
- 📷 **Simulador de cámaras** — terminal estilo consola con logs en tiempo real y estadísticas
- 👤 **Perfil** — datos del administrador y cambio de contraseña

---

### 🛠️ Stack tecnológico

| Capa | Tecnología |
|------|-----------|
| Framework | React 19 + Vite |
| Estilos | Tailwind CSS |
| HTTP | Axios + interceptores JWT automáticos |
| Mapa | Leaflet + OpenStreetMap |
| Estado global | React Context API |

---

### 📁 Estructura del proyecto

```
src/
├── components/     # Componentes reutilizables
├── pages/
│   ├── landing/   # Landing page pública
│   └── admin/     # Panel de administración
├── context/
│   ├── AuthContext.jsx    # Autenticación + token JWT
│   └── IdiomaContext.jsx  # Internacionalización
└── services/      # Llamadas a la API REST
```

---

### 🚀 Instalación

```bash
git clone https://github.com/ArocaDev/apr-xativa-web.git
cd apr-xativa-web

npm install
npm run dev
```

---

### 🔗 Repositorios del proyecto

| Componente | Repositorio |
|---|---|
| Backend API REST | [apr-xativa-backend](https://github.com/ArocaDev/apr-xativa-backend) |
| Panel web + Landing (este repo) | [apr-xativa-web](https://github.com/ArocaDev/apr-xativa-web) |
| App móvil Android | [apr-xativa-android](https://github.com/ArocaDev/apr-xativa-android) |

---

## 🌐 English

Web frontend of the APR Xàtiva system, including the **public landing page** and the **municipal admin panel**. Developed as part of a final degree project (TFG) for the DAM Higher Vocational Course at IES Dr. Lluís Simarro, graded **9/10**.

> The project was handed over to Xàtiva City Council as a base for potential real-world implementation.

---

### ✨ Features

#### Public landing page
- 🗺️ **Interactive map** — APR zones of the historic centre highlighted in colours with Leaflet/OpenStreetMap
- ❓ **FAQ** — interactive accordion with the most common questions
- 📱 **App download** — buttons for Android and iOS
- 🌍 **Multilingual** — Valencian / Spanish / English with dynamic switching without page reload

#### Admin panel
- 📊 **Dashboard** — real-time stats: pending requests, users and vehicles
- 📋 **Requests** — manage pending requests + full history with date filter
- 👥 **Users** — real-time search, activate/deactivate, direct account creation
- 🚗 **Vehicles** — query by user with active/inactive history
- 🎫 **Access rights** — view permanent and one-time rights per user
- 📷 **Camera simulator** — console-style terminal with real-time logs and statistics
- 👤 **Profile** — admin account data and password change

---

### 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 + Vite |
| Styles | Tailwind CSS |
| HTTP | Axios + automatic JWT interceptors |
| Map | Leaflet + OpenStreetMap |
| Global state | React Context API |

---

### 🚀 Installation

```bash
git clone https://github.com/ArocaDev/apr-xativa-web.md
cd apr-xativa-web

npm install
npm run dev
```

---

## 👤 Autor / Author

**Alejandro Rodríguez Calabuig** — [github.com/ArocaDev](https://github.com/ArocaDev) · [LinkedIn](https://linkedin.com/in/alejandro-rodriguez-calabuig-a871a1230)

---

## 📄 Licencia / License

Proyecto académico — cedido al Ayuntamiento de Xàtiva para posible uso institucional.  
Academic project — handed over to Xàtiva City Council for potential institutional use.
