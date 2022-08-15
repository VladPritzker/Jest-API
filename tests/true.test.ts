const request = require('supertest');
const app = require("../app");
test('tests /space/flights/seats endpoint - starship', async () => {
    const response = await request(app).get("/space/flights/seats");
    expect.extend({
        toBeActive(received) {
            const pass = received === true;
            if (pass) {
                return {  
                    message: () =>
                        `expected ${received} is an acceptable flight status`,
                    pass: true,
                };
            }
        }
    });
    expect(response.body.starship)
        .toEqual(expect.arrayContaining([expect.objectContaining({
            firstClass: expect.objectContaining({ seatHover: expect.objectContaining({
                expect(response.body[0].heatedSeats).toBeActive()    
            }) 
        })
    ]));
        
    
})