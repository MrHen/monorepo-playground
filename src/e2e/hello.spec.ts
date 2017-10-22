import * as async from 'async';
import { expect } from 'chai';
import 'mocha';
import * as tcpPing from 'tcp-ping';
import * as superagent from 'superagent';

import servers from './servers'

describe('/hello', () => {
  function wait(options, callback) {
    async.retry(5, (cb) => {
      var route = options.route || 'status'
      var protocol = options.protocol || 'http'
      var url = `${protocol}://${options.host}:${options.port}/${route}`

      superagent.get(url)
        .set('Accept', 'application/json')
        .timeout({
          response: 200,
          deadline: 1000
        })
        .on('error', cb)
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

  before('wait for express-server', (done) => {
    wait({
        host: servers['express-server'].host,
        port: servers['express-server'].port
      }, done);
  })

  before('wait for sinatra-server', (done) => {
    wait({
      host: servers['sinatra-server'].host,
      port: servers['sinatra-server'].port,
    }, done)
  })

  it('express-server should say hello', (done) => {
      var protocol = servers['express-server'].protocol;
      var host = servers['express-server'].host;
      var port = servers['express-server'].port;
      var route = 'hello'

      var url = `${protocol}://${host}:${port}/${route}`

      superagent.get(url)
          .set('Accept', 'application/json')
          .on('error', done)
          .end((err, result) => {
              expect(err).to.not.exist;
              expect(result).to.exist;
              expect(result.body).to.eql({
                  'hello': 'world'
              });
              done();
          });
  });

  it('sinatra-server should say hello', (done) => {
    var protocol = servers['sinatra-server'].protocol;
    var host = servers['sinatra-server'].host;
    var port = servers['sinatra-server'].port;
    var route = 'hello'

    var url = `${protocol}://${host}:${port}/${route}`

    superagent.get(url)
        .set('Accept', 'application/json')
        .on('error', done)
        .end((err, result) => {
            expect(err).to.not.exist;
            expect(result).to.exist;
            expect(result.body).to.eql({
                'hello': 'world'
            });
            done();
        });
  });
});
