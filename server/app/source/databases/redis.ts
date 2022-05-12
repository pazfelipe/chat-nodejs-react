import * as client from 'redis';

const redis = client.createClient({
  url: 'redis://redis:6379',
});

redis.on('error', err => console.error(err));
redis.on('connect', () => console.log('Redis connected'));

redis.connect();

export default redis;