import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AnimatedSection from '../components/AnimatedSection'

function ContactPage() {
  const navigate = useNavigate()
  const [submitted, setSubmitted] = useState(false)

  const onSubmit = (event) => {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <AnimatedSection className="container section">
      <h1 className="page-title">Contact Us</h1>
      <p className="page-subtitle">
        Reach out for reservations, events, airport transfers, or personalized stay planning. Our
        team replies quickly.
      </p>
      <div className="contact-grid">
        <form className="form-card" onSubmit={onSubmit}>
          <label>
            Name
            <input required />
          </label>
          <label>
            Email
            <input type="email" required />
          </label>
          <label>
            Message
            <textarea rows="4" required />
          </label>
          <button className="btn primary full" type="submit">
            Send Message
          </button>
          {submitted && <p className="success-text">Thanks, we will get back to you soon.</p>}
        </form>
        <div className="map-placeholder">
          <h3>Hotel Location</h3>
          <p>Map placeholder - add your preferred map provider embed here.</p>
          <p className="muted-line">Central City District, Grand Avenue, Tower 9</p>
          <button className="btn ghost" type="button" onClick={() => navigate('/booking')}>
            Book From Here
          </button>
        </div>
      </div>
    </AnimatedSection>
  )
}

export default ContactPage
