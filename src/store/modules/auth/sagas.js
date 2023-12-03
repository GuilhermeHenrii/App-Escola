import { call, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { get } from 'lodash';
import history from '../../../services/history';
import * as actions from './actions';
import * as types from '../types';
import axios from '../../../services/axios';

function* loginRequest({ payload }) {
  // pegando apenas o objeto "payload" do payload
  // delete axios.defaults.headers.Authorization;
  try {
    const response = yield call(axios.post, '/tokens', payload);
    yield put(actions.loginSuccess({ ...response.data }));

    console.log(payload);
    console.log(axios.defaults.headers);

    toast.success('Login efetuado com sucesso');

    axios.defaults.headers.Authorization = `Bearer ${response.data.token}`;

    history.push(payload.prevPath);
    history.go(0);
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

export default all([
  takeLatest(types.LOGIN_REQUEST, loginRequest),
  takeLatest(types.PERSIST_REHYDRATE, persistRehydrate), // A ação REHYDRATE é enviada automaticamente pelo persistor durante o processo de reidratação.
]);
