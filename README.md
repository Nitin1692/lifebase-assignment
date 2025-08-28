A mini real-time cricket scoreboard built with NestJS, MongoDB, Redis, Socket.IO for the backend and Next.js with React for the frontend. Users can start matches, add ball-by-ball commentary, and view live updates.

## Tech Stack

Backend: NestJS, TypeScript, MongoDB, Redis, Socket.IO

Frontend: Next.js, React, TypeScript, inline CSS

Real-Time Communication: WebSocket via Socket.IO

## Prerequisites

Node.js >= 18.x

npm or yarn

MongoDB instance (local or cloud)


Setup Instructions
1. Clone the repository
```bash
git clone https://github.com/Nitin1692/lifebase-assignment.git
cd lifebase-assignment/backend
```

2. Backend Setup (NestJS)
```bash
npm install
```


Run backend
```bash
npm run start:dev
```


Backend runs on http://localhost:4000

REST API endpoints:

POST /matches/start – Start a new match

POST /matches/:id/commentary – Add commentary

GET /matches/:id – Get match details

GET /matches – Get all matches

WebSocket endpoint: ws://localhost:4000 (Socket.IO)

3. Frontend Setup (Next.js)
```bash
cd frontend
npm install
```

Run frontend
```bash
npm run dev
```


Frontend runs on http://localhost:3000

Pages:

/ – List of ongoing matches

/match/[id] – Live commentary for a match

4. Usage

Start the backend (npm run start:dev)

Start the frontend (npm run dev)

Open http://localhost:3000

Start a new match via API or frontend

Add ball-by-ball commentary using API

Commentary updates appear in real-time on the frontend