import { createEntityAdapter, nanoid } from '@reduxjs/toolkit';
import { rest } from 'msw';

interface Post {
  id: number;
  title: string;
}
// We're just going to use a simple in-memory store for both the counter and posts
// The entity adapter will handle modifications when triggered by the MSW handlers

let startingId = 3; // Just a silly counter for usage when adding new posts

const adapter = createEntityAdapter<any>();

const initialState = adapter.getInitialState();
const state = adapter.setAll(initialState, [
  { id: 1, name: 'A sample post', fetched_at: new Date().toUTCString() },
  { id: 2, name: 'A post about car', fetched_at: new Date().toUTCString() },
]);

export { state };

// Just use a random id for an auth token
const token = nanoid();

export const handlers = [
  rest.get('/api/test', (_req, res, ctx) => {
    return res(ctx.json({ status: 'Ok' }));
  }),
  rest.post('/login', (_req, res, ctx) => {
    return res.once(ctx.json({ message: 'i fail once' }), ctx.status(500));
  }),
  rest.post('/login', (_req, res, ctx) => {
    return res(ctx.json({ token, user: { first_name: 'Test', last_name: 'User' } }));
  }),

  rest.get('/posts', (_req, res, ctx) => {
    return res(ctx.json(Object.values(state.entities)));
  }),

  rest.post('/posts', (req, res, ctx) => {
    const post = req.body as Partial<Post>;
    startingId += 1;

    adapter.addOne(state, { ...post, id: startingId } as Post);
    return res(ctx.json(Object.values(state.entities)), ctx.delay(400));
  }),

  rest.get('/posts/:id', (req, res, ctx) => {
    const { id } = req.params as { id: string };
    adapter.updateOne(state, { id, changes: { fetched_at: new Date().toUTCString() } });
    return res(ctx.json(state.entities[id]), ctx.delay(400));
  }),

  rest.put('/posts/:id', (req, res, ctx) => {
    const { id } = req.params as { id: string };
    const changes = req.body as Partial<Post>;

    adapter.updateOne(state, { id, changes });

    return res(ctx.json(state.entities[id]), ctx.delay(400));
  }),

  rest.delete('/posts/:id', (req, res, ctx) => {
    const { id } = req.params as { id: string };

    adapter.removeOne(state, id);

    return res(
      ctx.json({
        id,
        success: true,
      }),
      ctx.delay(600),
    );
  }),

  rest.get('/error-prone', (_req, res, ctx) => {
    if (Math.random() > 0.1) {
      return res(ctx.json({ error: 'failed!' }), ctx.status(500));
    }
    return res(
      ctx.json({
        success: true,
      }),
    );
  }),
];
