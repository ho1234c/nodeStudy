import express from 'express'
import db from './models'


db.sequelize.sync({force: true})
    .then(()=>{
        console.log('db connect');
    })
    .catch(()=>{
        console.log('db connection fail');
    });

const app = express();

export default app;