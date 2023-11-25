import styled, { createGlobalStyle } from 'styled-components';
// estilo global da aplicação
import * as colors from '../config/colors';
import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    outline: none;
    box-sizing: border-box;
  }

  body {
    font-family: sans-serif;
    background: ${colors.primaryDarkColor};
    color: ${colors.primaryDarkColor};
  }

  html, body, #root {
    height: 100%;
  }

  button {
    background-color: ${colors.primaryColor};
    border: none;
    cursor: pointer;
    color: #fff;
    padding: 10px 20px;
    border-radius: 4px;
    font-weight: 700;
  }

  a {
    text-decoration: none;
    color: ${colors.primaryColor};
  }

  ul{
    list-style: none;
  }

  // alterando a cor de fundo das notificações
  body .Toastify .Toastify__toast-container .Toastify__toast--success {
    background: black;
  }

  body .Toastify .Toastify__toast-container .Toastify__toast--error {
    background: black;
  }

  // alterando a acor do botão de fechar a notificação
  .Toastify__close-button {
    color: white;
  }
`;

export const Container = styled.section`
  max-width: 360px;
  background: #fff;
  margin: 30px auto;
  padding: 30px;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;
