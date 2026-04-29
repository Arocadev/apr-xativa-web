import { useState } from 'react'
import { MapContainer, TileLayer, Polygon, Tooltip } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

const zonaPoligonos = {
  zona1b: {
    color: '#d97706',
    fillColor: '#fde68a',
    coords: [
      [38.98923, -0.52200],
      [38.98925, -0.52274],
      [38.98902, -0.52350],
      [38.98896, -0.52345],
      [38.98912, -0.52270],
      [38.98915, -0.52199],
      [38.98923, -0.52200],
    ]
  },
  zona1a: {
    color: '#dc2626',
    fillColor: '#fca5a5',
    coords: [
      [38.98895, -0.52339],
      [38.98782, -0.52266],
      [38.98771, -0.52295],
      [38.98543, -0.52188],
      [38.98557, -0.52137],
      [38.98652, -0.52172],
      [38.98769, -0.51879],
      [38.98795, -0.51893],
      [38.98814, -0.51905],
      [38.98885, -0.51937],
      [38.98918, -0.51939],
      [38.98913, -0.52200],
      [38.98895, -0.52339],
    ]
  },
  zona2: {
    color: '#16a34a',
    fillColor: '#86efac',
    coords: [
      [38.98919, -0.51936],
      [38.98883, -0.51931],
      [38.98767, -0.51871],
      [38.98651, -0.52167],
      [38.98560, -0.52134],
      [38.98662, -0.51738],
      [38.98673, -0.51575],
      [38.98730, -0.51598],
      [38.98726, -0.51343],
      [38.98779, -0.51309],
      [38.98823, -0.51326],
      [38.98857, -0.51500],
      [38.98881, -0.51566],
      [38.98913, -0.51716],
      [38.98922, -0.51840],
      [38.98918, -0.51936],
    ]
  }
}

