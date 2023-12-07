import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { get } from 'lodash'; // lodash será responsável de tratar, caso um aluno não possua uma foto
import { FaUserCircle, FaEdit, FaWindowClose } from 'react-icons/fa';

import { Container } from '../../styles/GlobalStyles';
import axios from '../../services/axios';
import { StudentContainer, ProfilePicture } from './styled';
import Loading from '../../components/Loading';

export default function Students() {
  // useState recebe o valor inicial da variavel
  // e retorna o valor setado e a função para setar esse valor
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // setando valor padrao de isLoading

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
            <Link to={`/aluno/${aluno.id}/delete`}>
              <FaWindowClose size={16} />
            </Link>
          </div>
        ))}
      </StudentContainer>
    </Container>
  );
}
