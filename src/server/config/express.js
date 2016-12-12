import express from 'express';
import nunjucks from 'nunjucks';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import config from '.';
import redisConfig from './redis';
import passportConfig from './passport';

export default function(app) {

    // set view, static
    app.set('views', `${config.cwd}/views`);
    app.set('view engine', 'html');
    nunjucks.configure('views', {
        express: app,
        autoescape: true,
        tags: {
            variableStart: '{$', // for angularJS
            variableEnd: '$}',
        }
    });
    app.use(express.static(config.path.public));

    // set Parsers
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cookieParser());

    // set session
    redisConfig(app);

    // set passport
    passportConfig(app);

    // **router apply point**
    const router = express.Router();
    app.use(router);

    return router
}
