const getAllLocations = async () => {
    const response = await fetch('/api/locations')
    if (!response.ok) {
        throw new Error('Failed to fetch locations')
    }
    return response.json()
}

const getLocationById = async (id) => {
    const response = await fetch(`/api/locations/${id}`)
    if (!response.ok) {
        throw new Error('Failed to fetch location')
    }
    return response.json()
}

export default {
    getAllLocations,
    getLocationById
}
