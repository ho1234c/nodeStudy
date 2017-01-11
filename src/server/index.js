import bootstrap from './bootstrap'
import config from './config'
import db from './models';

db.sequelize.sync()
    .then(() => {
        console.log('Success to database syncronize');
        const server = bootstrap.listen(config.port, ()=>{
            console.log(`server start on ${config.port} port, ${config.env}`);
        });
    })
    .catch(() => {
        console.log('Fail to database syncronize');
    });
