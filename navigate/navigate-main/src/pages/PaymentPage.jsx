import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import AnimatedSection from '../components/AnimatedSection'
import { getBooking, savePayment } from '../utils/storage'

function PaymentPage() {
  const MotionSpan = motion.span
  const navigate = useNavigate()
  const booking = getBooking()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    cardName: '',
  })

  const onChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const onSubmit = (event) => {
    event.preventDefault()
    if (!booking) {
      navigate('/booking')
      return
    }
    setLoading(true)
    setTimeout(() => {
      savePayment({
        last4: form.cardNumber.slice(-4),
        paidAt: new Date().toISOString(),
      })
      setLoading(false)
      navigate('/confirmation')
    }, 1800)
  }

  return (
    <AnimatedSection className="container section">
      <h1 className="page-title">Payment</h1>
      <p className="page-subtitle">
        Final step before confirmation. This demo form simulates a secure payment flow and redirects
        automatically after processing.
      </p>
      <div className="split-grid">
        <form className="form-card" onSubmit={onSubmit}>
          <label>
            Card Number
            <input
              name="cardNumber"
              value={form.cardNumber}
              onChange={onChange}
              minLength={16}
              maxLength={16}
              required
            />
          </label>
          <label>
            Expiry
            <input name="expiry" placeholder="MM/YY" value={form.expiry} onChange={onChange} required />
          </label>
          <label>
            CVV
            <input name="cvv" value={form.cvv} onChange={onChange} minLength={3} maxLength={4} required />
          </label>
          <label>
            Name on Card
            <input name="cardName" value={form.cardName} onChange={onChange} required />
          </label>
          <button type="submit" className="btn primary full" disabled={loading}>
            {loading ? (
              <span className="loader-wrap">
                <MotionSpan
                  className="loader"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, ease: 'linear' }}
                />
                Processing Payment...
              </span>
            ) : (
              'Pay Now'
            )}
          </button>
        </form>
        <div className="info-card booking-help">
          <h3>Secure Checkout Promise</h3>
          <ul>
            <li>Transaction is simulated for this project demo.</li>
            <li>Your booking information is stored in localStorage only.</li>
            <li>No real amount is charged from any card.</li>
            <li>After payment you are redirected to confirmation page.</li>
          </ul>
        </div>
      </div>
    </AnimatedSection>
  )
}

export default PaymentPage
