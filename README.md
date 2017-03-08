# withsong

## Preparation

Install postgres, redis and nodemon if you are in the localhost environment for development. and if you are in real server for deploy, install docker.

## Install

- Receive the source file.
``` 
git clone https://github.com/ho1234c/withSong_2.0
```

- Install module dependency
```
cd withSong_2.0
npm install
```

- Make config file

Make ".env" file and insert config you need. but if your environment is localhost, create ".dev.env" file. (maybe you can make both.)

```
# file name is .env or .dev.env

DB_HOST=your database host name
REDIS_HOST=your redis name
REDIS_SECRETKEY=redis secretkey
REDIS_PORT=redis port
POSTGRES_PORT=postgres port
POSTGRES_DB=postgres database name
POSTGRES_USER=your postgres user name
POSTGRES_PASSWORD=your postgres user password
PORT=app port
DOMAIN=app domain
YOUTUBE_KEY=youtube key
YOUTUBE_URL=https://www.googleapis.com/youtube/v3/search?
FACEBOOK_CLIENT_ID=facebook client id
FACEBOOK_CLIENT_SECRET=facebook client secret key
```

- Prepare to launch app

Bundling and compiling to run the application.

```
npm run build
```

- Start app in server

```
docker-compose up
```