const idiomas = {
  val: {
    nav: { queEs: "Què és l'APR?", comoFunciona: 'Com funciona?', zonas: 'Zones', descarga: 'Descàrrega', faq: 'FAQ' },
    hero: {
      titulo: 'APR Xàtiva',
      subtitulo: 'Nucli Antic',
      descripcion: "Sistema de Control d'Accés a les Àrees de Prioritat Residencial de Xàtiva. Gestiona el teu accés de manera fàcil i ràpida des de la teua app.",
      boton: "Descarrega l'app"
    },
    queEs: {
      titulo: "Què és l'APR?",
      texto: "L'Àrea de Prioritat Residencial (APR) és un sistema de control d'accés que regula el trànsit en zones residencials històriques per millorar la qualitat de vida dels veïns. L'APR del Nucli Antic de Xàtiva comprèn els barris de Mercat/Sant Agustí, Sant Francesc i La Seu/Sant Pere.",
      objetivos: ['Millorar la seguretat viària dels residents', 'Reduir la contaminació i el soroll', 'Preservar el patrimoni històric', 'Millorar la mobilitat sostenible']
    },
    zonas: {
      titulo: 'Zones APR de Xàtiva',
      lista: [
        { nombre: 'Zona 1.A — Mercat / Sant Agustí', color: 'border-red-500', dot: 'bg-red-500', descripcion: 'Zona central del nucli antic. Accés restringit per a residents i vehicles autoritzats.' },
        { nombre: 'Zona 1.B — Sant Francesc', color: 'border-amber-500', dot: 'bg-amber-500', descripcion: "Barri de Sant Francesc. Zona de prioritat residencial amb control d'accés." },
        { nombre: 'Zona 2 — La Seu / Sant Pere', color: 'border-green-600', dot: 'bg-green-600', descripcion: "Zona est del nucli antic. Control d'accés per preservar el patrimoni històric." },
      ]
    },
    comoFunciona: {
      titulo: 'Com funciona?',
      pasos: [
        { titulo: "Registra't", texto: "Acudix a l'Ajuntament o registra't des de l'app mòbil amb la teua documentació." },
        { titulo: 'Sol·licita autorització', texto: "Presenta la teua sol·licitud d'accés. L'administrador validarà la teua documentació." },
        { titulo: 'Gestiona els teus vehicles', texto: "Una vegada autoritzat, gestiona els teus vehicles i accessos des de l'app." },
        { titulo: 'Accedix a la zona', texto: 'El sistema de càmeres reconeixerà automàticament la teua matrícula autoritzada.' },
      ]
    },
    descarga: {
      titulo: "Descarrega l'app APR Xàtiva",
      subtitulo: "Gestiona els teus vehicles, sol·licita accessos puntuals i consulta el teu estat d'autorització des del teu mòbil.",
      android: 'Pròximament a Android',
      ios: 'Pròximament a iOS'
    },
    faq: {
      titulo: 'Preguntes freqüents',
      preguntas: [
        { p: "Qui pot accedir a l'APR sense autorització?", r: "Els taxis, el transport públic regular, els vehicles d'emergència (ambulàncies, bombers, policia) i les bicicletes i patinets elèctrics no necessiten autorització." },
        { p: 'Com puc obtenir una autorització?', r: "Pots sol·licitar-la presencialment a l'Ajuntament de Xàtiva o a través de l'app mòbil adjuntant la documentació requerida segons la teua tipologia." },
        { p: 'Quants vehicles puc autoritzar?', r: "Depèn de la teua tipologia. Els residents empadronats (A.1) poden autoritzar fins a 3 vehicles permanents i 10 vehicles puntuals al mes." },
        { p: "Què és un accés puntual?", r: "És un permís d'accés per a un dia concret. Es pot gestionar fins a 5 dies abans i fins a 90 dies després de la data actual." },
        { p: 'Què passa si accedisc sense autorització?', r: "El sistema de càmeres detectarà la matrícula i es podrà imposar una sanció econòmica." },
      ]
    },
    footer: { texto: 'Ajuntament de Xàtiva — APR Nucli Antic', derechos: 'Tots els drets reservats' }
  },
  es: {
    nav: { queEs: '¿Qué es el APR?', comoFunciona: '¿Cómo funciona?', zonas: 'Zonas', descarga: 'Descarga', faq: 'FAQ' },
    hero: {
      titulo: 'APR Xàtiva',
      subtitulo: 'Nucli Antic',
      descripcion: 'Sistema de Control de Accesos a las Áreas de Prioridad Residencial de Xàtiva. Gestiona tu acceso de forma fácil y rápida desde tu app.',
      boton: 'Descarga la app'
    },
    queEs: {
      titulo: '¿Qué es el APR?',
      texto: 'El Área de Prioridad Residencial (APR) es un sistema de control de acceso que regula el tráfico en zonas residenciales históricas para mejorar la calidad de vida de los vecinos. El APR del Nucli Antic de Xàtiva comprende los barrios de Mercat/Sant Agustí, Sant Francesc y La Seu/Sant Pere.',
      objetivos: ['Mejorar la seguridad vial de los residentes', 'Reducir la contaminación y el ruido', 'Preservar el patrimonio histórico', 'Mejorar la movilidad sostenible']
    },
    zonas: {
      titulo: 'Zonas APR de Xàtiva',
      lista: [
        { nombre: 'Zona 1.A — Mercat / Sant Agustí', color: 'border-red-500', dot: 'bg-red-500', descripcion: 'Zona central del casco antiguo. Acceso restringido para residentes y vehículos autorizados.' },
        { nombre: 'Zona 1.B — Sant Francesc', color: 'border-amber-500', dot: 'bg-amber-500', descripcion: 'Barrio de Sant Francesc. Zona de prioridad residencial con control de acceso.' },
        { nombre: 'Zona 2 — La Seu / Sant Pere', color: 'border-green-600', dot: 'bg-green-600', descripcion: 'Zona este del casco antiguo. Control de acceso para preservar el patrimonio histórico.' },
      ]
    },
    comoFunciona: {
      titulo: '¿Cómo funciona?',
      pasos: [
        { titulo: 'Regístrate', texto: 'Acude al Ayuntamiento o regístrate desde la app móvil con tu documentación.' },
        { titulo: 'Solicita autorización', texto: 'Presenta tu solicitud de acceso. El administrador validará tu documentación.' },
        { titulo: 'Gestiona tus vehículos', texto: 'Una vez autorizado, gestiona tus vehículos y accesos desde la app.' },
        { titulo: 'Accede a la zona', texto: 'El sistema de cámaras reconocerá automáticamente tu matrícula autorizada.' },
      ]
    },
    descarga: {
      titulo: 'Descarga la app APR Xàtiva',
      subtitulo: 'Gestiona tus vehículos, solicita accesos puntuales y consulta tu estado de autorización desde tu móvil.',
      android: 'Próximamente en Android',
      ios: 'Próximamente en iOS'
    },
    faq: {
      titulo: 'Preguntas frecuentes',
      preguntas: [
        { p: '¿Quién puede acceder al APR sin autorización?', r: 'Los taxis, el transporte público regular, los vehículos de emergencia (ambulancias, bomberos, policía) y las bicicletas y patinetes eléctricos no necesitan autorización.' },
        { p: '¿Cómo puedo obtener una autorización?', r: 'Puedes solicitarla presencialmente en el Ayuntamiento de Xàtiva o a través de la app móvil adjuntando la documentación requerida según tu tipología.' },
        { p: '¿Cuántos vehículos puedo autorizar?', r: 'Depende de tu tipología. Los residentes empadronados (A.1) pueden autorizar hasta 3 vehículos permanentes y 10 vehículos puntuales al mes.' },
        { p: '¿Qué es un acceso puntual?', r: 'Es un permiso de acceso para un día concreto. Se puede gestionar hasta 5 días antes y hasta 90 días después de la fecha actual.' },
        { p: '¿Qué pasa si accedo sin autorización?', r: 'El sistema de cámaras detectará la matrícula y se podrá imponer una sanción económica.' },
      ]
    },
    footer: { texto: 'Ajuntament de Xàtiva — APR Nucli Antic', derechos: 'Todos los derechos reservados' }
  },
  en: {
    nav: { queEs: 'What is APR?', comoFunciona: 'How it works?', zonas: 'Zones', descarga: 'Download', faq: 'FAQ' },
    hero: {
      titulo: 'APR Xàtiva',
      subtitulo: 'Nucli Antic',
      descripcion: 'Access Control System for Residential Priority Areas in Xàtiva. Manage your access easily and quickly from your app.',
      boton: 'Download the app'
    },
    queEs: {
      titulo: 'What is APR?',
      texto: 'The Residential Priority Area (APR) is an access control system that regulates traffic in historic residential areas to improve the quality of life of residents. The APR of the Nucli Antic of Xàtiva covers the neighbourhoods of Mercat/Sant Agustí, Sant Francesc and La Seu/Sant Pere.',
      objetivos: ['Improve road safety for residents', 'Reduce pollution and noise', 'Preserve historical heritage', 'Improve sustainable mobility']
    },
    zonas: {
      titulo: 'APR Zones in Xàtiva',
      lista: [
        { nombre: 'Zone 1.A — Mercat / Sant Agustí', color: 'border-red-500', dot: 'bg-red-500', descripcion: 'Central area of the old town. Restricted access for residents and authorised vehicles.' },
        { nombre: 'Zone 1.B — Sant Francesc', color: 'border-amber-500', dot: 'bg-amber-500', descripcion: 'Sant Francesc neighbourhood. Residential priority zone with access control.' },
        { nombre: 'Zone 2 — La Seu / Sant Pere', color: 'border-green-600', dot: 'bg-green-600', descripcion: 'Eastern area of the old town. Access control to preserve historical heritage.' },
      ]
    },
    comoFunciona: {
      titulo: 'How does it work?',
      pasos: [
        { titulo: 'Register', texto: 'Visit the Town Hall or register from the mobile app with your documentation.' },
        { titulo: 'Request authorisation', texto: 'Submit your access request. The administrator will validate your documentation.' },
        { titulo: 'Manage your vehicles', texto: 'Once authorised, manage your vehicles and accesses from the app.' },
        { titulo: 'Access the zone', texto: 'The camera system will automatically recognise your authorised licence plate.' },
      ]
    },
    descarga: {
      titulo: 'Download the APR Xàtiva app',
      subtitulo: 'Manage your vehicles, request temporary access and check your authorisation status from your mobile.',
      android: 'Coming soon on Android',
      ios: 'Coming soon on iOS'
    },
    faq: {
      titulo: 'Frequently asked questions',
      preguntas: [
        { p: 'Who can access the APR without authorisation?', r: 'Taxis, regular public transport, emergency vehicles (ambulances, fire brigade, police) and bicycles and electric scooters do not need authorisation.' },
        { p: 'How can I get authorisation?', r: 'You can apply in person at the Xàtiva Town Hall or through the mobile app by attaching the required documentation according to your type.' },
        { p: 'How many vehicles can I authorise?', r: 'It depends on your type. Registered residents (A.1) can authorise up to 3 permanent vehicles and 10 temporary vehicles per month.' },
        { p: 'What is temporary access?', r: 'It is an access permit for a specific day. It can be managed up to 5 days before and up to 90 days after the current date.' },
        { p: 'What happens if I access without authorisation?', r: 'The camera system will detect the licence plate and an economic penalty may be imposed.' },
      ]
    },
    footer: { texto: 'Ajuntament de Xàtiva — APR Nucli Antic', derechos: 'All rights reserved' }
  }
}

