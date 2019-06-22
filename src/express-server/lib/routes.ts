import express = require('express');
import path = require('path');
const router = express.Router();

import links from './links';

// Logging / utility route
router.use('/', (req, res, next) => {
    console.log(`start ${req.method} ${req.url}`);
    next();
});

router.get('/status', (req, res, next) => {
    res.status(200).end();
});

router.get('/hello', function (req, res) {
    res.json({
        'hello': 'world'
    })
})

// Create new link
router.post('/links', (req, res, next) => {
    links.generateLink({
        url: req.body.url
    }, (err, link) => {
        if (err) {
            return next(err);
        }

        res.status(201).send(link);
    });
});

router.get('/links', (req, res, next) => {
    links.getLinks({}, (err, links) => {
        if (err) {
            return next(err);
        }

        res.send({
            results: links,
        });
    });
});

// Resolve link -- should be given a fancy short domain like https://lin.ks/:linkId
router.get('/links/:linkId', (req, res, next) => {
    links.getLink({
        linkId: req.params.linkId
    }, (err, link) => {
        if (err) {
            return next(err);
        }

        if (!link) {
            res.status(404);
            return;
        }

        // TODO handle HTML redirect if configured to do so
        res.redirect(302, link.url);
    });
});

// Fall through to error handler
router.use('/', (err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    var status = err.statusCode || err.status || 500;
    var message = err.message || err.error || 'ERROR_UNKNOWN';
    res.status(status);
    res.send({
        message: message,
        error: err
    });

    console.log('ERROR', err);
});

// Reject all other routes
router.use('/', (req, res, next) => {
    console.log(`404 ${req.method} ${req.url}`);

    var status = 404;
    var message = 'ERROR_ROUTE_NOT_FOUND';
    res.status(status);
    res.send({
        message: message
    });
});

export default router;
