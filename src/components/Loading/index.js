import React from 'react';
import PropTypes from 'prop-types';
import { Container } from './style';

// container de loading
export default function Loading({ isLoading }) {
  if (isLoading) {
    return (
      <Container>
        <div>
          <span>Carregando...</span>
        </div>
      </Container>
    );
  }
}

// definindo os valores default das props
Loading.defaultProps = {
  isLoading: false,
};

// definindo o tipo de dado das props e se é ou não requerida
Loading.propTypes = {
  isLoading: PropTypes.bool,
};
