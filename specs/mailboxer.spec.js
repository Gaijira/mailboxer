import api from '../framework/services/index';

describe('Tests for "apilayer.net/api"', () => {

    const key =  '5d6c478198b2f18b8f58165607102ea4';
    const email = 'test@gmail.com';
    let responseBody;

    test('Test GET "apilayer.net/api/check" should returns "200" status code with valid parameters send', 
        async () => {
            const response = await api().Check().get(key, email);
            responseBody = response.body;
            expect(response.status).toEqual(200);
    });

    test.each`
    property          | value
    ${'email'}        | ${'jeanguy.buon <test@gmail.com>'} 
    ${'did_you_mean'} | ${''} 
    ${'user'}         | ${'test'} 
    ${'domain'}       | ${'gmail.com'} 
    ${'format_valid'} | ${true} 
    ${'mx_found'}     | ${true} 
    ${'smtp_check'}   | ${false} 
    ${'catch_all'}    | ${true} 
    ${'role'}         | ${false} 
    ${'disposable'}   | ${false} 
    ${'free'}         | ${true} 
    ${'score'}        | ${0.48} 
    `(`Test GET "apilayer.net/api/check" with "${email}" in query string shoud return "$value" in "body.$property"`, 
        async ({property, value}) => {
            expect(responseBody[property]).toBe(value);
    });

    test('Test GET "apilayer.net/api/check" without token should return error', async () => {
        const response = await api().Check().get();
        expect(response.body).toStrictEqual({
            "error": {"code": 101, "info": "You have not supplied a valid API Access Key. " +
            "[Technical Support: support@apilayer.com]", "type": "invalid_access_key"}, "success": false});
    });

});
