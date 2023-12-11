import styled from 'styled-components';
import * as colors from '../../config/colors';

export const Title = styled.h1`
  text-align: center;
`;

export const Form = styled.form`
  label {
    width: 180px;
    height: 180px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #eee;
    margin: 30px auto;
    border: 5px dashed ${colors.primaryColor};
    cursor: pointer;
    border-radius: 50%;
    overflow: hidden;

    input#foto {
      display: none;
    }
  }

  img {
    width: 180px;
    height: 180px;
  }
`;
