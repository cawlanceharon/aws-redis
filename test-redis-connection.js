const redis = require('redis');

const client = redis.createClient({
    socket: {
        host: 'my-redis-cluster-v8mfat.serverless.apse2.cache.amazonaws.com',
        port: 6379
    }
});

client.on('connect', () => {
    console.log('Connected to Redis');
});

client.on('error', (err) => {
    console.error('Redis connection error:', err);
});

(async () => {
    try {
        await client.connect();
    } catch (err) {
        console.error('Error during connection:', err);
    }
})();
