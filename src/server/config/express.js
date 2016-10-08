import express from 'express';
import nunjucks from 'nunjucks';
import config from '.';

export default function (app) {
    const router = express.Router();
    app.set('views', `public`);
    app.set('view engine', 'html');
    nunjucks.configure(app.get('views'), {
        express: app,
        autoescape: true
    });
    app.use(express.static(config.path.public));

    app.use(router);

    return router
}
