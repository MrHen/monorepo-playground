import ky from 'ky';

const config = {
    LINKS_ENDPOINT: 'http://0.0.0.0:3001',
};

const getList = () => {
    const url = `${config.LINKS_ENDPOINT}/links`;
    return ky.get(url).json();
}

export {
    getList,
};
