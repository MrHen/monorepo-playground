export default {
    'express-server': {
        host: process.env['EXPRESS_SERVER_HOST'],
        port: process.env['EXPRESS_SERVER_PORT'] || '3000',
        protocol: process.env['EXPRESS_SERVER_PROTOCOL'] || 'http'
    }
}
