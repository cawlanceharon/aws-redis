
require('dotenv').config();
const express = require('express');
const redis = require('redis');

// Redis client setup
const redisClient = redis.createClient({
    socket: {
        host: process.env.REDIS_HOST, // Use Redis host from environment variables
        port: process.env.REDIS_PORT || 6379
    }
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));

// Connect to Redis
(async () => {
    await redisClient.connect();
})();

const app = express();
const port = process.env.PORT || 3000;

// Middleware to check cache
const cacheMiddleware = async (req, res, next) => {
    const { key } = req.params;
    try {
        const data = await redisClient.get(key);
        if (data) {
            return res.json({ source: 'cache', data: JSON.parse(data) });
        }
        next();
    } catch (err) {
        console.error(err);
        res.status(500).send('Redis error');
    }
};

// API Route with caching
app.get('/data/:key', cacheMiddleware, async (req, res) => {
    const { key } = req.params;
    const data = { key, value: `Some value for ${key}` };

    // Set data in Redis with an expiry (TTL) of 1 hour
    await redisClient.setEx(key, 3600, JSON.stringify(data));
    res.json({ source: 'API', data });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
