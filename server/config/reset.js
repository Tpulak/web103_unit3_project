import { pool } from './database.js'

const createLocationsTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS locations (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            address VARCHAR(255),
            city VARCHAR(255),
            state VARCHAR(50),
            zip VARCHAR(20),
            image TEXT
        );
    `

    try {
        await pool.query(query)
        console.log('locations table created successfully')
    } catch (err) {
        console.error('error creating locations table', err)
    }
}

const createEventsTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS events (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            date VARCHAR(50),
            time VARCHAR(50),
            image TEXT,
            location_id INTEGER REFERENCES locations(id) ON DELETE CASCADE,
            remaining TIMESTAMP NOT NULL
        );
    `

    try {
        await pool.query(query)
        console.log('events table created successfully')
    } catch (err) {
        console.error('error creating events table', err)
    }
}

const seedLocations = async () => {
    const query = `
        INSERT INTO locations (name, address, city, state, zip, image)
        VALUES
            ('Echo Lounge & Music Hall', '1323 N Stemmons Fwy', 'Dallas', 'TX', '75207', 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800'),
            ('House of Blues Dallas', '2200 N Lamar St', 'Dallas', 'TX', '75202', 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800'),
            ('Dos Equis Pavilion', '1818 First Ave', 'Dallas', 'TX', '75210', 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800'),
            ('American Airlines Center', '2500 Victory Ave', 'Dallas', 'TX', '75219', 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800');
    `

    try {
        await pool.query('DELETE FROM events')
        await pool.query('DELETE FROM locations')
        await pool.query('ALTER SEQUENCE locations_id_seq RESTART WITH 1')
        await pool.query('ALTER SEQUENCE events_id_seq RESTART WITH 1')
        await pool.query(query)
        console.log('locations seeded successfully')
    } catch (err) {
        console.error('error seeding locations', err)
    }
}

const seedEvents = async () => {
    const query = `
        INSERT INTO events (title, date, time, image, location_id, remaining)
        VALUES
            ('Indie Night Live', '2026-07-15', '20:00:00', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800', 1, '2026-07-15 20:00:00'),
            ('Jazz & Soul Session', '2026-08-02', '19:30:00', 'https://images.unsplash.com/photo-1415201364774-f6f0ff35a28d?w=800', 1, '2026-08-02 19:30:00'),
            ('Acoustic Unplugged', '2025-12-10', '21:00:00', 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800', 1, '2025-12-10 21:00:00'),

            ('Blues Rock Revival', '2026-07-20', '19:00:00', 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800', 2, '2026-07-20 19:00:00'),
            ('Gospel Brunch Sunday', '2026-07-27', '11:00:00', 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800', 2, '2026-07-27 11:00:00'),
            ('Southern Rock Night', '2025-11-15', '20:30:00', 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800', 2, '2025-11-15 20:30:00'),

            ('Summer Concert Series', '2026-08-10', '18:30:00', 'https://images.unsplash.com/photo-1429962710881-269aa314048?w=800', 3, '2026-08-10 18:30:00'),
            ('Country Under the Stars', '2026-09-05', '19:00:00', 'https://images.unsplash.com/photo-1514320291840-755a9dfa9ece?w=800', 3, '2026-09-05 19:00:00'),
            ('Pop Festival Kickoff', '2025-10-20', '17:00:00', 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800', 3, '2025-10-20 17:00:00'),

            ('Mavs Game Day Party', '2026-07-18', '18:00:00', 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800', 4, '2026-07-18 18:00:00'),
            ('Stars Hockey Fan Fest', '2026-08-22', '17:30:00', 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800', 4, '2026-08-22 17:30:00'),
            ('Championship Concert', '2025-09-12', '20:00:00', 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800', 4, '2025-09-12 20:00:00');
    `

    try {
        await pool.query(query)
        console.log('events seeded successfully')
    } catch (err) {
        console.error('error seeding events', err)
    }
}

const reset = async () => {
    await createLocationsTable()
    await createEventsTable()
    await seedLocations()
    await seedEvents()
    await pool.end()
}

reset()
