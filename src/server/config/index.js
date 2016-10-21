import _ from 'lodash';

const config = {
    port: process.env.PORT || 8000,
    cwd: process.cwd(),
    path: {
        public: process.cwd() + '/public'
    },

};

const database = {
    localhost: {
        uri: 'postgres://postgres:1234@localhost:5432/withSong_v2',
    },
    production: {
        uri: '',
    },
    redis: {
        secretKey: 'abcdefg123456',
        host: 'localhost',
        port: 6379
    }
};

const api = {
    melon: {},
    youtube: {
        key: "AIzaSyAYJcoUSoEpehRGo-0XYHd4zafkiSmt9Wk",
        url: "https://www.googleapis.com/youtube/v3/search?"
    }
};

export default _.merge(config, database, api);