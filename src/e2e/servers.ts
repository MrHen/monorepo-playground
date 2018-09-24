export default {
  'django-server': {
    host: process.env['DJANGO_SERVER_HOST'],
    port: process.env['DJANGO_SERVER_PORT'] || '8000',
    protocol: process.env['DJANGO_SERVER_PROTOCOL'] || 'http',

    supports: {
      hello: true,
      links: false,
    },
  },
  'express-server': {
    host: process.env['EXPRESS_SERVER_HOST'],
    port: process.env['EXPRESS_SERVER_PORT'] || '3000',
    protocol: process.env['EXPRESS_SERVER_PROTOCOL'] || 'http',

    supports: {
      hello: true,
      links: true,
    },
  },
  'sinatra-server': {
    host: process.env['SINATRA_SERVER_HOST'],
    port: process.env['SINATRA_SERVER_PORT'] || '9292',
    protocol: process.env['SINATRA_SERVER_PROTOCOL'] || 'http',

    supports: {
      hello: true,
      links: false,
    },
  }
}
