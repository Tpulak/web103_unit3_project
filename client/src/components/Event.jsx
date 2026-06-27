import React, { useState, useEffect } from 'react'
import EventsAPI from '../services/EventsAPI'
import dates from '../helpers/dates'
import '../css/Event.css'

const Event = (props) => {

    const [event, setEvent] = useState({})
    const [time, setTime] = useState('')
    const [remaining, setRemaining] = useState('')

    useEffect(() => {
        (async () => {
            try {
                const eventData = await EventsAPI.getEventsById(props.id)
                setEvent(eventData)
            }
            catch (error) {
                console.error('Error loading event:', error)
            }
        })()
    }, [props.id])

    useEffect(() => {
        if (event.time) {
            setTime(dates.formatTime(event.time))
        }
    }, [event])

    useEffect(() => {
        if (event.remaining) {
            const timeRemaining = dates.formatRemainingTime(event.remaining)
            setRemaining(timeRemaining)
            dates.formatNegativeTimeRemaining(timeRemaining, event.id)
        }
    }, [event])

    const isPastEvent = remaining.startsWith('Event passed')

    return (
        <article className={`event-information ${isPastEvent ? 'past-event' : ''}`}>
            <img src={event.image} alt={event.title} />

            <div className='event-information-overlay'>
                <div className='text'>
                    <h3 className={isPastEvent ? 'crossed-out' : ''}>{event.title}</h3>
                    <p><i className="fa-regular fa-calendar fa-bounce"></i> {event.date} <br /> {time}</p>
                    <p id={`remaining-${event.id}`}>{remaining}</p>
                </div>
            </div>
        </article>
    )
}

export default Event
