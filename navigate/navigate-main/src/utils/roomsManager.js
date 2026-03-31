import { rooms as defaultRooms } from '../data/rooms'

const ADMIN_ROOMS_KEY = 'hotel_admin_rooms'

export function getAdminRooms() {
  const raw = localStorage.getItem(ADMIN_ROOMS_KEY)
  if (!raw) return []
  try {
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function getAllRooms() {
  return [...defaultRooms, ...getAdminRooms()]
}

export function addAdminRoom(room) {
  const next = [...getAdminRooms(), room]
  localStorage.setItem(ADMIN_ROOMS_KEY, JSON.stringify(next))
  return next
}
