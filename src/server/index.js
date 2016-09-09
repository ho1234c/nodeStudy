import bootstrap from './bootstrap'

const server = bootstrap.listen(8000, ()=>{
    console.log('server start!');
});