import express from 'express'
import EventsController from '../controllers/events.js'

const router = express.Router()

router.get('/', EventsController.getAllEvents)
router.get('/location/:location_id', EventsController.getEventsByLocation)
router.get('/:id', EventsController.getEventById)

export default router
