const environment = {
    port: process.env.PORT || 8000,
    cwd: process.cwd(),
    path: {
        public: process.cwd() + '/public'
    },
    localhost: {
        uri: 'postgres://postgres:1234@localhost:5432/withSong_v2',
    },
    production: {
        uri: '',
    },
};

export default environment