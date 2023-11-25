// Esse arquivo, basicamente, vai ser responsável por ser a "raiz" de todos os reducers
// Aqui os reducers serão combinados

import { combineReducers } from 'redux';

import exampleReducer from './example/reducer';

export default combineReducers({
  // combineReducers retorna uma raiz contendo os estados de todos os reducers da aplicação, facilitando o entendimento e organização do código
  example: exampleReducer,
});
