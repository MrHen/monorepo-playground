import * as _ from 'lodash';
import * as async from 'async';
import { expect } from 'chai';
import 'mocha';
import * as tcpPing from 'tcp-ping';
import * as superagent from 'superagent';

import servers from './servers'

describe('/missing', () => {
  _.forEach(servers, (config, name) => {
    const testcase = `${name} should 404 on missing routes`;
    if (!config.supports.missing) {
      it.skip(testcase);
      return;
    }

    it(testcase, (done) => {
      var protocol = config.protocol;
      var host = config.host;
      var port = config.port;
      var route = 'missing'

      var url = `${protocol}://${host}:${port}/${route}`

      superagent.get(url)
          .set('Accept', 'application/json')
          .end((err, result) => {
              expect(err).to.exist;
              expect(result).to.exist;
              expect(result.status).to.eql(404);
              expect(result.body).to.eql({
                  'message': 'ERROR_ROUTE_NOT_FOUND',
              });
              done();
          });
    });
  });
});
