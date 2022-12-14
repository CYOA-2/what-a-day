const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');

describe('prompt route', () => {
  beforeEach(() => {
    return setup(pool);
  });
  afterAll(() => {
    pool.end();
  });

  it('get /:id returns a prompt and choices by id', async () => {
    const res = await request(app).get('/api/v1/prompts/1');
    expect(res.status).toEqual(200);
    expect(res.body).toMatchInlineSnapshot(`
      Object {
        "aId": 2,
        "bId": 3,
        "bailId": 0,
        "bailout": "save my game",
        "id": "1",
        "promptA": "I am going to stay home and handle the plumber visit.",
        "promptB": "I am heading to work, my partner handles things like this for us.",
        "story": "Good morning and what another sunny day. You have had a filling breakfast, a nice morning with your family and are about to get ready for work when... What is that sound? You rush to the bathroom and your toilet is gushing water everywhere! You quickly get the water turned off and the rush subsides before finally stopping. What do you do from here?",
      }
    `);
  });
});

//comment for committing purposes
