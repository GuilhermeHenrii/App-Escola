import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { get } from 'lodash';

import { Form } from './styled';
import { Container } from '../../styles/GlobalStyles';
import * as actions from '../../store/modules/auth/actions';
import Loading from '../../components/Loading';

export default function Login(props) {
  const dispatch = useDispatch();

  const prevPath = get(props, 'location.state.prevPath', '/'); // pegando o prevPath de myRoutes

  const isLoading = useSelector((state) => state.auth.isLoading); // acessando isLoading de dentro do estado

  console.log(prevPath, props);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    let formErrors = false;

    if (password.length < 6 || password.length > 50) {
      formErrors = true;
      toast.error('Senha deve ter entre 6 e 50 caracteres');
    }

    if (!isEmail(email)) {
      formErrors = true;
      toast.error('Email inválido');
    }

    if (formErrors) return;

    dispatch(actions.loginRequest({ email, password, prevPath })); // disparando loginRequest que vai iniciar o ciclo de autenticação do usuário na aplicação
  }

  return (
    <Container>
      <Loading isLoading={isLoading} />
      {/* passando isLoading, que é a variável
      que armazena o valor do estado de isLoading */}
      <h1>Login</h1>
      <Form>
        <label htmlFor="email">
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
          />
        </label>
        <label htmlFor="password">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your password"
          />
        </label>

        <button type="submit" onClick={handleSubmit}>
          Entrar
        </button>
      </Form>
    </Container>
  );
}
