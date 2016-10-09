import bootstrap from './bootstrap'
import config from './config'

const server = bootstrap.listen(config.port, ()=>{
    console.log(`server start! port ${config.port}`);
});