# WEB103 Project 3 - UnityGrid Plaza

Submitted by: **Tsnvir Pulak**

About this web app: **UnityGrid Plaza is a virtual community space for exploring live events across four Dallas venues. Users click interactive regions on a map to view venue details and upcoming or past events, with countdown timers and filtering on a dedicated Events page.**

Time spent: **X** hours *(update before submitting)*

## Overview

UnityGrid Plaza helps users discover things to do at four locations in the Dallas entertainment district:

| Venue | Route |
|-------|-------|
| Echo Lounge & Music Hall | `/echolounge` |
| House of Blues Dallas | `/houseofblues` |
| Dos Equis Pavilion | `/pavilion` |
| American Airlines Center | `/americanairlines` |

The app uses a **React** frontend, an **Express** REST API, and a **PostgreSQL** database hosted on **Render**.

## Tech Stack

- **Frontend:** React, React Router, Vite, Pico CSS
- **Backend:** Node.js, Express
- **Database:** PostgreSQL (Render)
- **Deployment:** Render (database + optional web service)

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- A Render PostgreSQL database
- Git

### Installation

```bash
git clone https://github.com/Tpulak/web103_unit3_project.git
cd web103_unit3_project
npm install
```

### Environment Variables

Create a file at `server/.env` with your Render Postgres credentials:

```env
PGUSER="your_username"
PGPASSWORD="your_password"
PGHOST="your-host.oregon-postgres.render.com"
PGPORT=5432
PGDATABASE="your_database_name"
```

Use the **External Database URL** hostname when running locally (not the internal hostname).

### Initialize the Database

```bash
npm run reset
```

This creates the `locations` and `events` tables and seeds sample data.

### Run Locally

```bash
npm run dev
```

- Frontend: http://localhost:5173
- API: http://localhost:3000/api/locations

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server and Express API |
| `npm run build` | Build React app into `server/public` |
| `npm start` | Run production server |
| `npm run reset` | Create tables and seed the database |

## API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/locations` | Get all locations |
| GET | `/api/locations/:id` | Get one location by ID |
| GET | `/api/events` | Get all events (with location name) |
| GET | `/api/events/:id` | Get one event by ID |
| GET | `/api/events/location/:location_id` | Get events for a location |

## Database Schema

**locations**

| Column | Type |
|--------|------|
| id | SERIAL PRIMARY KEY |
| name | VARCHAR(255) |
| address | VARCHAR(255) |
| city | VARCHAR(255) |
| state | VARCHAR(50) |
| zip | VARCHAR(20) |
| image | TEXT |

**events**

| Column | Type |
|--------|------|
| id | SERIAL PRIMARY KEY |
| title | VARCHAR(255) |
| date | VARCHAR(50) |
| time | VARCHAR(50) |
| image | TEXT |
| location_id | INTEGER (FK → locations) |
| remaining | TIMESTAMP |

## Project Structure

```
web103_unit3_project/
├── client/
│   └── src/
│       ├── components/     # Event card component
│       ├── helpers/        # Date/countdown formatting
│       ├── pages/          # Locations, LocationEvents, Events
│       └── services/       # API calls (fetch)
└── server/
    ├── config/             # database.js, reset.js
    ├── controllers/        # Database query logic
    ├── routes/             # Express routes
    └── server.js           # Entry point
```

## Walkthrough

### App Demo

1. Open the home page and hover over the map to see venue names.
2. Click a venue polygon to navigate to its detail page.
3. View events with countdown timers; past events show crossed-out titles and red styling.
4. Click **Events** in the header to filter by location and sort by date.

**GIF/Video walkthrough:** *(add link or embed here before submitting)*

### Render PostgreSQL Dashboard

**Screenshot:** *(add a screenshot of your Render Postgres dashboard showing the active database)*

### Database Table Contents

Connect to your Render database using the PSQL command from the Render dashboard, then run:

```sql
SELECT * FROM locations;
SELECT * FROM events;
```

**Screenshot:** *(add a screenshot showing the output of these queries)*

## Required Features

The following **required** functionality is completed:

- [x] **The web app uses React to display data from the API**
- [x] **The web app is connected to a PostgreSQL database, with an appropriately structured Events table**
  - [ ] **NOTE: Your walkthrough added to the README must include a view of your Render dashboard demonstrating that your Postgres database is available**
  - [ ] **NOTE: Your walkthrough added to the README must include a demonstration of your table contents. Use the psql command `SELECT * FROM tablename;` to display your table contents.**
- [x] **The web app displays a title.**
- [x] **Website includes a visual interface that allows users to select a location they would like to view.**
  - [x] *Note: A non-visual list of links to different locations is insufficient.*
- [x] **Each location has a detail page with its own unique URL.**
- [x] **Clicking on a location navigates to its corresponding detail page and displays list of all events from the `events` table associated with that location.**

## Optional Features

The following **optional** features are implemented:

- [x] An additional page shows all possible events
  - [x] Users can sort *or* filter events by location.
- [x] Events display a countdown showing the time remaining before that event
  - [x] Events appear with different formatting when the event has passed (ex. negative time, indication the event has passed, crossed out, etc.).

## Additional Features

- [x] Express REST API with separate controllers and routes for locations and events
- [x] Database reset/seed script (`npm run reset`) for easy setup
- [x] Responsive event cards with hover overlay and Font Awesome icons

## License

Copyright 2026 Pulak

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

> http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
