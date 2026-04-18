import { useState } from 'react'

const idiomas = {
  es: {
    nav: { inicio: 'Inicio', queEs: '¿Qué es el APR?', comoFunciona: '¿Cómo funciona?', descarga: 'Descarga', faq: 'FAQ' },
    hero: { titulo: 'Bienvenido al APR de Xàtiva', subtitulo: 'Gestiona tu acceso a las zonas de prioridad residencial de forma fácil y rápida', boton: 'Descarga la app' },
    queEs: { titulo: '¿Qué es el APR?', texto: 'El Área de Prioridad Residencial (APR) es un sistema de control de acceso que permite regular el tráfico en zonas residenciales para mejorar la calidad de vida de los vecinos.' },
    comoFunciona: { titulo: '¿Cómo funciona?', pasos: ['Regístrate en la app', 'Solicita tu autorización', 'El ayuntamiento valida tu solicitud', 'Accede a tu zona con tu vehículo autorizado'] },
    descarga: { titulo: 'Descarga la app', subtitulo: 'Disponible próximamente en Android e iOS' },
    faq: { titulo: 'Preguntas frecuentes' },
    footer: { texto: 'Ajuntament de Xàtiva — APR Xàtiva' }
  },
  val: {
    nav: { inicio: 'Inici', queEs: 'Què és l\'APR?', comoFunciona: 'Com funciona?', descarga: 'Descàrrega', faq: 'FAQ' },
    hero: { titulo: 'Benvingut a l\'APR de Xàtiva', subtitulo: 'Gestiona el teu accés a les zones de prioritat residencial de manera fàcil i ràpida', boton: 'Descarrega l\'app' },
    queEs: { titulo: 'Què és l\'APR?', texto: 'L\'Àrea de Prioritat Residencial (APR) és un sistema de control d\'accés que permet regular el trànsit en zones residencials per millorar la qualitat de vida dels veïns.' },
    comoFunciona: { titulo: 'Com funciona?', pasos: ['Registra\'t a l\'app', 'Sol·licita la teua autorització', 'L\'ajuntament valida la teua sol·licitud', 'Accedeix a la teua zona amb el teu vehicle autoritzat'] },
    descarga: { titulo: 'Descarrega l\'app', subtitulo: 'Disponible pròximament a Android i iOS' },
    faq: { titulo: 'Preguntes freqüents' },
    footer: { texto: 'Ajuntament de Xàtiva — APR Xàtiva' }
  },
  en: {
    nav: { inicio: 'Home', queEs: 'What is APR?', comoFunciona: 'How it works?', descarga: 'Download', faq: 'FAQ' },
    hero: { titulo: 'Welcome to APR Xàtiva', subtitulo: 'Manage your access to residential priority areas easily and quickly', boton: 'Download the app' },
    queEs: { titulo: 'What is APR?', texto: 'The Residential Priority Area (APR) is an access control system that regulates traffic in residential areas to improve the quality of life of residents.' },
    comoFunciona: { titulo: 'How it works?', pasos: ['Register on the app', 'Request your authorization', 'The city hall validates your request', 'Access your zone with your authorized vehicle'] },
    descarga: { titulo: 'Download the app', subtitulo: 'Coming soon on Android and iOS' },
    faq: { titulo: 'Frequently asked questions' },
    footer: { texto: 'Ajuntament de Xàtiva — APR Xàtiva' }
  }
}

export default function LandingPage() {
  const [idioma, setIdioma] = useState('val')
  const t = idiomas[idioma]

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="bg-white shadow px-8 py-4 flex justify-between items-center sticky top-0 z-50">
        <h1 className="text-xl font-bold text-blue-700">APR Xàtiva</h1>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex gap-6 text-sm text-gray-600">
            <a href="#que-es" className="hover:text-blue-700 transition">{t.nav.queEs}</a>
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
      <section className="bg-blue-700 text-white py-24 px-8 text-center">
        <h2 className="text-4xl md:text-6xl font-bold mb-6">{t.hero.titulo}</h2>
        <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto opacity-90">{t.hero.subtitulo}</p>
        <a href="#descarga" className="bg-white text-blue-700 font-semibold px-8 py-4 rounded-full text-lg hover:bg-blue-50 transition">
          {t.hero.boton}
        </a>
      </section>

      {/* Qué es el APR */}
      <section id="que-es" className="py-20 px-8 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">{t.queEs.titulo}</h2>
        <p className="text-lg text-gray-600 text-center">{t.queEs.texto}</p>
      </section>

      {/* Cómo funciona */}
      <section id="como-funciona" className="py-20 px-8 bg-gray-50">
        <h2 className="text-3xl font-bold text.gray-800 mb-12 text-center">{t.comoFunciona.titulo}</h2>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          {t.comoFunciona.pasos.map((paso, i) => (
            <div key={i} className="text-center">
              <div className="w-12 h-12 bg-blue-700 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                {i + 1}
              </div>
              <p className="text-gray-600 text-sm">{paso}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Descarga */}
      <section id="descarga" className="py-20 px-8 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">{t.descarga.titulo}</h2>
        <p className="text-gray-500 mb-8">{t.descarga.subtitulo}</p>
        <div className="flex justify-center gap-4">
          <button className="bg-black text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-gray-800 transition">
            🤖 Android
          </button>
          <button className="bg-black text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-gray-800 transition">
            🍎 iOS
          </button>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 px-8 bg-gray-50 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">{t.faq.titulo}</h2>
        <p className="text-center text-gray-500">Pròximament</p>
      </section>

      {/* Footer */}
      <footer className="bg-blue-700 text-white text-center py-6 text-sm">
        {t.footer.texto}
        <div className="mt-2">
          <a href="/admin/login" className="text-blue-300 hover:text-white text-xs opacity-50 hover:opacity-100 transition">
            Accés administració
          </a>
        </div>
      </footer>
    </div>
  )
}