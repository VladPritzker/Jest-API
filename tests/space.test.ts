const request = require('supertest');
const app = require("../app");

describe('Space test suite', () => {
   
    test('tests /destinations endpoints', async() => {
        const response = await request(app).get("/space/destinations");
        expect(response.body).toEqual(["Mars", "Moon", "Earth", "Mercury", "Venus", "Jupiter"]);
        expect(response.body).toHaveLength(6);
        expect(response.statusCode).toBe(200);
        // Testing a single element in the array
        expect(response.body).toEqual(expect.arrayContaining(['Earth']));

    });
    test('tests /space/flights/seats endpoint - starship', async () => {
        const response = await request(app).get("/space/flights/seats");
        expect(response.body.starship).toEqual(expect.arrayContaining([expect.any(Object)]));
        // Checking that the starship Object contains firstClass Object which then contains a set of objects
        expect(response.body.starship).toEqual(expect.arrayContaining(
            [expect.objectContaining({ firstClass: expect.any(Object) })]));

        expect(response.body.starship).toEqual(expect.arrayContaining([expect.objectContaining(
            { businessClass: expect.any(Object) })]));

        // Checking that under the bussinessClass Object we have the array drinks served
        expect(response.body.starship)
            .toEqual(expect.arrayContaining([expect.objectContaining({
                businessClass: expect.objectContaining({ drinksServed: expect.any(Array) })
            })]));

        // Checking that under the firstClass: Object we have the option ludacris in the seatHover Object
        expect(response.body.starship)
        .toEqual(expect.arrayContaining([expect.objectContaining({
            firstClass: expect.objectContaining({ seatHover: expect.objectContaining({
                cryoMode : expect.arrayContaining(['ludacris'])}) })
        })]));

        // Checking that under the firstClass: Object we have the option plaid in the seatHover Object
        expect(response.body.starship)
        .toEqual(expect.arrayContaining([expect.objectContaining({
            firstClass: expect.objectContaining({ seatHover: expect.objectContaining({
                staticMode : expect.arrayContaining(['plaid'])}) })
        })]));
    });
    test('tests /space/flights endpoint - positive test', async () => {
        const response = await request(app).get("/space/flights/seats");
        const expected = true;
        console.log(JSON.stringify(response.body))
       expect(response.body.starship[0].firstClass.heatedSeats).toEqual(true)
    });
    
    
    // test('tests /space/flights endpoint - positive test', async () => {
    //     const response = await request(app).get("/space/flights");
    //     const expected = true;
    //      expect(response.body.starship)
    //     .toEqual(expect.arrayContaining([expect.objectContaining({
    //         firstClass: expect.objectContaining({ heatedSeats: expect.(expected) })
    //     })]));
    //     // expect(response.body.starship[].firstClass.heatedSeats).toEqual(true)
    // });
})