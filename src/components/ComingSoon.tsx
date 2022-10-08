import styled from 'styled-components';

const ComingSoonWrapper = styled.div`
  width: 100%;
  height: calc(100vh - 50px);

  display: flex;
  justify-content: center;
  align-items: center;

  .coming-soon {
    font-family: Inter;
    font-weight: bold;
    font-size: 81px;
    line-height: 98px;
    text-transform: lowercase;
    background: linear-gradient(
      180deg,
      ${({ theme }) => theme.textColors.primary} 0%,
      ${({ theme }) => theme.textColors.tertiary} 100%
    );
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    z-index: 1;

    @media screen and (max-width: 575.99px) {
      font-size: 51px;
      line-height: 62px;
      text-align: center;
    }
  }
`;

const ComingSoon: React.VFC = () => {
  return (
    <ComingSoonWrapper>
      <h1 className="coming-soon">Coming Soon...</h1>
    </ComingSoonWrapper>
  );
};

export default ComingSoon;
