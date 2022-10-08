import styled from 'styled-components';

const SectionTitleWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-top: 45px;
  margin-bottom: 52px;

  h2 {
    flex: 0 1 auto;
    font-family: Clash Grotesk;
    font-style: normal;
    font-weight: bold;
    font-size: 37px;
    line-height: 46px;
    text-transform: uppercase;
    white-space: nowrap;
    color: ${({ theme }) => theme.textColors.tertiary};
  }

  .line {
    margin-left: 40px;
    flex: 0 1 100%;
    height: 0px;
    border: 1px solid ${({ theme }) => theme.textColors.tertiary};
  }
`;

const SectionTitle: React.VFC<{ title: string }> = ({ title }) => {
  return (
    <SectionTitleWrapper>
      <h2>{title}</h2>
      <div className="line" />
    </SectionTitleWrapper>
  );
};

export default SectionTitle;
