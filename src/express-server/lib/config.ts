import nconf = require('nconf');

nconf
    .argv()
    .env()
    .defaults({
        'EXPRESS_HOST': '0.0.0.0',
        'EXPRESS_PORT': 3000,
    });

export default nconf;
