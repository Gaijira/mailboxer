import supertest from 'supertest';
import urls from '../config';

const Check = {
    get: async (key, email) => await supertest(urls.mailboxer)
        .get(`check?access_key=${ key }&email=${ email }`)
};

export default Check;