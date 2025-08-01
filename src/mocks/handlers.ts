import { rest } from 'msw';

let users = [
  { id: 1, email: 'demo@user.com', name: 'Demo User' },
  { id: 2, email: 'test@user.com', name: 'Test User' },
];

export const handlers = [
  rest.get('/users', (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(users));
  }),

  rest.post('/users', async (req, res, ctx) => {
    const newUser = await req.json();
    const created = { ...newUser, id: Date.now() };
    users.push(created);
    return res(ctx.status(201), ctx.json(created));
  }),
];
