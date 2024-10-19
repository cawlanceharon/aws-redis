
# Redis Node.js Express App

This is a sample Node.js application using Express.js and Redis, with AWS ElastiCache as the Redis backend. The app demonstrates caching API responses using Redis.

## Setup

### Prerequisites
- Node.js
- Yarn
- AWS ElastiCache Redis Cluster

### Install Dependencies
```bash
yarn install
```

### Run the App
```bash
yarn start
```

### Endpoints
- `/data/:key` - Returns data for the provided key, caches it for subsequent requests.

## Environment Variables
Create a `.env` file in the root of the project:
```bash
REDIS_HOST=your-redis-endpoint
REDIS_PORT=6379
```
