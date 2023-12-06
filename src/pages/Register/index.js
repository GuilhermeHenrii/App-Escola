import React, { useState } from 'react';

import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import { get } from 'lodash';
import { Container } from '../../styles/GlobalStyles';
import { Form } from './styled';
import axios from '../../services/axios';
import history from '../../services/history';
import Loading from '../../components/Loading';

export default function Register() {
  const [nome, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function containsNumber(string) {
    return /\d/.test(string);
  }

  async function handleClick(event) {
    event.preventDefault();

    let formErrors = false;

    if (nome.length < 2 || nome.length > 80) {
      formErrors = true;
      toast.error('Nome precisa ter entre 2 e 80 caracteres');
    }

    if (containsNumber(nome)) {
      formErrors = true;
      toast.error('Campo "Name" não pode conter números');
    }

    if (password.length < 6 || password.length > 50) {
      formErrors = true;
      toast.error('Senha deve ter entre 6 e 50 caracteres');
    }

    if (!isEmail(email)) {
      formErrors = true;
      toast.error('Email inválido');
    }

    if (formErrors) return;

    setIsLoading(true);

    try {
      const response = await axios.post('/users/', {
        nome,
        password,
        email,
      });
      console.log(response);
      setIsLoading(false);
      toast.success('Cadastro criado com sucesso', {
        autoClose: 2000,
      });
      history.push('/login');

      // definindo um tempo de dois segundos para o reload da pagina, para evitar o realod antes do toast aparecer
      window.setTimeout(() => {
        history.go(0); // forçando o redirecionamento para '/login'
      }, 2000);
    } catch (e) {
      // pegando erro do backend
      const status = get(e, 'response.status', 0); // usando o lodash para fazer um get no caminho especificado, dentro dos erros (e)
      const errors = get(e, 'response.data.errors', []);
      console.log(status, errors);

      // renderizando erro do backend na tela
      errors.map((error) => toast.error(error));
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>Create your account</h1>

      <Form>
        <label htmlFor="name">
          Name:
          <input
            type="text"
            value={nome}
            onChange={(e) => setName(e.target.value)} // usando o onChange para pegar alterações no input e declarando que a função setName, irá receber o value do evento disparo, no caso a inserção ou remoção de caracteres do input
            placeholder="Your name"
          />
        </label>

        <label htmlFor="email">
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your e-mail"
          />
        </label>

        <label htmlFor="password">
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your password"
          />
        </label>

        <button type="submit" onClick={handleClick}>
          Create my account
        </button>
      </Form>
    </Container>
  );
}
