import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { get } from 'lodash'; // lodash será responsável de tratar, caso um aluno não possua uma foto
import { FaUserCircle, FaEdit, FaWindowClose } from 'react-icons/fa';

import { toast } from 'react-toastify';
import { Container } from '../../styles/GlobalStyles';
import axios from '../../services/axios';
import { StudentContainer, ProfilePicture } from './styled';
import Loading from '../../components/Loading';
import history from '../../services/history';

export default function Students() {
  // useState recebe o valor inicial da variavel
  // e retorna o valor setado e a função para setar esse valor
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // setando valor padrao de isLoading
  console.log(students);

  useEffect(() => {
    // executa quando o componente funional é renderizado
    async function getData() {
      setIsLoading(true); // antes de executar a requisição o loading será true
      const response = await axios.get('/alunos');
      setStudents(response.data);
      setIsLoading(false); // apos a requisição isLoading será false e sumirá da tela
    }

    getData();
  }, []);

  const handleDelete = async (aluno, index) => {
    try {
      setIsLoading(true);
      // poderia implementar um modal aqui
      // eslint-disable-next-line
      const confirm = window.confirm(
        `Tem certeza que deseja excluir o(a) aluno(a) ${aluno.nome} ?`
      );
      if (!confirm) return;

      const deletedStudent = await axios.delete(`/alunos/${aluno.id}`);
      console.log(deletedStudent);

      const newStudents = [...students];
      newStudents.splice(index, 1);
      setStudents(newStudents);
      setIsLoading(false);
      toast.success('Aluno deletado com sucesso');

      // window.setTimeout(() => {
      //   history.go(0);
      // }, 2000);
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

  return (
    <Container>
      <Loading isLoading={isLoading} />

      <h1>Students</h1>

      <StudentContainer>
        {students.map((aluno) => (
          <div key={String(aluno.id)} className="student">
            <ProfilePicture>
              {get(aluno, 'Fotos[0].url', false) ? (
                <img src={`${aluno.Fotos[0].url}`} alt="" />
              ) : (
                <FaUserCircle size={36} />
              )}
            </ProfilePicture>

            <span>{aluno.nome}</span>
            <span>{aluno.email}</span>
            <Link to={`/aluno/${aluno.id}/edit`}>
              <FaEdit size={16} />
            </Link>
            <Link
              // aqui o onclick executa uma função anonima ja pegando o evento e prevenindo o mesmo
              // assim, podemos disparar o evendo, prevenir, e chamar o handleDelete passando o id do aluno
              onClick={(e) => {
                e.preventDefault();
                handleDelete(aluno, students.index);
              }}
              to={`/aluno/${aluno.id}/delete`}
            >
              <FaWindowClose size={16} />
            </Link>
          </div>
        ))}
      </StudentContainer>
    </Container>
  );
}
