const getAllEvents = async () => {
    const response = await fetch('/api/events')
    if (!response.ok) {
        throw new Error('Failed to fetch events')
    }
    return response.json()
}

const getEventById = async (id) => {
    const response = await fetch(`/api/events/${id}`)
    if (!response.ok) {
        throw new Error('Failed to fetch event')
    }
    return response.json()
}

const getEventsById = async (id) => {
    return getEventById(id)
}

const getEventsByLocation = async (locationId) => {
    const response = await fetch(`/api/events/location/${locationId}`)
    if (!response.ok) {
        throw new Error('Failed to fetch events for location')
    }
    return response.json()
}

export default {
    getAllEvents,
    getEventById,
    getEventsById,
    getEventsByLocation
}
