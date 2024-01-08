import React, { useDebugValue, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { GiConfirmed } from 'react-icons/gi';
import { MdBlock } from 'react-icons/md';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { Container } from './style';
import Loading from '../Loading';
import axios from '../../services/axios';
import history from '../../services/history';
import * as actions from '../../store/modules/auth/actions';

export default function UserModal({ isOpen, idUser, onClose }) {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteUser = async () => {
    onClose();

    if (!idUser) {
      toast.error('Não foi possivel deletar a sua conta');
      return;
    }

    try {
      const response = await axios.delete(`/users/`);
      toast.success('Conta deletada com sucesso');
      window.setTimeout(() => {
        dispatch(actions.loginFailure());
        history.push('/');
        history.go(0);
      }, 2500);
    } catch (err) {
      console.log(err);
    }
  };

  const handletNoDeleteUser = () => {
    onClose();
  };

  if (isOpen) {
    return (
      <Container>
        <Loading isLoading={isLoading} />
        <div>
          <span> Tem certeza que deseja remover sua conta ? </span>
        </div>
        {/* eslint-disable-next-line */}
        <div className="options">
          <GiConfirmed size={30} onClick={handleDeleteUser} />
          <MdBlock size={30} onClick={handletNoDeleteUser} />
        </div>
      </Container>
    );
  }
}

UserModal.defaultProps = {
  isOpen: false,
};

UserModal.propTypes = {
  // eslint-disable-next-line
  isOpen: PropTypes.bool,
};
