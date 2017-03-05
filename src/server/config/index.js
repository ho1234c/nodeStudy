import _ from 'lodash';
import fs from 'fs';

const currentENV = process.env.NODE_ENV.trim(); // trim() is for windows
const ENV = _setENV();

const info = {
    port: ENV.PORT || 8000,
    env: currentENV,   
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

function _setENV() {
    let result = {};

    if (currentENV == 'localhost') {
        fs.readFileSync('./.dev.env').toString().split('\n').forEach(line => {
            const lines = line.split('=');
            result[lines[0]] = lines[1].replace(/(\r\n|\n|\r)/gm, "");;
        });
    }
    else if (currentENV == 'production') {
        result = process.env;
    }

    return result
}

export default _.merge(info, database, api);