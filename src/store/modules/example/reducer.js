// Neste aquivos serão armazenado todos os reducers da aplicação

import * as types from '../types'; // Importando os types

const initialState = {
  // estado inicial
  clickedBtn: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.CLICKED_BTN_SUCCESS: {
      console.log('Sucesso');
      const newState = { ...state }; // o state é imutável, e por isso devemos fazer uma cópia
      newState.clickedBtn = !newState.clickedBtn; // se for true sera false e se for false será true
      return newState;
    }

    case types.CLICKED_BTN_FAILURE: {
      console.log('Requisição deu erro');
      return state; // Note que esta sendo retornado o state atual, pois a requisição deu erro
    }

    case types.CLICKED_BTN_REQUEST: {
      console.log('Requisição em andamento');
      return state; // Note que esta sendo retornado o state atual, pois a requisição está em andamento
    }

    default: {
      return state; // um reducer SEMPRE deve retornar um state
    }
  }
}
