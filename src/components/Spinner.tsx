import styled from 'styled-components';

const Spinner = styled.div`
  display: inline-block;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 3px solid ${({ theme }) => `${theme.textColors.tertiary}77`};
  border-top-color: ${({ theme }) => theme.textColors.primary};
  animation: spin 1s ease-in-out infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export default Spinner;
