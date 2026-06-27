import React, { useState, useEffect } from 'react'
import Event from '../components/Event'
import EventsAPI from '../services/EventsAPI'
import LocationsAPI from '../services/LocationsAPI'
import '../css/LocationEvents.css'

const Events = () => {
    const [events, setEvents] = useState([])
    const [locations, setLocations] = useState([])
    const [selectedLocation, setSelectedLocation] = useState('all')
    const [sortOrder, setSortOrder] = useState('asc')

    useEffect(() => {
        (async () => {
            try {
                const [eventsData, locationsData] = await Promise.all([
                    EventsAPI.getAllEvents(),
                    LocationsAPI.getAllLocations()
                ])
                setEvents(eventsData)
                setLocations(locationsData)
            } catch (error) {
                console.error('Error loading events:', error)
            }
        })()
    }, [])

    const filteredEvents = events
        .filter(event => selectedLocation === 'all' || event.location_id === parseInt(selectedLocation, 10))
        .sort((a, b) => {
            const dateA = new Date(a.remaining)
            const dateB = new Date(b.remaining)
            return sortOrder === 'asc' ? dateA - dateB : dateB - dateA
        })

    return (
        <div className='location-events all-events-page'>
            <header>
                <div className='location-info'>
                    <h2>All Events at UnityGrid Plaza</h2>
                    <p>Browse upcoming and past events across all venues.</p>
                </div>
            </header>

            <div className='events-filters'>
                <label>
                    Filter by location
                    <select
                        value={selectedLocation}
                        onChange={(e) => setSelectedLocation(e.target.value)}
                    >
                        <option value='all'>All locations</option>
                        {locations.map(location => (
                            <option key={location.id} value={location.id}>
                                {location.name}
                            </option>
                        ))}
                    </select>
                </label>

                <label>
                    Sort by date
                    <select
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                    >
                        <option value='asc'>Soonest first</option>
                        <option value='desc'>Latest first</option>
                    </select>
                </label>
            </div>

            <main>
                {
                    filteredEvents.length > 0 ? filteredEvents.map((event) =>
                        <div key={event.id} className='event-with-location'>
                            <p className='event-location-label'>{event.location_name}</p>
                            <Event
                                id={event.id}
                                title={event.title}
                                date={event.date}
                                time={event.time}
                                image={event.image}
                            />
                        </div>
                    ) : <h2><i className="fa-regular fa-calendar-xmark fa-shake"></i> No events match your filters.</h2>
                }
            </main>
        </div>
    )
}

export default Events
