import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import AnimatedSection from '../components/AnimatedSection'
import RoomCard from '../components/RoomCard'
import { getAllRooms } from '../utils/roomsManager'
import { amenities, testimonials } from '../data/siteContent'

function HomePage() {
  const MotionBlockquote = motion.blockquote
  const navigate = useNavigate()
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const rooms = getAllRooms()

  useEffect(() => {
    if (isPaused) return undefined
    const intervalId = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length)
    }, 4200)
    return () => clearInterval(intervalId)
  }, [isPaused])

  const onDragEnd = (_, info) => {
    if (info.offset.x < -70 || info.velocity.x < -380) {
      setActiveIndex((prev) => (prev + 1) % testimonials.length)
    } else if (info.offset.x > 70 || info.velocity.x > 380) {
      setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    }
  }

  return (
    <>
      <section className="hero-section">
        <div className="container hero-content">
          <p className="eyebrow">Welcome to Grand Horizon</p>
          <h1>Experience Luxury Hospitality in Every Detail</h1>
          <p>
            Indulge in spacious suites, world-class service, and thoughtfully crafted spaces for
            memorable stays.
          </p>
          <div className="hero-cta">
            <button className="btn primary" onClick={() => navigate('/rooms')}>
              Explore Rooms
            </button>
            <button className="btn ghost" onClick={() => navigate('/booking')}>
              Book Your Stay
            </button>
          </div>
          <div className="hero-highlights">
            <span>4.9 Guest Rating</span>
            <span>50+ Luxury Suites</span>
            <span>Airport Pickup</span>
          </div>
        </div>
      </section>

      <AnimatedSection className="container section">
        <h2>Featured Rooms</h2>
        <div className="rooms-grid">
          {rooms.slice(0, 3).map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection className="container section" delay={0.1}>
        <h2>Luxury Amenities</h2>
        <p className="page-subtitle">
          Thoughtfully designed facilities to deliver relaxation, wellness, and memorable moments
          throughout your stay.
        </p>
        <div className="amenities-grid">
          {amenities.map((item) => (
            <article key={item.title} className="info-card">
              <div className="card-chip">{item.tag}</div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <p className="muted-line">Hours: {item.timing}</p>
            </article>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection className="container section" delay={0.2}>
        <h2>Guest Testimonials</h2>
        <p className="page-subtitle">
          Hear from travelers who chose Grand Horizon for celebrations, family trips, and premium
          business stays.
        </p>
        <div
          className="testimonial-carousel"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          <button
            type="button"
            className="carousel-btn"
            onClick={() =>
              setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
            }
          >
            ←
          </button>
          <div className="carousel-track-wrap">
            <AnimatePresence mode="wait">
              <MotionBlockquote
                key={testimonials[activeIndex].name}
                className="info-card carousel-card"
                initial={{ opacity: 0, x: 80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -80 }}
                transition={{ duration: 0.35 }}
                drag="x"
                dragElastic={0.26}
                dragMomentum
                dragTransition={{ bounceStiffness: 220, bounceDamping: 18 }}
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={onDragEnd}
              >
                <div className="rating">{'★'.repeat(testimonials[activeIndex].rating)}</div>
                <p>"{testimonials[activeIndex].quote}"</p>
                <cite>
                  - {testimonials[activeIndex].name} ({testimonials[activeIndex].stay})
                </cite>
              </MotionBlockquote>
            </AnimatePresence>
          </div>
          <button
            type="button"
            className="carousel-btn"
            onClick={() => setActiveIndex((prev) => (prev + 1) % testimonials.length)}
          >
            →
          </button>
        </div>
        <div className="carousel-dots">
          {testimonials.map((entry, index) => (
            <button
              key={entry.name}
              type="button"
              className={index === activeIndex ? 'dot active' : 'dot'}
              onClick={() => setActiveIndex(index)}
              aria-label={`Show testimonial ${index + 1}`}
            />
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection className="container section" delay={0.25}>
        <div className="cta-banner">
          <h2>Craft Your Perfect Stay</h2>
          <p>
            Choose your preferred room, add your travel dates, and complete booking in a few easy
            steps with instant confirmation.
          </p>
          <button className="btn primary" onClick={() => navigate('/booking')}>
            Start Booking Now
          </button>
        </div>
      </AnimatedSection>
    </>
  )
}

export default HomePage
