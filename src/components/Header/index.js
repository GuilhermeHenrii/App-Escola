import React from 'react';
import {
  FaHome,
  FaSignInAlt,
  FaUserAlt,
  FaPowerOff,
  FaUserEdit,
} from 'react-icons/fa';
import { RiRadioButtonLine } from 'react-icons/ri';
import { IoMdPersonAdd } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import * as actions from '../../store/modules/auth/actions';
import history from '../../services/history';

import { Nav } from './styled';

export default function Header() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(actions.loginFailure());
    history.push('/');
    toast.success('Seção encerrada');
    window.setTimeout(() => {
      history.go(0);
    }, 2000);
  };

  return (
    <Nav>
      <Link to="/">
        <FaHome size={24} />
      </Link>

      {isLoggedIn ? (
        <Link to="/register">
          <FaUserEdit size={24} />
        </Link>
      ) : (
        <Link to="/register">
          <IoMdPersonAdd size={24} />
        </Link>
      )}

      {/* Se o usuario estiver logado, renderiza o botao de logout que redireciona para a rota de logout */}
      {isLoggedIn ? (
        <Link onClick={handleLogout} to="/logout">
          <FaPowerOff size={24} />
        </Link>
      ) : (
        <Link to="/login">
          <FaSignInAlt size={24} />
        </Link>
      )}

      {/* Ícone para informar usuario logado */}
      {isLoggedIn && (
        <RiRadioButtonLine size={24} color="#33cc33" title="Online" />
      )}
    </Nav>
  );
}
