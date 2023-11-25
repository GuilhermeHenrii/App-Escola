import { all } from 'redux-saga/effects';

import example from './example/sagas';

export default function* rootSaga() {
  return yield all([example]); // função que, assim como o rootReducer, terá todas as Sagas da aplicação. Com o método all(), que nos permite executar varias acitions, nesse caso varias Sagas
}
