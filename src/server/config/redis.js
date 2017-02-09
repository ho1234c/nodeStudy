import session from 'express-session'
import redis from 'redis';
import connectRedis from 'connect-redis'
import config from '.';

export default function(app) {
    const host = config.db.redis.REDIS_HOST;
    const port = config.db.redis.PORT;
    
    const redisStore = connectRedis(session);
    const redisClient = redis.createClient(port, host);

    redisClient.on('connect', () => {
        console.log('Running Redis successfully');
    }).on('error', (err) => {
        console.log(err);
    });

    app.use(session({
        secret: config.db.redis.REDIS_SECRETKEY,
        store: new redisStore({
            host: host,
            port: port,
            client: redisClient,
        }),
        saveUninitialized: false,
        resave: true
    }));
}


