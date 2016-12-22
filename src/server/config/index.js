import _ from 'lodash';

const config = {
    port: process.env.PORT || 8000,
    env: process.env.NODE_ENV.trim(),
    cwd: process.cwd(),
    domain: process.env.DOMAIN || 'localhost',
    path: {
        public: process.cwd() + '/public',
    },

};

const database = {
    db: {
        localhost: 'postgres://postgres:1234@localhost:5432/withSong_v2',
        production: 'postgres://postgres:1234@withsong_db:5432/withSong_v2',
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