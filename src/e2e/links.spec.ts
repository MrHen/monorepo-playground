import * as _ from 'lodash';
import * as async from 'async';
import { expect } from 'chai';
import 'mocha';
import * as tcpPing from 'tcp-ping';
import * as superagent from 'superagent';

import servers from './servers'

describe('/links', () => {
  _.forEach(servers, (config, name) => {
    const testcase = `${name} should create and resolve link`;
    if (!config.supports.links) {
      it.skip(testcase);
      return;
    }

    it(testcase, (done) => {
      var protocol = config.protocol;
      var host = config.host;
      var port = config.port;
      var route = 'links'

      var url = `${protocol}://${host}:${port}/${route}`

      var destUrl = 'https://google.com';
      var linkId;

      superagent.post(url)
        .set('Accept', 'application/json')
        .timeout({
          response: 1000
        })
        .send({ url: destUrl })
        .on('error', done)
        .end((err, postResponse) => {
          expect(err).to.not.exist;
          expect(postResponse.body).to.exist;
          expect(postResponse.body.url).to.eql(destUrl);

          linkId = postResponse.body.linkId;
          expect(linkId).to.exist;
          expect(postResponse.status).to.eql(201);

          superagent.get(`${url}/${linkId}`)
            .set('Accept', 'application/json')
            .timeout({
              response: 1000
            })
            .redirects(0)
            .ok(res => res.status < 400)
            .on('error', done)
            .end((err, getResponse) => {
              expect(err).to.not.exist;
              expect(getResponse.status).to.eql(302);

              expect(getResponse.header).to.exist;
              expect(getResponse.header.location).to.eql(destUrl);

              done();
            });
        });
      });
  });
});
