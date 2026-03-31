import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <h3>Grand Horizon Hotel</h3>
          <p>Where elegance, comfort, and unforgettable stays come together.</p>
        </div>
        <div className="footer-links">
          <Link to="/rooms">Rooms</Link>
          <Link to="/booking">Booking</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div className="social-links">
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            Instagram
          </a>
          <a href="https://facebook.com" target="_blank" rel="noreferrer">
            Facebook
          </a>
          <a href="https://x.com" target="_blank" rel="noreferrer">
            X
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
