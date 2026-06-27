import { pool } from '../config/database.js'

const getAllEvents = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT events.*, locations.name AS location_name
            FROM events
            JOIN locations ON events.location_id = locations.id
            ORDER BY events.remaining ASC
        `)
        res.json(result.rows)
    } catch (err) {
        console.error('error getting events', err)
        res.status(500).json({ error: 'Failed to fetch events' })
    }
}

const getEventById = async (req, res) => {
    try {
        const { id } = req.params
        const result = await pool.query('SELECT * FROM events WHERE id = $1', [id])

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Event not found' })
        }

        res.json(result.rows[0])
    } catch (err) {
        console.error('error getting event', err)
        res.status(500).json({ error: 'Failed to fetch event' })
    }
}

const getEventsByLocation = async (req, res) => {
    try {
        const { location_id } = req.params
        const result = await pool.query(
            'SELECT * FROM events WHERE location_id = $1 ORDER BY remaining ASC',
            [location_id]
        )
        res.json(result.rows)
    } catch (err) {
        console.error('error getting events by location', err)
        res.status(500).json({ error: 'Failed to fetch events for location' })
    }
}

export default {
    getAllEvents,
    getEventById,
    getEventsByLocation
}
