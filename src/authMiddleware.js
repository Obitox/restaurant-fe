import superagent from 'superagent';

import { setAuthState } from './localStorage';

export default function authMiddleware() {
  return ({ dispatch, getState }) => next => (action) => {
    const { request, } = action;

    if (!request) {
      return next(action);
    }

    const { auth } = getState().loginReducer;
    
    const refreshThreshold = Math.round(new Date().getTime() / 1000);
  
    const url = `https://localhost:44321/api` 

    if (auth.authToken && refreshThreshold > auth.expiresAt) {
      return superagent.post(`${url}/home/token/refresh`)
        .send({ Username: auth.username, RefreshToken: auth.refreshToken })
        .end((err, { body } = {}) => {
          dispatch({ type: 'SET_AUTH', auth: body });
          request(body);
        });
    }
    return request(auth);
  };
}