import React from 'react';
import { get, set } from 'lodash';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { toast } from 'react-toastify';
import { isEmail, isFloat, isInt, isNumeric } from 'validator';
// import { isFloat } from 'validator/lib/isFloat';
import { FaEdit, FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Container } from '../../styles/GlobalStyles';
import { Form, ProfilePicture, Title } from './styled';
import axios from '../../services/axios';
import history from '../../services/history';
import Loading from '../../components/Loading';
import * as actions from '../../store/modules/auth/actions';

export default function Student({ match }) {
  // const { id } = props.match.params;
  // console.log(id);
  const dispatch = useDispatch();
  const id = get(match, 'params.id', '');

  const [name, setName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [age, setAge] = React.useState('');
  const [weight, setWeight] = React.useState('');
  const [height, setHeight] = React.useState('');
  const [foto, setFoto] = React.useState('');
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
        setFoto(Foto);

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
      <Title>{id ? 'Editar aluno' : 'Novo Aluno'}</Title>

      {id && (
        // container para a foto do aluno
        <ProfilePicture>
          {/* Se a foto tiver uma url true, será renderizada, caso contrário, um icone será renderizado */}
          {foto ? <img src={foto} alt={name} /> : <FaUserCircle size={180} />}
          <Link to={`/fotos/${id}`}>
            {/* Na mesma div da foto, terá um ícone para a edição da mesma, que enviará uma requisição para o servidor, na url que é responsável por criar uma nova foto e tratra-la */}
            <FaEdit size={24} />
          </Link>
        </ProfilePicture>
      )}

      <Form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Nome:
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            placeholder="nome"
          />
        </label>
        <label htmlFor="last-name">
          Sobrenome:
          <input
            type="text"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            placeholder="sobrenome"
          />
        </label>
        <label htmlFor="email">
          E-mail:
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="e-mail"
          />
        </label>
        <label htmlFor="age">
          Idade:
          <input
            type="number"
            value={age}
            onChange={(e) => {
              setAge(e.target.value);
            }}
            placeholder="idade"
          />
        </label>
        <label htmlFor="Peso">
          Peso:
          <input
            type="text"
            value={weight}
            onChange={(e) => {
              setWeight(e.target.value);
            }}
            placeholder="peso"
          />
        </label>
        <label htmlFor="Altura">
          Altura
          <input
            type="number"
            value={height}
            onChange={(e) => {
              setHeight(e.target.value);
            }}
            placeholder="altura"
          />
        </label>
        <button type="submit">Enviar</button>
      </Form>
    </Container>
  );
}
