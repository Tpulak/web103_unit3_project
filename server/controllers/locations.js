import { pool } from '../config/database.js'

const getAllLocations = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM locations ORDER BY id')
        res.json(result.rows)
    } catch (err) {
        console.error('error getting locations', err)
        res.status(500).json({ error: 'Failed to fetch locations' })
    }
}

const getLocationById = async (req, res) => {
    try {
        const { id } = req.params
        const result = await pool.query('SELECT * FROM locations WHERE id = $1', [id])

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Location not found' })
        }

        res.json(result.rows[0])
    } catch (err) {
        console.error('error getting location', err)
        res.status(500).json({ error: 'Failed to fetch location' })
    }
}

export default {
    getAllLocations,
    getLocationById
}
