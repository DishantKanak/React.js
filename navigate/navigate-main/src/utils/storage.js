const BOOKING_KEY = 'hotel_booking_details'
const PAYMENT_KEY = 'hotel_payment_details'

export function saveBooking(booking) {
  localStorage.setItem(BOOKING_KEY, JSON.stringify(booking))
}

export function getBooking() {
  const raw = localStorage.getItem(BOOKING_KEY)
  return raw ? JSON.parse(raw) : null
}

export function savePayment(payment) {
  localStorage.setItem(PAYMENT_KEY, JSON.stringify(payment))
}

export function getPayment() {
  const raw = localStorage.getItem(PAYMENT_KEY)
  return raw ? JSON.parse(raw) : null
}
