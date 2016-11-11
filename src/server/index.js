import bootstrap from './bootstrap'
import config from './config'

const server = bootstrap.listen(config.port, ()=>{
    console.log(`server start! in ${config.port} port, ${config.env}`);
});