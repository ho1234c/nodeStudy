import express from 'express';
import configExpress from './config/express';
import routeIndex from './routes/index';
import routeList from './routes/list';
import routeUser from './routes/user'
import db from './models';

db.sequelize.sync()
    .then(() => {
        console.log('Success to database syncronize');
    })
    .catch(() => {
        console.log('Fail to database syncronize');
    });

const app = express();
const route = configExpress(app);

routeList(route);
routeUser(route);
routeIndex(route);

export default app;