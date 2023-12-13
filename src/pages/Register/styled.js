import styled from 'styled-components';
import * as colors from '../../config/colors';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 20px;

  label {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }

  input {
    height: 40px;
    font-size: 18px;
    border: 1px solid #ddd;
    padding: 0px 10px;
    border-radius: 10px;
    margin-top: 5px;

    &:focus {
      border: solid ${colors.primaryColor};
    }
  }

  button#deleteUser {
    margin-top: 10px;
  }
`;
