import React from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';

import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import history from '../../services/history';
import { Container } from '../../styles/GlobalStyles';
import { Title, Form } from './styled';
import Loading from '../../components/Loading';
import axios from '../../services/axios';
import * as actions from '../../store/modules/auth/actions';

export default function Photos({ match }) {
  const dispatch = useDispatch();
  const id = get(match, 'params.id', '');

  const [isLoading, setIsLoading] = React.useState(false);
  const [foto, setFoto] = React.useState('');

  React.useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/alunos/${id}`);
        setFoto(get(data, 'Fotos[0].url', ''));
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        toast.error('Erro ao obter imagem');
        history.push('/');
        window.setInterval(() => {
          history.go(0);
        }, 2500);
      }
    };

    getData();
  }, [id]);

  const handleChange = async (e) => {
    const sendPicture = e.target.files[0];
    const fotoURL = URL.createObjectURL(sendPicture);

    setFoto(fotoURL);

    const formData = new FormData();
    formData.append('aluno_id', id);
    formData.append('picture', sendPicture);

    try {
      setIsLoading(true);
      await axios.post('/picture/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Foto enviada com sucesso');
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      const { status } = get(err, 'response', '');
      toast.error('Erro ao enviar foto');

      if (status === 401) {
        dispatch(actions.loginFailure());
        toast.error('Faça login para continuar');
        history.push('/login/');
        window.setTimeout(() => {
          history.go(0);
        }, 2500);
      }
    }
  };

  return (
    <Container>
      <Title>Envie sua foto</Title>
      <Loading isLoading={isLoading} />

      <Form>
        <label htmlFor="foto">
          <input type="file" id="foto" onChange={handleChange} />
          {/* Evento handleChange vai tratar de pegar a imagem enviada e seta ela como a imagem a ser exibida na tela */}
          {foto ? <img src={foto} alt="foto" id="foto" /> : 'Selecionar'}
        </label>
      </Form>
    </Container>
  );
}

Photos.propTypes = {
  match: PropTypes.shape({}).isRequired,
};
