import { rest } from 'msw';
import { setupServer } from 'msw/node';
import emissionCategories from './__tests__/mocks/emissionCategories.json';

const server = setupServer(
  rest.get('http://localhost:4000/categories', (_req, res, ctx) => res(ctx.status(200), ctx.json(emissionCategories))),
  rest.get('*', (req, res, ctx) => {
    console.error(`Please add request handler for ${req.url.toString()}`);
    return res(
      ctx.status(500),
      ctx.json({ error: 'You must add request handler.' }),
    );
  }),
);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

export { server, rest };
