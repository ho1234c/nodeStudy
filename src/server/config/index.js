import _ from 'lodash';

const env = {
    port: process.env.PORT || 8000,
    cwd: process.cwd(),
    path: {
        public: process.cwd() + '/public'
    },

};

const db = {
    localhost: {
        uri: 'postgres://postgres:1234@localhost:5432/withSong_v2',
    },
    production: {
        uri: '',
    },
};

const api = {
    melon: {},
    youtube: {
        key: "AIzaSyAYJcoUSoEpehRGo-0XYHd4zafkiSmt9Wk",
        url: "https://www.googleapis.com/youtube/v3/search?"
    }
};

export default _.merge(env, db, api);