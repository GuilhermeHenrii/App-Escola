// O saga será responsável por fazer uma requisição antes de, de fato, uma ação ser executada
// Se a requisição for resolvida, executaremos a ação que faz a requisição e altera o estado

import { call, put, all, takeLatest } from 'redux-saga/effects';
// takeLatest vai pegar o ultimo click no botão, por exemplo
// all vai permitir colocar mais de uma ação para ser exucutada

import * as actions from './actions';
import * as types from '../types';

// Configurando o Redux Saga

// Simulando uma requisição
const request = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve('Dados de uma api');
    }, 2000);
  });

// O Saga utiliza funções geradoras
function* exampleRequest() {
  try {
    // Vai tentar executar o call com a função que simula uma requisição
    // Vai tentar chamar tbm a action de sucesso
    yield call(request);
    yield put(actions.clickedBtnSuccess());
  } catch {
    // Se a requisição falahar, chama a action de erro
    yield put(actions.clickedBtnFailure());
    console.log('cai aqui');
  }
}

export default all([takeLatest(types.CLICKED_BTN_REQUEST, exampleRequest)]); // vai executar a ação de request e a funcção exampleRequest, que retornará uma action, ou seja, podendo ser executada duas actions simultaneamentes
