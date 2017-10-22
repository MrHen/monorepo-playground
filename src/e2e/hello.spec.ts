import { expect } from 'chai';
import 'mocha';
import * as tcpPing from 'tcp-ping';
import * as superagent from 'superagent';

import servers from './servers'

describe('/hello', () => {
    before('wait for express-server', (done) => {
        tcpPing.ping({
            address: servers['express-server'].host,
            port: servers['express-server'].port,
            timeout: 200,
            attempts: 5
        }, done)
    })

    before('wait for sinatra-server', (done) => {
      tcpPing.ping({
          address: servers['sinatra-server'].host,
          port: servers['sinatra-server'].port,
          timeout: 200,
          attempts: 5
      }, done)
    })

    it('express-server should say hello', (done) => {
        var protocol = servers['express-server'].protocol;
        var host = servers['express-server'].host;
        var port = servers['express-server'].port;
        var route = 'hello'

        var url = `${protocol}://${host}:${port}/${route}`

        var actual = superagent.get(url)
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

      var actual = superagent.get(url)
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
