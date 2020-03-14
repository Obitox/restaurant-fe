import { ofType } from 'redux-observable';
import { mergeMap, takeUntil, map } from 'rxjs/operators';
import { from } from 'rxjs';

import * as homeActions from '../actions/homeActions';
import { fetchData } from '../superagent/api';

export const fetchHomeDataEpic = action$ => action$.pipe(
  ofType(homeActions.HOME_DATA_FETCH_REQUEST),
  mergeMap(action => from(fetchData(`/home`)).pipe(
    map(response => homeActions.processResponse(response)),
    takeUntil(action$.pipe(
      ofType(homeActions.HOME_DATA_FETCH_CANCELLED)
    ))
  ))
);