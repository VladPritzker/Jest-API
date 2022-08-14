// describe('Space test suite', () => {
//     test('My Space Test', () => {
//         expect(true).toEqual(true);
//     });
// });

const request = require('supertest');
const app = require("../app");

describe('Space test suite', () => {
    it('tests /destinations endpoints', async() => {
        const response = await request(app).get("/space/destinations");
        expect(response.body).toEqual(["Mars", "Moon", "Earth", "Mercury", "Venus", "Jupiter"]);
        expect(response.body).toHaveLength(6);
        expect(response.statusCode).toBe(200);
        // Testing a single element in the array
        expect(response.body).toEqual(expect.arrayContaining(['Earth']));

    });