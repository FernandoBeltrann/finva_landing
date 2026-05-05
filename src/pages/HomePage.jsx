import { useState } from 'react'
import SiteNav from '../components/SiteNav'
import SiteFooter from '../components/SiteFooter'

/** Si está definido, el formulario usa Formspree en lugar de FormSubmit. */
const FORMSPREE_URL = (import.meta.env.VITE_FORMSPREE_ENDPOINT || '').trim()
/** Destino del correo vía FormSubmit (AJAX). */
const FORM_SUBMIT_EMAIL = (
  import.meta.env.VITE_CONTACT_FORM_EMAIL || 'notificaciones@finva-app.com'
).trim()

const partnerTypes = ['Marca', 'Distribuidor', 'Financiera', 'Otro']

const benefits = [
  {
    title: 'Convierte leads en ventas reales.',
    text: 'Gestionamos el interés de tus clientes digitales en un solo lugar y damos seguimiento con claridad.',
  },
  {
    title: 'A cada cliente su mejor opción',
    text: 'Alineamos lo que busca el cliente con lo que busca aprobar y colocar cada financiera.',
  },
  {
    title: 'Menos fricción, más conversiones.',
    text: 'Facilita el proceso desde el primer contacto hasta el cierre de la venta.',
  },
]

const audiences = [
  {
    title: 'Para marcas',
    text: 'Conecta tu oferta con distribuidores y financieras para generar más oportunidades reales de venta.'
  },
  {
    title: 'Para distribuidores',
    text: 'Convierte más clientes potenciales en ventas a crédito.',
  },
  {
    title: 'Para financieras',
    text: 'Coloca tus productos a través de una red de distribuidores con demanda activa.',
  },
]

export default function HomePage() {
  const [status, setStatus] = useState('idle')
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    partnerType: 'Marca',
    message: '',
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus('loading')

    try {
      let response

      if (FORMSPREE_URL) {
        response = await fetch(FORMSPREE_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            nombre: formData.name,
            empresa: formData.company,
            correo: formData.email,
            telefono: formData.phone,
            tipo: formData.partnerType,
            mensaje: formData.message,
          }),
        })
      } else {
        const url = `https://formsubmit.co/ajax/${encodeURIComponent(FORM_SUBMIT_EMAIL)}`
        response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            _subject: `Landing Finva — ${formData.name} (${formData.company})`,
            _replyto: formData.email,
            _captcha: 'false',
            nombre: formData.name,
            empresa: formData.company,
            correo: formData.email,
            telefono: formData.phone || '—',
            tipo_de_aliado: formData.partnerType,
            mensaje: formData.message,
          }),
        })
      }

      const data = await response.json().catch(() => ({}))

      if (!response.ok) {
        const msg =
          (typeof data.error === 'string' && data.error) ||
          (typeof data.message === 'string' && data.message) ||
          'No se pudo enviar el formulario'
        throw new Error(msg)
      }

      setStatus('success')
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        partnerType: 'Marca',
        message: '',
      })
    } catch (error) {
      console.error(error)
      setStatus('error')
    }
  }

  return (
    <div className="page-shell">
      <header className="hero">
        <SiteNav />

        <section className="hero-content">
          <div className="hero-copy">
            <p className="eyebrow">Impulsando la venta de motocicletas a crédito</p>
            <h1>
            Conecta a tus clientes con el crédito que sí pueden obtener.
            </h1>
            <p className="hero-text">
            Convertimos interesados en clientes aprobados y ventas reales, conectando a distribuidores y marcas de motocicletas con las financieras adecuadas.
            </p>

            <div className="hero-actions">
              <a className="button button-primary" href="#contacto">
                Quiero contactar a Finva
              </a>
              <a className="button button-secondary" href="#que-es">
                Conocer más
              </a>
            </div>
          </div>

          <div className="hero-card">
            <div className="hero-card-top">
              <span className="pill">Finva</span>
              <span className="dot-grid" aria-hidden="true">
                • • •
              </span>
            </div>
            <h2>Cómo funciona Finva</h2>
            <ol>
              <li>Captamos el interés del cliente (AI assisted)</li>
              <li>Evaluamos sus mejores opciones de financiamiento</li>
              <li>Conectamos con la financiera adecuada</li>
              <li>Te ayudamos a cerrar la venta</li>
            </ol>
            </div>
        </section>
      </header>

      <main>
        <section className="section" id="que-es">
          <div className="section-heading">
            <p className="section-label">Qué es Finva</p>
            <h2>Broker digital de créditos para motocicletas</h2>
            <p>
              Nuestra misión es ayudar a los clientes a conseguir el mejor crédito para que SI puedan comprar la motocicleta que desean,
              a los distribuidores a vender más motocicletas y a las financieras a colocar más créditos.
            </p>
          </div>

          <div className="info-grid">
            {benefits.map((item) => (
              <article className="info-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section section-soft" id="para-quien">
          <div className="section-heading">
            <p className="section-label">Para quién</p>
            <h2>Una sola plataforma para todos los que hacen posible la venta</h2>
            <p>
            Finva conecta a marcas, distribuidores y financieras en un mismo flujo, 
            facilitando la colocación de crédito y el cierre de ventas.
            </p>
          </div>

          <div className="audience-grid">
            {audiences.map((item) => (
              <article className="audience-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section contact-section" id="contacto">
          <div className="contact-copy">
            <p className="section-label">Contacto</p>
            <h2>Trabajemos juntos</h2>
            <p>
              Si eres una marca, distribuidor, financiera o posible aliado, puedes
              escribirnos:
            </p>
            <div className="contact-note">
              Al enviar el formulario, tus datos se envían por correo a nuestro equipo. 
              Te responderemos al correo que nos indiques.
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="field-grid">
              <label>
                Nombre
                <input
                  type="text"
                  name="name"
                  placeholder="Tu nombre"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Empresa
                <input
                  type="text"
                  name="company"
                  placeholder="Nombre de tu empresa"
                  value={formData.company}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>

            <div className="field-grid">
              <label>
                Correo
                <input
                  type="email"
                  name="email"
                  placeholder="correo@empresa.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Teléfono
                <input
                  type="tel"
                  name="phone"
                  placeholder="Tu teléfono"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </label>
            </div>

            <label>
              Tipo de aliado
              <select
                name="partnerType"
                value={formData.partnerType}
                onChange={handleChange}
              >
                {partnerTypes.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Mensaje
              <textarea
                name="message"
                rows="5"
                placeholder="Cuéntanos qué tipo de alianza te interesa explorar"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </label>

            <button className="button button-primary submit-button" type="submit">
              {status === 'loading' ? 'Enviando...' : 'Enviar mensaje'}
            </button>

            {status === 'success' && (
              <p className="form-message success">
                Gracias. Tu mensaje fue enviado; nos pondremos en contacto pronto.
              </p>
            )}

            {status === 'error' && (
              <p className="form-message error">
                Hubo un problema al enviar el formulario. Intenta de nuevo.
              </p>
            )}
          </form>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
