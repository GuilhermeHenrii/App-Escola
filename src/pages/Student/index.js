import React from 'react';
import { get, set } from 'lodash';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { toast } from 'react-toastify';
import { isEmail, isFloat, isInt, isNumeric } from 'validator';
// import { isFloat } from 'validator/lib/isFloat';
import { Container } from '../../styles/GlobalStyles';
import { Form } from './styled';
import axios from '../../services/axios';
import history from '../../services/history';
import Loading from '../../components/Loading';
import * as actions from '../../store/modules/auth/actions';

export default function Student({ match }) {
  // const { id } = props.match.params;
  // console.log(id);
  const dispatch = useDispatch();
  const id = get(match, 'params.id', 0);

  const [name, setName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [age, setAge] = React.useState('');
  const [weight, setWeight] = React.useState('');
  const [height, setHeight] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (!id) {
      // setIsLoading(false);
      return;
    }
    async function getData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/alunos/${id}`);
        const Foto = get(data, 'Fotos[0].url', ''); // pegando a url da ultima imagem enviada do aluno

        setName(data.nome);
        setLastName(data.sobrenome);
        setEmail(data.email);
        setAge(data.idade);
        setWeight(data.peso);
        setHeight(data.altura);
        setIsLoading(false);
        console.log(Foto);
      } catch (err) {
        setIsLoading(false);
        const status = get(err, 'response.status', 0);
        const errors = get(err, 'response.data.errors', []);
        console.log(err.response.status);

        if (status === 400) errors.map((error) => toast.error(error));

        history.push('/');
        window.setTimeout(() => {
          history.go(0);
        }, 2000);
      }
    }

    getData();
  }, [id]);

  function containsNumber(string) {
    return /\d/.test(string);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(name, lastName, email, age, weight, height);

    let formErrors = false;

    if (name.length < 2 || name.length > 80) {
      formErrors = true;
      toast.error('Nome precisa ter entre 2 e 80 caracteres');
    }
    if (lastName.length < 2 || lastName > 80) {
      formErrors = true;
      toast.error('Sobrenome precisa ter entre 2 e 80 caracteres');
    }
    if (containsNumber(name) || containsNumber(lastName)) {
      formErrors = true;
      toast.error('Nome e sobrenome não podem conter números');
    }
    if (!isEmail(email)) {
      formErrors = true;
      toast.error('E-mail inválido');
    }
    if (!isInt(String(age)) || age <= 0) {
      formErrors = true;
      toast.error('Digite uma idade válida');
    }
    if (!isFloat(String(weight))) {
      formErrors = true;
      toast.error('Digite um peso válido');
    }
    if (!isFloat(String(height))) {
      formErrors = true;
      toast.error('Digite uma altura válida');
    }

    if (formErrors) return;

    try {
      setIsLoading(true);
      if (id) {
        // editando...
        await axios.patch(`/alunos/${id}`, {
          nome: name,
          sobrenome: lastName,
          email, // nomes da chave e do valor são iguais
          idade: age,
          peso: weight,
          altura: height,
        });
        toast.success('Dados atualizados com sucesso');
      } else {
        // criando...
        const { data } = await axios.post(`/alunos/`, {
          nome: name,
          sobrenome: lastName,
          email,
          idade: age,
          peso: weight,
          altura: height,
        });
        toast.success('Aluno criado com sucesso');
        // quando o aluno for criado, a pagina sera redirecionada para a pagina de edição desse aluno criado
        history.push(`/aluno/${data.id}/edit`);
        window.setTimeout(() => {
          history.go(0);
        }, 2000);
      }
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      const status = get(err, 'response.status', 0);
      const data = get(err, 'response.data', {});
      const errors = get(data, 'errors', []);

      if (errors.length > 0) {
        errors.map((error) => toast.error(error));
      } else {
        toast.error('Erro desconhecido');
      }

      // se a requisição retornar um erro 401 (não autoriado), o usuário é deslogado na hora
      // token invalido ou expirado, ou alguma tentativa maliciosa de acesso, cairá nesse erro
      if (status === 401) {
        dispatch(actions.loginFailure());
      }
    }
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>{id ? 'Edit Student' : 'New Student'}</h1>

      <Form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            placeholder="Name"
          />
        </label>
        <label htmlFor="last-name">
          Last name:
          <input
            type="text"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            placeholder="Last Name"
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Email"
          />
        </label>
        <label htmlFor="age">
          Age:
          <input
            type="number"
            value={age}
            onChange={(e) => {
              setAge(e.target.value);
            }}
            placeholder="Age"
          />
        </label>
        <label htmlFor="weight">
          Weight:
          <input
            type="text"
            value={weight}
            onChange={(e) => {
              setWeight(e.target.value);
            }}
            placeholder="Weight"
          />
        </label>
        <label htmlFor="height">
          Height
          <input
            type="number"
            value={height}
            onChange={(e) => {
              setHeight(e.target.value);
            }}
            placeholder="Height"
          />
        </label>
        <button type="submit">Enviar</button>
      </Form>
    </Container>
  );
}
