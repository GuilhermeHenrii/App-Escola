import React, { useState } from 'react';

import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import { get } from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { Container } from '../../styles/GlobalStyles';
import { Form } from './styled';
import axios from '../../services/axios';
import history from '../../services/history';
import Loading from '../../components/Loading';
import * as actions from '../../store/modules/auth/actions';

export default function Register(props) {
  // const authData = useSelector((state) => console.log(state.auth)); // logando o estado da aplicação

  // const prevPath = get(props, 'location.state.prevPath');
  const dispatch = useDispatch();

  // pegando os dados do localStorage
  const emailStorage = useSelector((state) => state.auth.user.email);
  const id = useSelector((state) => state.auth.user.id);
  const nomeStorage = useSelector((state) => state.auth.user.nome);
  const isLoading = useSelector((state) => state.auth.isLoading);

  const [nome, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoadingComponent, setIsLoadingComponent] = useState(false);

  React.useEffect(() => {
    // hook useEffect está lidando com o efeito colateral de manipular os dados do localStorage
    if (!id) return;

    setName(nomeStorage);
    setEmail(emailStorage);
  }, [emailStorage, id, nomeStorage]);

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

    if (!id && (password.length < 6 || password.length > 50)) {
      formErrors = true;
      toast.error('Senha deve ter entre 6 e 50 caracteres');
    }

    if (!isEmail(email)) {
      formErrors = true;
      toast.error('Email inválido');
    }

    if (formErrors) return;

    // setIsLoading(true);

    // disparando o register com as informações do localStorage
    // dentro dessa saga iremos criar a lógica de regitro e alteração de dados do usuário
    // vale destacar que o mais viável seria separar esses componentes para suas respectivas funcionalidades
    // pois sem essa diisão, o código ganha mais complexidade
    dispatch(
      actions.registerRequest({
        nome,
        email,
        password,
        id,
      })
    );
  }

  const handleDeleteUser = async (e) => {
    e.preventDefault();

    if (!id) {
      toast.error('Não foi possivel deletar a sua conta');
    }

    try {
      setIsLoadingComponent(true);
      const response = await axios.delete(`/users/`);
      setIsLoadingComponent(false);
      toast.success('Conta deletada com sucesso');
      window.setTimeout(() => {
        dispatch(actions.loginFailure());
        history.push('/');
        history.go(0);
      }, 2500);
    } catch (err) {
      console.log(e);
    }
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <Loading isLoading={isLoadingComponent} />
      <h1>{id ? 'Editar dados' : 'Create your account'}</h1>

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
          {id ? 'Salvar' : 'Create my account'}
        </button>
        <button type="submit" onClick={handleDeleteUser} id="deleteUser">
          Deletar minha conta
        </button>
      </Form>
    </Container>
  );
}
