import styled from 'styled-components';

const PageTitle = styled.h1`
  width: 100%;
  text-align: center;
  font-family: 'Space Grotesk';
  font-style: normal;
  font-weight: 600;
  font-size: 40px;
  line-height: 49px;
  text-align: center;
  text-transform: capitalize;
  color: ${({ theme }) => theme.textColors.primary};
  margin-bottom: 12px;
`;

export default PageTitle;
