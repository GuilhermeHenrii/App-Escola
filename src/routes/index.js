import React from 'react';
import { Switch /* Route */ } from 'react-router-dom';
// usando a lib react-router-dom para configurar o roteamento da aplicação

import MyRoute from './MyRoute';
import Login from '../pages/login';
import Page404 from '../pages/Page404';

export default function Routes() {
  return (
    <Switch>
      <MyRoute exact path="/" component={Login} />
      {/* exact especifica que quer a rota exata passada para renderizar o componente */}
      <MyRoute path="*" component={Page404} />
      {/* Tudo que não estiver especificado coma uma rota válida vai cair aqui nesse erro de pagina não encontrada */}
    </Switch>
  );
}
