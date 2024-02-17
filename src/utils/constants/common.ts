import { RequestMethod } from '@nestjs/common';

export const routes = {
  root: '/',
  auth: {
    root: 'auth',
    signUp: 'signup',
    signIn: 'signin',
    signOut: 'signout',
    refresh: 'refresh',
  },
  user: {
    root: 'user',
    findMany: 'findmany',
    findOneById: ':id',
  },
};

const { POST } = RequestMethod;

export const publicRoutes = [
  { path: `${routes.auth.root}/${routes.auth.signUp}`, method: POST },
  { path: `${routes.auth.root}/${routes.auth.signIn}`, method: POST },
  { path: `${routes.auth.root}/${routes.auth.refresh}`, method: POST },
];

export const TOKEN_EXPIRATION_TIME_IN_HOURS = 1;
export const REFRESH_TOKEN_EXPIRATION_TIME_IN_HOURS = 24;

export const REFRESH_TOKEN_HEADER_NAME = 'refresh';
