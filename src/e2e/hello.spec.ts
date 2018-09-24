import * as _ from 'lodash';
import * as async from 'async';
import { expect } from 'chai';
import 'mocha';
import * as tcpPing from 'tcp-ping';
import * as superagent from 'superagent';

import servers from './servers'

describe('/hello', () => {
  _.forEach(servers, (config, name) => {
    const testcase = `${name} should say hello`;
    if (!config.supports.hello) {
      it.skip(testcase);
      return;
    }

    it(testcase, (done) => {
      var protocol = config.protocol;
      var host = config.host;
      var port = config.port;
      var route = 'hello'

      var url = `${protocol}://${host}:${port}/${route}`

      superagent.get(url)
          .set('Accept', 'application/json')
          .on('error', done)
          .end((err, result) => {
              expect(err).to.not.exist;
              expect(result).to.exist;
              expect(result.status).to.eql(200);
              expect(result.body).to.eql({
                  'hello': 'world'
              });
              done();
          });
    });
  });
});
