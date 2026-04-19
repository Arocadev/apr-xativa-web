import { useState } from 'react'

const idiomas = {
  val: {
    nav: { queEs: 'Què és l\'APR?', comoFunciona: 'Com funciona?', zonas: 'Zones', descarga: 'Descàrrega', faq: 'FAQ' },
    hero: {
      titulo: 'APR Xàtiva — Nucli Antic',
      subtitulo: 'Sistema de Control d\'Accés a les Àrees de Prioritat Residencial de Xàtiva. Gestiona el teu accés de manera fàcil i ràpida des de la teua app.',
      boton: 'Descarrega l\'app'
    },
    queEs: {
      titulo: 'Què és l\'APR?',
      texto: 'L\'Àrea de Prioritat Residencial (APR) és un sistema de control d\'accés que regula el trànsit en zones residencials històriques per millorar la qualitat de vida dels veïns. L\'APR del Nucli Antic de Xàtiva comprèn els barris de Mercat/Sant Agustí, Sant Francesc i La Seu/Sant Pere.',
      objetivos: ['Millorar la seguretat viària dels residents', 'Reduir la contaminació i el soroll', 'Preservar el patrimoni històric', 'Millorar la mobilitat sostenible']
    },
    zonas: {
      titulo: 'Zones APR de Xàtiva',
      lista: [
        { nombre: 'Zona 1.A — Mercat / Sant Agustí', color: 'bg-red-100 border-red-400 text-red-800', descripcion: 'Zona central del nucli antic. Accés restringit per a residents i vehicles autoritzats.' },
        { nombre: 'Zona 1.B — Sant Francesc', color: 'bg-yellow-100 border-yellow-400 text-yellow-800', descripcion: 'Barri de Sant Francesc. Zona de prioritat residencial amb control d\'accés.' },
        { nombre: 'Zona 2 — La Seu / Sant Pere', color: 'bg-green-100 border-green-400 text-green-800', descripcion: 'Zona est del nucli antic. Control d\'accés per preservar el patrimoni històric.' },
      ]
    },
    comoFunciona: {
      titulo: 'Com funciona?',
      pasos: [
        { titulo: 'Registra\'t', texto: 'Acudix a l\'Ajuntament o registra\'t des de l\'app mòbil amb la teua documentació.' },
        { titulo: 'Sol·licita autorització', texto: 'Presenta la teua sol·licitud d\'accés. L\'administrador validarà la teua documentació.' },
        { titulo: 'Gestiona els teus vehicles', texto: 'Una vegada autoritzat, gestiona els teus vehicles i accessos des de l\'app.' },
        { titulo: 'Accedix a la zona', texto: 'El sistema de càmeres reconeixerà automàticament la teua matrícula autoritzada.' },
      ]
    },
    descarga: {
      titulo: 'Descarrega l\'app APR Xàtiva',
      subtitulo: 'Gestiona els teus vehicles, sol·licita accessos puntuals i consulta el teu estat d\'autorització des del teu mòbil.',
      android: 'Pròximament a Android',
      ios: 'Pròximament a iOS'
    },
    faq: {
      titulo: 'Preguntes freqüents',
      preguntas: [
        { p: 'Qui pot accedir a l\'APR sense autorització?', r: 'Els taxis, el transport públic regular, els vehicles d\'emergència (ambulàncies, bombers, policia) i les bicicletes i patinets elèctrics no necessiten autorització.' },
        { p: 'Com puc obtenir una autorització?', r: 'Pots sol·licitar-la presencialment a l\'Ajuntament de Xàtiva o a través de l\'app mòbil adjuntant la documentació requerida segons la teua tipologia.' },
        { p: 'Quants vehicles puc autoritzar?', r: 'Depèn de la teua tipologia. Els residents empadronats (A.1) poden autoritzar fins a 3 vehicles permanents i 10 vehicles puntuals al mes.' },
        { p: 'Què és un accés puntual?', r: 'És un permís d\'accés per a un dia concret. Es pot gestionar fins a 5 dies abans i fins a 90 dies després de la data actual.' },
        { p: 'Què passa si accedisc sense autorització?', r: 'El sistema de càmeres detectarà la matrícula i es podrà imposar una sanció econòmica.' },
      ]
    },
    footer: { texto: 'Ajuntament de Xàtiva — APR Nucli Antic', derechos: 'Tots els drets reservats' }
  },
  es: {
    nav: { queEs: '¿Qué es el APR?', comoFunciona: '¿Cómo funciona?', zonas: 'Zonas', descarga: 'Descarga', faq: 'FAQ' },
    hero: {
      titulo: 'APR Xàtiva — Nucli Antic',
      subtitulo: 'Sistema de Control de Accesos a las Áreas de Prioridad Residencial de Xàtiva. Gestiona tu acceso de forma fácil y rápida desde tu app.',
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
        { nombre: 'Zona 1.A — Mercat / Sant Agustí', color: 'bg-red-100 border-red-400 text-red-800', descripcion: 'Zona central del casco antiguo. Acceso restringido para residentes y vehículos autorizados.' },
        { nombre: 'Zona 1.B — Sant Francesc', color: 'bg-yellow-100 border-yellow-400 text-yellow-800', descripcion: 'Barrio de Sant Francesc. Zona de prioridad residencial con control de acceso.' },
        { nombre: 'Zona 2 — La Seu / Sant Pere', color: 'bg-green-100 border-green-400 text-green-800', descripcion: 'Zona este del casco antiguo. Control de acceso para preservar el patrimonio histórico.' },
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
      titulo: 'APR Xàtiva — Nucli Antic',
      subtitulo: 'Access Control System for Residential Priority Areas in Xàtiva. Manage your access easily and quickly from your app.',
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
        { nombre: 'Zone 1.A — Mercat / Sant Agustí', color: 'bg-red-100 border-red-400 text-red-800', descripcion: 'Central area of the old town. Restricted access for residents and authorised vehicles.' },
        { nombre: 'Zone 1.B — Sant Francesc', color: 'bg-yellow-100 border-yellow-400 text-yellow-800', descripcion: 'Sant Francesc neighbourhood. Residential priority zone with access control.' },
        { nombre: 'Zone 2 — La Seu / Sant Pere', color: 'bg-green-100 border-green-400 text-green-800', descripcion: 'Eastern area of the old town. Access control to preserve historical heritage.' },
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
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="bg-white shadow px-8 py-4 flex justify-between items-center sticky top-0 z-50">
        <h1 className="text-xl font-bold text-blue-700">APR Xàtiva</h1>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex gap-6 text-sm text-gray-600">
            <a href="#que-es" className="hover:text-blue-700 transition">{t.nav.queEs}</a>
            <a href="#zonas" className="hover:text-blue-700 transition">{t.nav.zonas}</a>
            <a href="#como-funciona" className="hover:text-blue-700 transition">{t.nav.comoFunciona}</a>
            <a href="#descarga" className="hover:text-blue-700 transition">{t.nav.descarga}</a>
            <a href="#faq" className="hover:text-blue-700 transition">{t.nav.faq}</a>
          </div>
          <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
            {['val', 'es', 'en'].map(l => (
              <button key={l} onClick={() => setIdioma(l)}
                className={`px-2 py-1 rounded-md text-xs font-medium transition ${idioma === l ? 'bg-white shadow text-gray-800' : 'text-gray-500'}`}>
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-blue-700 text-white py-28 px-8 text-center">
        <h2 className="text-4xl md:text-6xl font-bold mb-6">{t.hero.titulo}</h2>
        <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto opacity-90">{t.hero.subtitulo}</p>
        <a href="#descarga" className="bg-white text-blue-700 font-semibold px-8 py-4 rounded-full text-lg hover:bg-blue-50 transition">
          {t.hero.boton}
        </a>
      </section>

      {/* Qué es el APR */}
      <section id="que-es" className="py-20 px-8 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">{t.queEs.titulo}</h2>
        <p className="text-lg text-gray-600 text-center mb-10">{t.queEs.texto}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {t.queEs.objetivos.map((obj, i) => (
            <div key={i} className="flex items-center gap-3 bg-blue-50 rounded-xl p-4">
              <span className="text-blue-700 text-xl">✓</span>
              <p className="text-gray-700 text-sm">{obj}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Zonas */}
      <section id="zonas" className="py-20 px-8 bg-gray-50">
        <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">{t.zonas.titulo}</h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.zonas.lista.map((zona, i) => (
            <div key={i} className={`border-2 rounded-2xl p-6 ${zona.color}`}>
              <h3 className="font-bold text-lg mb-3">{zona.nombre}</h3>
              <p className="text-sm opacity-80">{zona.descripcion}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Cómo funciona */}
      <section id="como-funciona" className="py-20 px-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">{t.comoFunciona.titulo}</h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          {t.comoFunciona.pasos.map((paso, i) => (
            <div key={i} className="text-center">
              <div className="w-14 h-14 bg-blue-700 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                {i + 1}
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">{paso.titulo}</h3>
              <p className="text-gray-500 text-sm">{paso.texto}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Descarga */}
      <section id="descarga" className="py-20 px-8 bg-blue-700 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">{t.descarga.titulo}</h2>
        <p className="text-lg mb-10 opacity-90 max-w-2xl mx-auto">{t.descarga.subtitulo}</p>
        <div className="flex justify-center gap-4 flex-wrap">
          <button className="bg-white text-blue-700 px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-blue-50 transition font-semibold">
            🤖 {t.descarga.android}
          </button>
          <button className="bg-white text-blue-700 px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-blue-50 transition font-semibold">
            🍎 {t.descarga.ios}
          </button>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 px-8 max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">{t.faq.titulo}</h2>
        <div className="space-y-4">
          {t.faq.preguntas.map((item, i) => (
            <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setFaqAbierta(faqAbierta === i ? null : i)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition"
              >
                <span className="font-medium text-gray-800 text-sm">{item.p}</span>
                <span className="text-blue-700 text-xl">{faqAbierta === i ? '−' : '+'}</span>
              </button>
              {faqAbierta === i && (
                <div className="px-6 py-4 bg-gray-50 text-gray-600 text-sm border-t border-gray-200">
                  {item.r}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-8">
        <p className="font-semibold mb-1">{t.footer.texto}</p>
        <p className="text-gray-400 text-sm">{t.footer.derechos}</p>
        <div className="mt-4">
          <a href="/admin/login" className="text-gray-500 hover:text-gray-300 text-xs opacity-50 hover:opacity-100 transition">
            Accés administració
          </a>
        </div>
      </footer>
    </div>
  )
}