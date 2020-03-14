import { combineEpics } from 'redux-observable';

import { fetchHomeDataEpic } from './fetchHomeDataEpic';

export const rootEpic = combineEpics(
    fetchHomeDataEpic
);