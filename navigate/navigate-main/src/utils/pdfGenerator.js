import jsPDF from 'jspdf'

export function generateInvoicePdf(booking) {
  const pdf = new jsPDF()
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

  pdf.setFont('helvetica', 'bold')
  pdf.setFontSize(22)
  pdf.text('Grand Horizon Hotel', 20, 20)
  pdf.setFont('helvetica', 'normal')
  pdf.setFontSize(12)
  pdf.text('Luxury Stay Invoice', 20, 30)
  pdf.text(`Invoice Date: ${new Date().toLocaleDateString()}`, 20, 38)

  pdf.line(20, 42, 190, 42)

  let y = 52
  const rows = [
    ['Guest Name', booking.name],
    ['Email', booking.email],
    ['Room Type', booking.roomType],
    ['Check-in', booking.checkIn],
    ['Check-out', booking.checkOut],
    ['Guests', String(booking.guests)],
    ['Nightly Rate', `$${Number(booking.roomPrice || 0).toFixed(2)}`],
    ['Nights', String(nights)],
  ]

  rows.forEach(([label, value]) => {
    pdf.setFont('helvetica', 'bold')
    pdf.text(`${label}:`, 20, y)
    pdf.setFont('helvetica', 'normal')
    pdf.text(value, 60, y)
    y += 8
  })

  y += 6
  pdf.line(20, y, 190, y)
  y += 10
  pdf.setFont('helvetica', 'bold')
  pdf.text(`Subtotal: $${subtotal.toFixed(2)}`, 20, y)
  y += 8
  pdf.text(`Tax (10%): $${tax.toFixed(2)}`, 20, y)
  y += 8
  pdf.setFontSize(14)
  pdf.text(`Total: $${total.toFixed(2)}`, 20, y)

  pdf.save(`hotel-invoice-${booking.name.toLowerCase().replace(/\s+/g, '-')}.pdf`)
}
