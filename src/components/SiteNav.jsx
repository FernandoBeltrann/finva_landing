import { Link, useLocation } from 'react-router-dom'

function ExternalArrowIcon() {
  return (
    <svg
      className="nav-external-icon"
      width="18"
      height="18"
      viewBox="0 0 16 16"
      aria-hidden="true"
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M 5 11 L 11 5 M 11 5 L 7 5 M 11 5 L 11 9"
      />
    </svg>
  )
}

export default function SiteNav() {
  const { pathname } = useLocation()
  const sectionHref = (id) => (pathname === '/' ? `#${id}` : `/#${id}`)

  return (
    <nav className="nav">
      <Link to="/" className="brand" aria-label="Finva — inicio">
        <img
          className="brand-logo"
          src="/finva-logo.png"
          alt=""
          decoding="async"
        />
      </Link>

      <div className="nav-links">
        <a href={sectionHref('que-es')}>Qué es</a>
        <a href={sectionHref('para-quien')}>Para quién</a>
        <a href={sectionHref('contacto')}>Contacto</a>
        <a
          className="nav-link-external"
          href="https://app.finva-app.com/landing-web"
          target="_blank"
          rel="noopener noreferrer"
          title="Se abre en una nueva pestaña, fuera de este sitio"
        >
          <span>Obtén tu crédito con Finva</span>
          <ExternalArrowIcon />
        </a>
      </div>
    </nav>
  )
}
