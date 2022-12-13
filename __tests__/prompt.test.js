const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('../lib/app.js');
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
    expect(res.body).toMatchInlineSnapshot();
    console.log(res);
  });
});
