import { createEntityAdapter } from '@reduxjs/toolkit';
import { rest } from 'msw';

const adapter = createEntityAdapter<any>();

const initialState = adapter.getInitialState({});
const state = adapter.setOne(initialState, {
  user: {
    name: 'm abed',
    email: 'abed.44@gmail.com',
    image: 'https://lh3.googleusercontent.com/a/ALm5wu1uml4TKJOE7uFoxuyGsNRRbrNPvdCRHqydYtFUzg=s96-c',
  },
  expires: '2022-12-05T19:37:47.690Z',
  id: '115323303074382730806',
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNjNkNWVmZDk2OGRiNDJjOWZjZTU2MiIsImlhdCI6MTY2NzY3ODUzMSwiZXhwIjoxNjY3NzY0OTMxfQ.Nl2IiCndNSkrZx46Mobnz64rYOE8bHBAfUA2aygJuuA',
});

export { state };

export const handlers = [
  rest.get('/api/auth/session', (_req, res, ctx) => {
    return res(ctx.json(state.entities));
  }),
];
