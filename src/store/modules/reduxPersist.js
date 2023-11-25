import storage from 'redux-persist/lib/storage'; // esse storage se incarregar automaticmanete de salvar os dados no localStorage
import { persistReducer } from 'redux-persist';

// o redux espera que os dados sejam capturados, para depois renderizar o restante da aplicação
export default (reducers) => {
  // vamos receber os reducers como parametro para executar essa função
  const persistedReducers = persistReducer(
    {
      key: 'REACT-BASE', // o nome do identificador do objeto salvo no storage
      storage, // passando o storage do 'redux-persist/lib/storage'
      whitelist: ['example'], // define o que queremos que persista
      /* blacklist */ // oposto da whitelist
    },
    reducers
  );

  return persistedReducers; // retorno a constante que tem o valor da função persistReducer()
};
