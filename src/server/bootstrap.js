import express from 'express';
import configExpress from './config/express';
import routeIndex from './routes/index';
import routeList from './routes/list';
import routeUser from './routes/user'
import db from './models';
import dummy from './dummy';

db.sequelize.sync({force: true})
    .then(() => {
        dummy(5, 15, console.log);
        console.log('Connect database');
    })
    .catch(() => {
        console.log('Fail to database connection');
    });

const app = express();
const route = configExpress(app);

routeIndex(route);
routeList(route);
routeUser(route);

export default app;