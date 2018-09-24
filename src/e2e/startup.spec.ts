import * as async from 'async';
import { expect } from 'chai';
import 'mocha';
import * as superagent from 'superagent';

import servers from './servers'

before(function (done) {
  this.timeout(30000);
  async.auto({
    'django-server': (cb) => {
      wait({
        host: servers['django-server'].host,
        port: servers['django-server'].port
      }, cb);
    },
    'express-server': (cb) => {
      wait({
        host: servers['express-server'].host,
        port: servers['express-server'].port
      }, cb);
    },
    'sinatra-server': (cb) => {
      wait({
        host: servers['sinatra-server'].host,
        port: servers['sinatra-server'].port,
      }, cb);
    }
  }, 1, done);
});

function wait(options, callback) {
  async.retry({
      times: 30,
      interval: 1000
    }, (cb) => {
    var route = options.route || 'status'
    var protocol = options.protocol || 'http'
    var url = `${protocol}://${options.host}:${options.port}/${route}`

    superagent.get(url)
      .set('Accept', 'application/json')
      .timeout({
        response: 200,
        deadline: 1000
      })
      .end((err, res) => {
        if (err) {
          return cb(err);
        }

        expect(res).to.exist
        expect(res.status).to.eql(200)
        cb()
      })
    }, callback)
}
