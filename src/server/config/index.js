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
            WITHSONG_DB: ENV.WITHSONG_DB,
            POSTGRES_USER: ENV.POSTGRES_USER,
            POSTGRES_PASSWARD: ENV.POSTGRES_PASSWARD,
        },
        redis: {
            secretKey: 'abcdefg123456',
            host: ENV.REDIS_HOST,
            port: 6379
        }
    }
};

const api = {
    api: {
        melon: {},
        youtube: {
            key: ENV.YOUTUBE_KEY,
            url: "https://www.googleapis.com/youtube/v3/search?"
        },
        facebook: {
            clientID: ENV.FACEBOOK_CLIENT_ID,
            clientSecret: ENV.FACEBOOK_CLIENT_SECRET
        }
    }
};

export default _.merge(config, database, api);