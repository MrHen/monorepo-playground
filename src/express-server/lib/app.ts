import * as _ from 'lodash';
import * as async from 'async';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import { Server } from 'http';

import config from './config';
import routes from './routes';

type MaybeError = Error | null;

interface RoutesStep {
    app: express.Express;
}

interface ServerStep {
    app: express.Express;
    routes: {};
}

interface Results {
    app: express.Express;
    routes: {};
    server: Server;
}

interface Result {
    app: express.Express;
    server: Server;
}

const appInit = (callback: (error: MaybeError, result?: Result) => void) => {
    async.auto({
        'app': (cb: async.AsyncResultCallback<express.Express, MaybeError>) => {
            var app = express();

            app.use(cors({
                origin: (origin, corsCb) => {
                    // TODO: Move to config
                    if (_.startsWith(origin, 'http://0.0.0.0')) {
                        corsCb(null, true);
                        return;
                    }

                    // TODO: Find better way to detect tests
                    if (_.isUndefined(origin)) {
                        corsCb(null, true);
                        return;
                    }

                    corsCb(new Error('Not allowed by CORS'));
                },
            }));
            app.use(bodyParser.json());
            app.use(bodyParser.urlencoded({ extended: false }));

            cb(null, app);
        },
        'routes': ['app', (results: RoutesStep, cb: async.ErrorCallback<MaybeError>) => {
            results.app.use('/', routes);
            cb(null);
        }],
        'server': ['app', 'routes', (results: ServerStep, cb: async.AsyncResultCallback<Server, MaybeError>) => {
            var host = config.get('EXPRESS_HOST');
            var port = config.get('EXPRESS_PORT');
            var server = results.app.listen(port, host, (err: MaybeError) => {
                cb(err, server);
            });
        }]
    }, 10, (err?: MaybeError, results?: Results) => {
        if (err) {
            return callback(err);
        }

        if (!results) {
            return callback(new Error("Unknown error"));
        }

        callback(null, {
            app: results.app,
            server: results.server,
        });
    });
};

export default appInit;
