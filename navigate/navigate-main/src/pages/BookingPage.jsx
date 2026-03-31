import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import AnimatedSection from '../components/AnimatedSection'
import { getAllRooms } from '../utils/roomsManager'
import { saveBooking } from '../utils/storage'

const initialForm = {
  name: '',
  email: '',
  checkIn: '',
  checkOut: '',
  guests: 1,
  roomType: '',
}

function BookingPage() {
  const rooms = getAllRooms()
  const [searchParams] = useSearchParams()
  const roomParam = searchParams.get('room')
  const [form, setForm] = useState({ ...initialForm, roomType: roomParam ?? '' })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const selectedRoom = rooms.find((room) => room.name === form.roomType)

  const onChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const onSubmit = (event) => {
    event.preventDefault()
    if (new Date(form.checkOut) <= new Date(form.checkIn)) {
      setError('Check-out date must be after check-in date.')
      return
    }
    setError('')
    const payload = {
      ...form,
      guests: Number(form.guests),
      roomPrice: selectedRoom?.price ?? 0,
      bookingTime: new Date().toISOString(),
    }
    saveBooking(payload)
    navigate('/payment')
  }

  return (
    <>
      <AnimatedSection className="container section">
        <h1 className="page-title">Book Your Stay</h1>
        <p className="page-subtitle">
          Complete your reservation in minutes. Your details are securely saved and used for
          confirmation and invoice generation.
        </p>
        <div className="split-grid">
          <form className="form-card" onSubmit={onSubmit}>
            <label>
              Name
              <input name="name" value={form.name} onChange={onChange} required />
            </label>
            <label>
              Email
              <input name="email" type="email" value={form.email} onChange={onChange} required />
            </label>
            <label>
              Check-in
              <input name="checkIn" type="date" value={form.checkIn} onChange={onChange} required />
            </label>
            <label>
              Check-out
              <input name="checkOut" type="date" value={form.checkOut} onChange={onChange} required />
            </label>
            <label>
              Guests
              <input name="guests" type="number" min="1" max="8" value={form.guests} onChange={onChange} required />
            </label>
            <label>
              Room Type
              <select name="roomType" value={form.roomType} onChange={onChange} required>
                <option value="">Select Room Type</option>
                {rooms.map((room) => (
                  <option key={room.id} value={room.name}>
                    {room.name} (${room.price}/night)
                  </option>
                ))}
              </select>
            </label>
            <button type="submit" className="btn primary full">
              Continue to Payment
            </button>
            {error && <p className="error-text">{error}</p>}
          </form>
          <div className="info-card booking-help">
            <h3>Before You Book</h3>
            <ul>
              <li>Check-in from 2:00 PM and check-out until 11:00 AM.</li>
              <li>Early check-in available based on room readiness.</li>
              <li>Free cancellation up to 48 hours before arrival.</li>
              <li>Special requests can be added during contact confirmation.</li>
            </ul>
            {selectedRoom && (
              <p className="muted-line">Selected: {selectedRoom.name} at ${selectedRoom.price}/night</p>
            )}
          </div>
        </div>
      </AnimatedSection>
    </>
  )
}

export default BookingPage
