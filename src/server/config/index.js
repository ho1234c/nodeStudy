import _ from 'lodash';

const ENV = process.env;

const config = {
    port: ENV.PORT || 8000,
    env: ENV.NODE_ENV.trim(),   // trim() is for windows
    cwd: process.cwd(),
    domain: ENV.DOMAIN || 'localhost',
    path: {
        public: process.cwd() + '/public',
    },
};

const database = {
    db: {
        postgres: {
            DB_HOST: ENV.DB_HOST,
            POSTGRES_PORT: ENV.POSTGRES_PORT,
            POSTGRES_DB: ENV.POSTGRES_DB,
            POSTGRES_USER: ENV.POSTGRES_USER,
            POSTGRES_PASSWORD: ENV.POSTGRES_PASSWORD,
        },
        redis: {
            REDIS_SECRETKEY: ENV.REDIS_SECRETKEY,
            REDIS_HOST: ENV.REDIS_HOST,
            PORT: ENV.REDIS_PORT
        }
    }
};

const api = {
    api: {
        melon: {},
        youtube: {
            key: ENV.YOUTUBE_KEY,
            url: ENV.YOUTUBE_URL
        },
        facebook: {
            clientID: ENV.FACEBOOK_CLIENT_ID,
            clientSecret: ENV.FACEBOOK_CLIENT_SECRET
        }
    }
};

export default _.merge(config, database, api);