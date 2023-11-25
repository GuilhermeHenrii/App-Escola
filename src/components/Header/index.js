import React from 'react';
import { FaHome, FaSignInAlt, FaUserAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { Nav } from './styled';

export default function Header() {
  // Manipulando o estado no qual foi disparado uma action a partir do index.js de Login
  // Podemos ver que o estado é acessivel a toda a aplicação
  const clickedBtn = useSelector((state) => state.example.clickedBtn); // useSelector irá "escutar" quando o estado for atualizado. Esse valor está sendo passado para clickedBtn.
  // tive que adicionar a chave example pois, no rootReducer atribui o valor do estado a uma chave. (example: exampleReducer)
  return (
    <Nav>
      <Link to="/">
        <FaHome size={24} />
      </Link>
      <Link to="/login">
        <FaUserAlt size={24} />
      </Link>
      <Link to="/logout">
        <FaSignInAlt size={24} />
      </Link>
      {clickedBtn ? 'Botão clicado' : 'Botao não clicado'}{' '}
      {/* Se clickedBtn = true 'botao clicado', se for = false 'botao nao clicado' */}
    </Nav>
  );
}
