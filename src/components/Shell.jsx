import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, ArrowUpRight, ExternalLink } from 'lucide-react'
import { navLinks, whatsappNumber } from '../data'

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="site-header">
      <Link to="/" className="wordmark" onClick={() => setOpen(false)}>
        MERENE<span>COFFEE & EATERY</span>
      </Link>
      <nav className="desktop-nav" aria-label="Navigasi utama">
        {navLinks.map(([label, path]) => <NavLink key={path} to={path} end={path === '/'}>{label}</NavLink>)}
      </nav>
      <a className="header-cta" href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer">
        Hubungi Kami <ArrowUpRight size={15} aria-hidden="true" />
      </a>
      <button
        type="button"
        className="mobile-toggle"
        aria-label={open ? 'Tutup menu' : 'Buka menu'}
        aria-expanded={open}
        aria-controls="mobile-navigation"
        onClick={() => setOpen(!open)}
      >
        {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </button>
      {open && (
        <nav className="mobile-nav" id="mobile-navigation" aria-label="Navigasi mobile">
          {navLinks.map(([label, path]) => (
            <NavLink key={path} to={path} end={path === '/'} onClick={() => setOpen(false)}>{label}</NavLink>
          ))}
          <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>
            WhatsApp ↗
          </a>
        </nav>
      )}
    </header>
  )
}

export function Footer() {
  return (
    <footer className="footer">
      <div>
        <Link to="/" className="wordmark footer-mark">MERENE<span>COFFEE & EATERY</span></Link>
        <p>Ruang untuk jeda, rasa, dan cerita.</p>
      </div>
      <div className="footer-right">
        <span>Pejaten · Jakarta Selatan</span>
        <a href="https://instagram.com/merene.jkt" target="_blank" rel="noreferrer">
          <ExternalLink size={16} aria-hidden="true" /> @merene.jkt
        </a>
        <small>© {new Date().getFullYear()} Merene Coffee & Eatery</small>
      </div>
    </footer>
  )
}

export function PageIntro({ eyebrow, title, copy }) {
  return (
    <section className="page-intro">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      {copy && <p className="intro-copy">{copy}</p>}
    </section>
  )
}

export function WhatsAppLink({ children = 'Diskusikan kebutuhanmu' }) {
  return (
    <a className="button button-dark" href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer">
      {children}<ArrowUpRight size={16} aria-hidden="true" />
    </a>
  )
}
