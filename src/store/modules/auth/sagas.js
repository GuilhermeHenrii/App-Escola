import { call, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { get } from 'lodash';
import { useRouteMatch } from 'react-router-dom';
import history from '../../../services/history';
import * as actions from './actions';
import * as types from '../types';
import axios from '../../../services/axios';

function* loginRequest({ payload }) {
  // pegando apenas o objeto "payload" do payload
  // delete axios.defaults.headers.Authorization
  try {
    const response = yield call(axios.post, '/tokens', payload);
    yield put(actions.loginSuccess({ ...response.data }));

    console.log(payload);
    console.log(axios.defaults.headers);

    toast.success('Login efetuado com sucesso', {
      autoClose: 2000,
    });

    axios.defaults.headers.Authorization = `Bearer ${response.data.token}`;

    history.push(payload.prevPath);

    window.setTimeout(() => {
      history.go(0);
    }, 2000);
  } catch (e) {
    toast.error('Email ou senha inválidos.');

    yield put(actions.loginFailure());
  }
}

// função para configurar a action persistRehydrate que é diaparada pelo redux nativamente,toda vez que essa action for disparada, iremos configurar o Authorization para para receber o token
// isso foi feito para tratar o fato de que o token só é enviado quando a action é disparada ao fazer login na aplicação, sendo assim, o saga só intercepta nesse momento e apenas nesse momento que o authoriztion é setado.
// fazendo com que ele seja perdido quando acessamos outras rotas
function persistRehydrate({ payload }) {
  const token = get(payload, 'auth.token', ''); // fazendo um get no token do usuario dentro do stado reidratado
  console.log(payload);
  if (!token) return;
  axios.defaults.headers.Authorization = `Bearer ${token}`;
}

// função que irá tratar a requisição para se registrar na aplicação
// eslint-disable-next-line consistent-return
function* registerRequest({ payload }) {
  const { id, nome, email, password } = payload;
  try {
    if (id) {
      yield call(axios.put, '/users', {
        email,
        nome,
        password: password || undefined, // curto circuito
      });
      toast.success('Dados atualizados com sucesso');

      // disparando a action para atualizar os dados
      yield put(actions.registerUpdatedSuccess({ nome, email, password }));
    } else {
      yield call(axios.post, '/users', {
        email,
        nome,
        password,
      });
      yield put(actions.registerCreatedSuccess());

      history.push('/login');
      window.setInterval(() => {
        history.go(0);
      }, 2000);

      toast.success('Conta criada com sucesso');
    }
  } catch (e) {
    const errors = get(e, 'response.data.errors', []);
    const status = get(e, 'response.status', 0);

    if (status === 401) {
      toast.warn('Você precisa logar novamernte antes de continuar');
      yield put(actions.loginFailure());
      history.push('/login');
      return window.setInterval(() => {
        history.go(0);
      }, 2500);
    }

    if (errors.length > 0) {
      errors.map((error) => toast.error(error));
    } else {
      toast.error('Erro descohecido');
    }

    // disparando a action para se registrar na aplicação
    yield put(actions.registerFailure());
  }
}

export default all([
  takeLatest(types.LOGIN_REQUEST, loginRequest),
  takeLatest(types.PERSIST_REHYDRATE, persistRehydrate), // A ação REHYDRATE é enviada automaticamente pelo persistor durante o processo de reidratação.
  takeLatest(types.REGISTER_RESQUEST, registerRequest),
]);
