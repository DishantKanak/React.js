import { motion } from 'framer-motion'
import { Navigate, useNavigate } from 'react-router-dom'
import AnimatedSection from '../components/AnimatedSection'
import { getBooking, getPayment } from '../utils/storage'

function ConfirmationPage() {
  const MotionDiv = motion.div
  const navigate = useNavigate()
  const booking = getBooking()
  const payment = getPayment()

  if (!booking) {
    return <Navigate to="/booking" replace />
  }

  return (
    <AnimatedSection className="container section">
      <div className="confirmation-card">
        <MotionDiv
          className="checkmark"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 220, damping: 12 }}
        >
          ✓
        </MotionDiv>
        <h1>Booking Confirmed</h1>
        <p>Your reservation is confirmed. A summary is shown below.</p>
        <div className="details-grid">
          <p>
            <strong>Guest:</strong> {booking.name}
          </p>
          <p>
            <strong>Email:</strong> {booking.email}
          </p>
          <p>
            <strong>Room:</strong> {booking.roomType}
          </p>
          <p>
            <strong>Check-in:</strong> {booking.checkIn}
          </p>
          <p>
            <strong>Check-out:</strong> {booking.checkOut}
          </p>
          <p>
            <strong>Guests:</strong> {booking.guests}
          </p>
          {payment && (
            <p>
              <strong>Card:</strong> **** **** **** {payment.last4}
            </p>
          )}
        </div>
        <div className="hero-cta">
          <button className="btn primary" onClick={() => navigate('/invoice')}>
            View Invoice
          </button>
          <button className="btn ghost" onClick={() => navigate('/rooms')}>
            Explore More Rooms
          </button>
        </div>
      </div>
    </AnimatedSection>
  )
}

export default ConfirmationPage
