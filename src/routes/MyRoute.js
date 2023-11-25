// arquivo de rota privada, esse componente irá substituir o componente Route nativo
// nesse componente, usaremos o PropTypes, para lidar com as propriedades dos componentes
// de acordo com essas prorpiedades (component, isClosed, ...rest) será definido se o usuário poderá acessar a rota ou não
import React from 'react';
import { Route, Redirect } from 'react-router-dom'; // Redirect usado para redirecionar o usuário para a página de login
import PropTypes from 'prop-types'; // trata as prorpriedades dos componentes

export default function MyRoute({ component: Component, isClosed, ...rest }) {
  const isLoggedIn = false; // definindo como false (usuário está logado?)

  if (isClosed && !isLoggedIn) {
    // se a rota for fechada e o usuário não estiver logado
    return (
      <Redirect>
        {/* Redirecione o mesmo para a pagina de login e pegue os dados anteriores (página que o usuário estava querendo acessar) => prePath */}
        to={{ pathname: '/login', state: { prevPath: rest.location.pathname } }}
      </Redirect>
    );
  }

  // desabilitando regra no eslint para habilitar o spread da propriedade rest dentro do componente

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Route {...rest} component={Component} />;
}

// validando as propriedades
// definindo o valor padrão da propriedade isClosed (rota fechada)
// a rota nunca sera fechada por padrão
MyRoute.defaultProps = {
  isClosed: false,
};

// validando as propriedades component e isClosed
// component (nosso componente que sera renderizado de acordo com a rota) pode ser um elemento ou uma função e é requerido
// isClosed será um boleano e não é requerido
MyRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
  isClosed: PropTypes.bool,
};
