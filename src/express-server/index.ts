import app from './lib/app';

app((err, result) => {
    if (err) {
        console.log('App error on start', err);
        return;
    }

    if (!result) {
        console.log('App did not start');
        return;
    }

    const {
        app,
        server,
    } = result;

    var address = server.address();
    console.log(`App listening on: ${address.address}:${address.port}`);
});
