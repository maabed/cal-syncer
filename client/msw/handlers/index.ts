import { handlers as sessionHandler, state as session } from './session';
import { handlers as testHandler, state as test } from './testHandler';
import { handlers as usersHandler, state as users } from './users';

export const handlers = [...testHandler, ...sessionHandler, ...usersHandler];

export const state = {
  test,
  session,
  users,
};
