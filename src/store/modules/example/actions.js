// arquivo para separar as acitions da aplicação

import * as types from '../types'; // chamando os arquivos onde estão todas as types

export function clickedBtnRequest() {
  return { type: types.CLICKED_BTN_REQUEST };
}

export function clickedBtnSuccess() {
  return { type: types.CLICKED_BTN_SUCCESS };
}

export function clickedBtnFailure() {
  return { type: types.CLICKED_BTN_FAILURE };
}
