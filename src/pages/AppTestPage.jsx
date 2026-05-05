import { Link } from 'react-router-dom'
import SiteNav from '../components/SiteNav'
import SiteFooter from '../components/SiteFooter'

export default function AppTestPage() {
  return (
    <div className="page-shell">
      <header className="hero hero-compact">
        <SiteNav />

        <section className="app-test-intro">
          <p className="eyebrow">Área de prueba</p>
          <h1>Ruta /app</h1>
          <p className="hero-text">
            Usa esta pantalla para experimentar con la app o nuevos componentes sin
            mezclarlo con la landing principal. Cuando quieras volver al sitio
            público, regresa al inicio.
          </p>
          <Link className="button button-secondary" to="/">
            Volver al inicio
          </Link>
        </section>
      </header>

      <main className="section app-test-main">
        <div className="section-heading">
          <p className="section-label">Sandbox</p>
          <h2>Empieza aquí</h2>
          <p>
            Sustituye este bloque por el flujo o la UI que quieras probar. La ruta
            seguirá siendo <code className="inline-code">/app</code> para que puedas
            compartir enlaces de prueba.
          </p>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
