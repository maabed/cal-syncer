import { createEntityAdapter } from '@reduxjs/toolkit';
import { rest } from 'msw';

import type { IMeetingApiResponse } from '@/types/ApiResponse';

const adapter = createEntityAdapter<IMeetingApiResponse['users'][0]>();

const initialState = adapter.getInitialState();

const state = adapter.setAll(initialState, [
  {
    id: 1,
    email: 'george.bluth@reqres.in',
    first_name: 'George',
    last_name: 'Bluth',
    avatar: 'https://reqres.in/img/faces/1-image.jpg',
  },
  {
    id: 2,
    email: 'janet.weaver@reqres.in',
    first_name: 'Janet',
    last_name: 'Weaver',
    avatar: 'https://reqres.in/img/faces/2-image.jpg',
  },
  {
    id: 3,
    email: 'eve.holt@reqres.in',
    first_name: 'Eve',
    last_name: 'Holt',
    avatar: 'https://reqres.in/img/faces/4-image.jpg',
  },
]);

export { state };

export const handlers = [
  rest.get('/api/users', (_req, res, ctx) => {
    const users = Object.values(state.entities);
    return res(
      ctx.json({
        users,
        count: users.length,
        totalCount: 10,
      }),
    );
  }),
];
