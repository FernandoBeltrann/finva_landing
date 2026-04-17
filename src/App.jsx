import { useMemo, useState } from 'react'

const partnerTypes = [
  'Marca',
  'Distribuidor',
  'Financiera',
  'Otro',
]

const benefits = [
  {
    title: 'Más orden comercial',
    text: 'Centraliza el interés de prospectos y canaliza conversaciones con una experiencia más clara para cada aliado.',
  },
  {
    title: 'Mejor conexión entre actores',
    text: 'Finva busca alinear lo que necesita la marca, lo que vende el distribuidor y lo que puede colocar una financiera.',
  },
  {
    title: 'Experiencia digital simple',
    text: 'Menos fricción para explicar el modelo, captar interés y abrir la puerta a nuevas alianzas comerciales.',
  },
]

const audiences = [
  {
    title: 'Para marcas',
    text: 'Una vitrina digital para presentar una solución que ayude a distribuir mejor oportunidades comerciales y de financiamiento.',
  },
  {
    title: 'Para distribuidores',
    text: 'Una forma de acercarse a un modelo que busca facilitar la conexión entre venta, seguimiento y opciones de financiamiento.',
  },
  {
    title: 'Para financieras',
    text: 'Un canal para explorar afiliación con Finva y poner sus productos frente a una red comercial con intención real de colocación.',
  },
]

export default function App() {
  const [status, setStatus] = useState('idle')
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    partnerType: 'Marca',
    message: '',
  })

  const endpoint = useMemo(
    () => import.meta.env.VITE_FORMSPREE_ENDPOINT || '',
    [],
  )

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus('loading')

    try {
      if (!endpoint) {
        console.warn('No hay endpoint de formulario configurado.')
        setStatus('success')
        return
      }

      const response = await fetch(endpoint, {
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

      if (!response.ok) {
        throw new Error('No se pudo enviar el formulario')
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
        <nav className="nav">
          <div className="brand">
            <div className="brand-mark">F</div>
            <span>Finva</span>
          </div>

          <div className="nav-links">
            <a href="#que-es">Qué es</a>
            <a href="#para-quien">Para quién</a>
            <a href="#contacto">Contacto</a>
          </div>
        </nav>

        <section className="hero-content">
          <div className="hero-copy">
            <p className="eyebrow">Presencia digital para crecer alianzas</p>
            <h1>
              Finva conecta marcas, distribuidores y financieras alrededor de una
              experiencia comercial más simple.
            </h1>
            <p className="hero-text">
              Somos una plataforma enfocada en facilitar conversaciones y posibles
              alianzas entre quienes venden, quienes distribuyen y quienes ofrecen
              productos financieros. Todo con una presencia online más clara,
              moderna y confiable.
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
            <h2>Una sola presencia para abrir más puertas comerciales</h2>
            <ul>
              <li>Presenta claramente lo que hace Finva</li>
              <li>Da confianza a posibles aliados</li>
              <li>Recibe contactos de marcas, distribuidores y financieras</li>
            </ul>
          </div>
        </section>
      </header>

      <main>
        <section className="section" id="que-es">
          <div className="section-heading">
            <p className="section-label">Qué es Finva</p>
            <h2>Una forma más simple de explicar el valor de Finva online</h2>
            <p>
              Esta landing está pensada para que cualquier persona o empresa entienda
              rápidamente qué hace Finva y cómo puede iniciar una conversación con
              ustedes.
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
            <h2>Un punto de contacto para distintos tipos de aliados</h2>
            <p>
              Finva puede presentarse de manera clara frente a actores distintos,
              sin complicar el mensaje y dejando espacio para que el sitio evolucione
              con su marca en el futuro.
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
            <h2>Hablemos de una posible alianza</h2>
            <p>
              Si eres una marca, distribuidor, financiera o un posible aliado, puedes
              escribirnos desde aquí. La idea es que esta landing no solo dé presencia,
              sino que también abra conversaciones reales.
            </p>
            <div className="contact-note">
              <strong>Tip:</strong> puedes conectar este formulario con Formspree,
              Resend, Zapier, Make o tu propio backend cuando quieras crecerlo.
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
                Gracias. Tu mensaje ya quedó listo{endpoint ? ' y fue enviado' : ''}.
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

      <footer className="footer">
        <div>
          <strong>Finva</strong>
          <p>Una presencia digital clara para abrir más oportunidades comerciales.</p>
        </div>
        <a href="#contacto">Contactar</a>
      </footer>
    </div>
  )
}
