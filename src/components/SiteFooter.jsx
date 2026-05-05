import { useLocation } from 'react-router-dom'

export default function SiteFooter() {
  const { pathname } = useLocation()
  const contactHref = pathname === '/' ? '#contacto' : '/#contacto'

  return (
    <footer className="footer">
      <div>
        <strong>Finva</strong>
        <p>Conectamos a tus clientes digitales con el crédito que sí pueden obtener.</p>
      </div>
      <a href={contactHref}>Contactar</a>
    </footer>
  )
}
