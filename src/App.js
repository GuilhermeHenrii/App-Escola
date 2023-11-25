import React from 'react';
import { /* BrowserRouter */ Router } from 'react-router-dom'; // Chamando broserRouter aqui para ele envolver todos os outros módulos, para facilitar o uso das rotas em toda a apicação

// import Login from './pages/login';
// não precisa chamar explicitamente o index

import { Bounce, ToastContainer } from 'react-toastify'; // importando o Toast e o Bounce
import history from './services/history'; // history com letra minuscula
import GlobalStyles from './styles/GlobalStyles'; // todos os componentes react começam com letras maiusculas
import Header from './components/Header';
import Routes from './routes'; // importando o arquivo Routes que contem as configurações de roteamento da aplicação (react-router-dom)

function App() {
  return (
    <Router history={history}>
      <Header />
      <Routes />
      <GlobalStyles />
      <ToastContainer // toast é um component react pré configurado para exibir notificações
        autoClose={3000} // 3 segundos para a notificação fechar
        className="toast-container"
        transition={Bounce} // passando uma animação
      />
    </Router>
  );
}

export default App;
