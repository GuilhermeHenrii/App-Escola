import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'; // redux-persist
import App from './App';
import store, { persistor } from './store/index'; // pegando o store e o persistor, do nosso store do redux

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <PersistGate persistor={persistor}>
    {/* PersistGate irá receber o nossa função função persistor do store */}
    <Provider store={store}>
      <App />
    </Provider>
  </PersistGate>
);
