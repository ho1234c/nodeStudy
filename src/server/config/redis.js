import session from 'express-session'
import redis from 'redis';
import connectRedis from 'connect-redis'
import config from '.';

export default function (app){
    const redisStore = connectRedis(session);
    const redisClient = redis.createClient();

    redisClient.on('connect', () => {
        console.log('Running Redis successfully');
    }).on('error', () => {
        console.log('Fail to start Redis');
    });

    app.use(session({
        secret: config.redis.secretKey,
        store: new redisStore({
            host: config.redis.host,
            port: config.redis.port,
            client: redisClient,
        }),
        saveUninitialized: false,
        resave: true
    }));
}

