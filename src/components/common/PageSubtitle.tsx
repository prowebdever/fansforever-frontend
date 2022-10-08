import styled from 'styled-components';

const PageSubtitle = styled.h3`
  width: 100%;
  text-align: center;
  font-family: 'Space Grotesk';
  font-style: normal;
  font-weight: normal;
  font-size: 29px;
  line-height: 37px;
  color: ${({ theme }) => theme.textColors.secondary};
  margin-bottom: 40px;

  @media screen and (max-width: 575.99px) {
    width: 90%;
    margin: 0 auto 40px auto;
    font-size: 22px;
    line-height: 28px;
  }
`;

export default PageSubtitle;