export default function LandingPage() {
  const [idioma, setIdioma] = useState('val')
  const [faqAbierta, setFaqAbierta] = useState(null)
  const t = idiomas[idioma]

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>

      {/* Navbar */}
      <nav className="bg-white border-b-4 px-8 py-4 flex justify-between items-center sticky top-0 shadow-sm"
        style={{ borderColor: '#C0392B', zIndex: 999 }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded flex items-center justify-center text-white font-bold text-sm"
            style={{ backgroundColor: '#C0392B' }}>
            APR
          </div>
          <div>
            <h1 className="text-lg font-bold leading-tight" style={{ color: '#C0392B' }}>APR Xàtiva</h1>
            <p className="text-xs text-gray-500">Nucli Antic</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex gap-6 text-sm text-gray-600">
            <a href="#que-es" className="hover:text-red-700 transition font-medium">{t.nav.queEs}</a>
            <a href="#zonas" className="hover:text-red-700 transition font-medium">{t.nav.zonas}</a>
            <a href="#como-funciona" className="hover:text-red-700 transition font-medium">{t.nav.comoFunciona}</a>
            <a href="#descarga" className="hover:text-red-700 transition font-medium">{t.nav.descarga}</a>
            <a href="#faq" className="hover:text-red-700 transition font-medium">{t.nav.faq}</a>
          </div>
          <div className="flex gap-1 rounded-lg p-1" style={{ backgroundColor: '#A93226' }}>
            {['val', 'es', 'en'].map(l => (
              <button key={l} onClick={() => setIdioma(l)}
                className={`px-2 py-1 rounded-md text-xs font-medium transition ${idioma === l ? 'bg-white' : 'text-white/70 hover:text-white'}`}
                style={idioma === l ? { color: '#C0392B' } : {}}>
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative text-white py-16 px-8 text-center overflow-hidden" style={{ backgroundColor: '#C0392B' }}>
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(255,255,255,0.1) 40px, rgba(255,255,255,0.1) 80px)'
        }} />
        <div className="relative z-10">
          <h2 className="text-5xl md:text-7xl font-bold mb-2 tracking-tight">{t.hero.titulo}</h2>
          <p className="text-xl md:text-2xl mb-6 text-white/70 italic">{t.hero.subtitulo}</p>
          <p className="text-base md:text-lg mb-10 max-w-2xl mx-auto text-white/85 leading-relaxed" style={{ fontFamily: 'sans-serif' }}>
            {t.hero.descripcion}
          </p>
          <a href="#descarga"
            className="inline-block bg-white font-semibold px-10 py-4 rounded text-sm uppercase tracking-widest hover:bg-gray-100 transition"
            style={{ color: '#C0392B' }}>
            {t.hero.boton}
          </a>
        </div>
      </section>

      {/* Qué es */}
      <section id="que-es" className="py-20 px-8 max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-10 rounded" style={{ backgroundColor: '#C0392B' }} />
          <h2 className="text-3xl font-bold text-gray-800">{t.queEs.titulo}</h2>
        </div>
        <p className="text-lg text-gray-600 mb-10 leading-relaxed max-w-3xl" style={{ fontFamily: 'sans-serif' }}>
          {t.queEs.texto}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {t.queEs.objetivos.map((obj, i) => (
            <div key={i} className="flex items-center gap-3 bg-red-50 border border-red-100 rounded-lg p-4">
              <span className="text-lg font-bold" style={{ color: '#C0392B' }}>✓</span>
              <p className="text-gray-700 text-sm" style={{ fontFamily: 'sans-serif' }}>{obj}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="h-px bg-gray-200 max-w-5xl mx-auto" />

      {/* Zonas */}
      <section id="zonas" className="py-20 px-8 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-1 h-10 rounded" style={{ backgroundColor: '#C0392B' }} />
            <h2 className="text-3xl font-bold text-gray-800">{t.zonas.titulo}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
            {t.zonas.lista.map((zona, i) => (
              <div key={i} className={`bg-white border-l-4 ${zona.color} rounded-lg p-5 shadow-sm`}>
                <div className="flex items-center gap-2 mb-3">
                  <div className={`w-3 h-3 rounded-full ${zona.dot}`} />
                  <h3 className="font-bold text-gray-800 text-sm">{zona.nombre}</h3>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed" style={{ fontFamily: 'sans-serif' }}>{zona.descripcion}</p>
              </div>
            ))}
          </div>
          <div className="rounded-xl overflow-hidden shadow-md border border-gray-200" style={{ height: '440px', position: 'relative', zIndex: 1 }}>
            <MapContainer
              center={[38.9875, -0.5195]}
              zoom={15}
              style={{ height: '100%', width: '100%' }}
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {Object.entries(zonaPoligonos).map(([key, zona]) => (
                <Polygon
                  key={key}
                  positions={zona.coords}
                  pathOptions={{
                    color: zona.color,
                    fillColor: zona.fillColor,
                    fillOpacity: 0.4,
                    weight: 2,
                  }}
                >
                  <Tooltip sticky>
                    {key === 'zona1a' ? 'Zona 1.A — Mercat / Sant Agustí' :
                     key === 'zona1b' ? 'Zona 1.B — Sant Francesc' :
                     'Zona 2 — La Seu / Sant Pere'}
                  </Tooltip>
                </Polygon>
              ))}
            </MapContainer>
          </div>
        </div>
      </section>

      {/* Cómo funciona */}
      <section id="como-funciona" className="py-20 px-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-1 h-10 rounded" style={{ backgroundColor: '#C0392B' }} />
            <h2 className="text-3xl font-bold text-gray-800">{t.comoFunciona.titulo}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {t.comoFunciona.pasos.map((paso, i) => (
              <div key={i} className="relative">
                {i < t.comoFunciona.pasos.length - 1 && (
                  <div className="hidden md:block absolute top-7 left-14 right-0 h-px bg-gray-200" />
                )}
                <div className="w-14 h-14 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4 relative z-10"
                  style={{ backgroundColor: '#C0392B' }}>
                  {i + 1}
                </div>
                <h3 className="font-bold text-gray-800 mb-2 text-sm">{paso.titulo}</h3>
                <p className="text-gray-500 text-sm leading-relaxed" style={{ fontFamily: 'sans-serif' }}>{paso.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Descarga */}
      <section id="descarga" className="py-20 px-8 text-white text-center" style={{ backgroundColor: '#A93226' }}>
        <h2 className="text-3xl font-bold mb-4">{t.descarga.titulo}</h2>
        <p className="text-base mb-10 text-white/80 max-w-xl mx-auto leading-relaxed" style={{ fontFamily: 'sans-serif' }}>
          {t.descarga.subtitulo}
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <button className="bg-white px-7 py-3 rounded flex items-center gap-2 hover:bg-gray-100 transition font-semibold text-sm"
            style={{ color: '#C0392B' }}>
            🤖 {t.descarga.android}
          </button>
          <button className="bg-white px-7 py-3 rounded flex items-center gap-2 hover:bg-gray-100 transition font-semibold text-sm"
            style={{ color: '#C0392B' }}>
            🍎 {t.descarga.ios}
          </button>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 px-8 max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-1 h-10 rounded" style={{ backgroundColor: '#C0392B' }} />
          <h2 className="text-3xl font-bold text-gray-800">{t.faq.titulo}</h2>
        </div>
        <div className="space-y-3">
          {t.faq.preguntas.map((item, i) => (
            <div key={i} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setFaqAbierta(faqAbierta === i ? null : i)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition"
              >
                <span className="font-medium text-gray-800 text-sm" style={{ fontFamily: 'sans-serif' }}>{item.p}</span>
                <span className="text-lg font-bold ml-4 flex-shrink-0" style={{ color: '#C0392B' }}>
                  {faqAbierta === i ? '−' : '+'}
                </span>
              </button>
              {faqAbierta === i && (
                <div className="px-6 py-4 bg-red-50 text-gray-600 text-sm border-t border-gray-200 leading-relaxed" style={{ fontFamily: 'sans-serif' }}>
                  {item.r}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-white py-10 px-8" style={{ backgroundColor: '#A93226' }}>
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <p className="font-bold text-lg">{t.footer.texto}</p>
            <p className="text-white/50 text-sm mt-1" style={{ fontFamily: 'sans-serif' }}>{t.footer.derechos}</p>
          </div>
          <a href="/admin/login" className="text-white/30 hover:text-white/60 text-xs transition">
            Accés administració
          </a>
        </div>
      </footer>

    </div>
  )
}