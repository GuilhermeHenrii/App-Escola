import styled from 'styled-components';

export const Container = styled.div`
  // css do modal (simples)
  width: 250px;
  height: 25vh;
  color: black;
  background-color: white;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  z-index: 1;

  div {
    text-align: center;
    margin-top: 35px;
  }

  div.options {
    display: flex;
    justify-content: space-around;

    /* Preciso que o curso pointer fique apenas nos icones e nao na div inteira */
    cursor: pointer;
  }
`;
