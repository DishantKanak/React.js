import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/rooms', label: 'Rooms' },
  { to: '/booking', label: 'Booking' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-inner">
        <button type="button" className="brand brand-btn" onClick={() => navigate('/')}>
          Grand Horizon
        </button>
        <button
          type="button"
          className="menu-toggle"
          aria-label="Open navigation menu"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? 'Close' : 'Menu'}
        </button>
        <nav className={`nav-links ${open ? 'open' : ''}`}>
          {navItems.map((item) => (
            <button
              key={item.to}
              type="button"
              className={location.pathname === item.to ? 'active' : ''}
              onClick={() => {
                navigate(item.to)
                setOpen(false)
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default Navbar
