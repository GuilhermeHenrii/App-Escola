import styled from 'styled-components';

export const StudentContainer = styled.div`
  margin-top: 15px;

  div.student {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 0;
  }

  div.student + div.student {
    border-top: 1px solid #eee;
  }

  div > span {
    width: 150px;
    display: flex;
    justify-content: start;
  }
`;

export const ProfilePicture = styled.div`
  img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
  }
`;
