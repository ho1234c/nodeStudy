import express from 'express';
import nunjucks from 'nunjucks';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import logger from 'morgan';
import config from '.';
import redisConfig from './redis';
import passportConfig from './passport';
import favicon from 'serve-favicon';
import path from 'path';

export default function(app) {
    // set view, static, logger
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
    app.use(logger('dev'));

    // set Parsers
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(favicon(path.join('public', 'favicon.ico')));

    // set session
    redisConfig(app);

    // set passport
    passportConfig(app);

    // **router apply point**
    const router = express.Router();
    app.use(router);

    return router
}
