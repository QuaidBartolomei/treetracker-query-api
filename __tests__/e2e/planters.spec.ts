import supertest from 'supertest';
import app from '../../server/app';

describe('planters', () => {
  it('planters/{id}', async () => {
    const response = await supertest(app).get('/planters/1');
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      id: 1,
      links: {
        featured_trees: expect.stringMatching(/trees/),
        associated_organizations: expect.stringMatching(/organizations/),
        species: expect.stringMatching(/species/),
      },
    });
  });

  it(
    'planters?organization_id=1&limit=1',
    async () => {
      const response = await supertest(app).get(
        '/planters?organization_id=1&limit=1',
      );
      expect(response.status).toBe(200);
      expect(response.body.planters).toBeInstanceOf(Array);
      expect(response.body.planters[0]).toMatchObject({
        id: 1,
        organization_id: 1,
        links: {
          featured_trees: expect.stringMatching(/trees/),
          associated_organizations: expect.stringMatching(/organizations/),
          species: expect.stringMatching(/species/),
        },
      });
    },
    1000 * 30,
  );
});
