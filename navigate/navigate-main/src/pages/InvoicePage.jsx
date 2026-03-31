import { Navigate, useNavigate } from 'react-router-dom'
import AnimatedSection from '../components/AnimatedSection'
import { generateInvoicePdf } from '../utils/pdfGenerator'
import { getBooking } from '../utils/storage'

function InvoicePage() {
  const navigate = useNavigate()
  const booking = getBooking()

  if (!booking) {
    return <Navigate to="/booking" replace />
  }

  const nights =
    Math.max(
      1,
      Math.ceil(
        (new Date(booking.checkOut).getTime() - new Date(booking.checkIn).getTime()) /
          (1000 * 60 * 60 * 24),
      ),
    ) || 1
  const subtotal = Number(booking.roomPrice || 0) * nights
  const tax = subtotal * 0.1
  const total = subtotal + tax

  return (
    <AnimatedSection className="container section">
      <h1 className="page-title">Invoice</h1>
      <div className="invoice-card">
        <p>
          <strong>Guest:</strong> {booking.name}
        </p>
        <p>
          <strong>Room:</strong> {booking.roomType}
        </p>
        <p>
          <strong>Stay:</strong> {booking.checkIn} to {booking.checkOut} ({nights} nights)
        </p>
        <p>
          <strong>Rate:</strong> ${Number(booking.roomPrice || 0).toFixed(2)} per night
        </p>
        <hr />
        <p>
          <strong>Subtotal:</strong> ${subtotal.toFixed(2)}
        </p>
        <p>
          <strong>Tax (10%):</strong> ${tax.toFixed(2)}
        </p>
        <p className="invoice-total">
          <strong>Total:</strong> ${total.toFixed(2)}
        </p>
        <button className="btn primary" onClick={() => generateInvoicePdf(booking)}>
          Download PDF Invoice
        </button>
        <div className="hero-cta">
          <button className="btn ghost" onClick={() => navigate('/contact')}>
            Need Billing Help?
          </button>
          <button className="btn ghost" onClick={() => navigate('/')}>
            Back to Home
          </button>
        </div>
      </div>
    </AnimatedSection>
  )
}

export default InvoicePage
