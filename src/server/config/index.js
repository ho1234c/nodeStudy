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
            host: 'localhost',
            port: 6379
        }
    }
};

const api = {
    api: {
        melon: {},
        youtube: {
            key: "AIzaSyAYJcoUSoEpehRGo-0XYHd4zafkiSmt9Wk",
            url: "https://www.googleapis.com/youtube/v3/search?"
        },
        facebook: {
            clientID: "236204970147380",
            clientSecret: "5c07935753459e77497e898b23361dfd"
        }
    }
};

export default _.merge(config, database, api);