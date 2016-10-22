import express from 'express';
import nunjucks from 'nunjucks';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import passport from 'passport';
import config from '.';
import redisConfig from './redis';
import passportConfig from './passport';

export default function (app) {
    const router = express.Router();

    nunjucks.configure('views', {
        express: app,
        autoescape: true,
        tags: {
            variableStart: '{$', // for AngularJS
            variableEnd: '$}',
        }
    });

    app.set('views', `${config.cwd}/views`);
    app.set('view engine', 'html');

    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    passportConfig(app);

    app.use(express.static(config.path.public));

    // **router apply point**
    app.use(router);
    redisConfig(app);

    return router
}
