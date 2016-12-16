import express from 'express';
import configExpress from './config/express';
import routeIndex from './routes/index';
import routeList from './routes/list';
import routeUser from './routes/user'
import db from './models';
import dummy from './dummy';
import config from './config'

db.sequelize.sync({ force: config.env == 'localhost-db' })
    .then(() => {
        if (config.env == 'localhost-db'){
            return dummy(20, 15);
        }
        return;
    })
    .then(message => {
        if(message) console.log(message);
    })
    .catch(() => {
        console.log('Fail to insert database');
    });

const app = express();
const route = configExpress(app);

routeList(route);
routeUser(route);
routeIndex(route);

export default app;