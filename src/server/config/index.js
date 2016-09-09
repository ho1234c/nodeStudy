const environment = {
    localhost: {
        uri: 'postgres://postgres:1234@localhost/withSong_v2',
    },
    development: {
        uri: 'mongodb://localhost:27017/tested',
    },
    production: {
        uri: 'mongodb://localhost:27017/tested',
    },
};

export default environment