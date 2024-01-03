import React, { useDebugValue, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { GiConfirmed } from 'react-icons/gi';
import { MdBlock } from 'react-icons/md';
import { toast } from 'react-toastify';
import { Container } from './style';
import Loading from '../Loading';
import axios from '../../services/axios';
import history from '../../services/history';

// container modal
export default function Modal({ isOpen, aluno, index, onClose }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isStudents, setIsStudents] = useState([]);

  useEffect(() => {
    // executa quando o componente funional é renderizado
    async function getData() {
      setIsLoading(true); // antes de executar a requisição o loading será true
      try {
        const response = await axios.get('/alunos');
        setIsStudents(response.data);
        setIsLoading(false); // apos a requisição isLoading será false e sumirá da tela
      } catch (error) {
        console.error('Erro ao carrega dados', error);
      } finally {
        setIsLoading(false);
      }
    }

    getData();
  }, []);

  const handleYesClick = async () => {
    try {
      onClose();
      await axios.delete(`/alunos/${aluno.id}`);
      const newStudents = [...isStudents];
      newStudents.splice(index, 1);
      setIsStudents(newStudents);
      setIsLoading(false);
      toast.success('Aluno deletado com sucesso');
      window.setTimeout(() => {
        history.go(0);
      }, 2000);
    } catch (error) {
      const status = (error, 'response.status', 0);
      if (status === 401) {
        toast.error('Você precisa fazer login');
      } else {
        toast.error('Ocorreu um erro ao excluir aluno');
      }
      setIsLoading(false);
    }
  };
  const handleNoClick = () => {
    // eslint-disable-next-line
    onClose();
  };

  if (isOpen) {
    return (
      <Container>
        <div>
          <span> Quer mesmo remover essse aluno(a) ? </span>
        </div>
        {/* eslint-disable-next-line */}
        <div className="options">
          <GiConfirmed size={30} onClick={(e) => handleYesClick()} />
          <MdBlock size={30} onClick={handleNoClick} />
        </div>
        ;{/* })} */}; ;
      </Container>
    );
  }
}

Modal.defaultProps = {
  isOpen: false,
};

Modal.propTypes = {
  isOpen: PropTypes.bool,
};
