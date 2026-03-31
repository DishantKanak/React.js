import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AnimatedSection from '../components/AnimatedSection'
import RoomCard from '../components/RoomCard'
import { getAllRooms } from '../utils/roomsManager'

function RoomsPage() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [guestFilter, setGuestFilter] = useState('all')
  const [sortBy, setSortBy] = useState('default')
  const rooms = getAllRooms()

  const filteredRooms = (() => {
    let next = [...rooms]

    if (search.trim()) {
      const key = search.toLowerCase()
      next = next.filter(
        (room) =>
          room.name.toLowerCase().includes(key) || room.description.toLowerCase().includes(key),
      )
    }

    if (guestFilter !== 'all') {
      next = next.filter((room) => room.guests >= Number(guestFilter))
    }

    if (sortBy === 'price-low-high') {
      next.sort((a, b) => a.price - b.price)
    } else if (sortBy === 'price-high-low') {
      next.sort((a, b) => b.price - a.price)
    } else if (sortBy === 'name-a-z') {
      next.sort((a, b) => a.name.localeCompare(b.name))
    }

    return next
  })()

  return (
    <>
      <AnimatedSection className="container section">
        <h1 className="page-title">Our Rooms</h1>
        <p className="page-subtitle">
          Discover curated spaces designed for comfort, privacy, and refined elegance.
        </p>
        <div className="filter-bar">
          <input
            placeholder="Search room name or vibe..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <select value={guestFilter} onChange={(event) => setGuestFilter(event.target.value)}>
            <option value="all">All Guests</option>
            <option value="2">2+ Guests</option>
            <option value="3">3+ Guests</option>
            <option value="4">4+ Guests</option>
          </select>
          <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
            <option value="default">Sort: Recommended</option>
            <option value="price-low-high">Price: Low to High</option>
            <option value="price-high-low">Price: High to Low</option>
            <option value="name-a-z">Name: A to Z</option>
          </select>
        </div>
        <div className="rooms-grid">
          {filteredRooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
        {filteredRooms.length === 0 && (
          <p className="muted-line">No rooms match your current filters. Try adjusting search/sort.</p>
        )}
      </AnimatedSection>

      <AnimatedSection className="container section" delay={0.1}>
        <h2>Room Experience Includes</h2>
        <div className="amenities-grid">
          <article className="info-card">
            <h3>Private Welcome</h3>
            <p>Dedicated check-in desk, welcome beverage, and quick luggage assistance.</p>
          </article>
          <article className="info-card">
            <h3>Premium Comfort</h3>
            <p>Luxury bedding, smart controls, ambient lighting, and curated room fragrance.</p>
          </article>
          <article className="info-card">
            <h3>In-Room Dining</h3>
            <p>Chef-curated meals served around the clock with personalized preferences.</p>
          </article>
        </div>
        <div className="center-cta">
          <button className="btn primary" onClick={() => navigate('/booking')}>
            Continue to Booking
          </button>
        </div>
      </AnimatedSection>
    </>
  )
}

export default RoomsPage
