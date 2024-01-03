import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { get } from 'lodash'; // lodash será responsável de tratar, caso um aluno não possua uma foto
import { FaUserCircle, FaEdit, FaWindowClose } from 'react-icons/fa';
import { MdAdd } from 'react-icons/md';

import { toast } from 'react-toastify';
import { Container } from '../../styles/GlobalStyles';
import axios from '../../services/axios';
import {
  StudentContainer,
  ProfilePicture,
  NewStudentLink,
  ContainerTitle,
  Title,
} from './styled';
import Loading from '../../components/Loading';
import history from '../../services/history';
import Modal from '../../components/Modal';

export default function Students() {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedIndexStudent, setSelectedIndexStudent] = useState(null);

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

  console.log(students);
  const handleDeleteAsk = (e, aluno, index) => {
    e.preventDefault();
    // e.persist();

    // tentar de alguma forma passar esses valores para o componente do modal
    // passando valores do aluno e seu index para o modal
    setSelectedStudent(aluno);
    setSelectedIndexStudent(index);
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  return (
    <>
      <Container>
        {/* eslint-disable-next-line */}
        {/* AQUI ESTAMOS INJETANDO OS VALORES DO ALUNO DENTRO DO COMPONENTE DE MODAL, DESSA FORMA CONSEGUIREMOS PASSAR OS VALORES DO ALUNO(E SEU INDICE) QUE ESTÁ SENDO DELETADO */}
        <Modal
          isOpen={isOpenModal}
          aluno={selectedStudent}
          index={selectedIndexStudent}
          onClose={handleCloseModal}
        />
        <Loading isLoading={isLoading} />
        <ContainerTitle>
          <Title>Students</Title>

          <NewStudentLink to="/aluno/">
            <MdAdd />
          </NewStudentLink>
        </ContainerTitle>

        <StudentContainer>
          {students.map((aluno, index) => (
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
                onClick={(e) => handleDeleteAsk(e, aluno, index)}
                to={`/aluno/${aluno.id}/delete`}
              >
                <FaWindowClose size={16} />
              </Link>
            </div>
          ))}
        </StudentContainer>
      </Container>
    </>
  );
}
