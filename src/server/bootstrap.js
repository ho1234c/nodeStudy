import express from 'express'
import configExpress from './config/express'
import routeIndex from './routes/index';
import db from './models'


db.sequelize.sync({force: true})
    .then(()=>{
        console.log('db connect');
    })
    .catch(()=>{
        console.log('db connection fail');
    });

const app = express();
const route = configExpress(app);

routeIndex(route);
export default app;