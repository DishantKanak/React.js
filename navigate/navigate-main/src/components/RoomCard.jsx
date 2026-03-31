import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

function RoomCard({ room }) {
  const MotionArticle = motion.article
  const navigate = useNavigate()

  return (
    <MotionArticle
      className="room-card"
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
    >
      <img src={room.image} alt={room.name} />
      <div className="room-card-body">
        <h3>{room.name}</h3>
        <p>{room.description}</p>
        <div className="room-meta">
          <span>${room.price}/night</span>
          <span>Up to {room.guests} guests</span>
        </div>
        <button onClick={() => navigate(`/booking?room=${encodeURIComponent(room.name)}`)}>
          Book Now
        </button>
      </div>
    </MotionArticle>
  )
}

export default RoomCard
