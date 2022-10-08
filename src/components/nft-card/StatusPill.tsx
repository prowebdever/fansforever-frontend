import styled from 'styled-components';
import FlexRowWrapper from 'components/common/FlexRowWrapper';

const StatusPillWrapper = styled.div`
  min-width: 101px;
  height: 27px;
  position: absolute;
  right: 14px;
  top: 28px;
  z-index: 30;

  background: ${({ theme }) => theme.accentColors.primary};
  border-radius: 66px;

  ${FlexRowWrapper} {
    justify-content: flex-start;
    align-items: center;
    flex-flow: row nowrap;
  }

  .dot {
    width: 13px;
    height: 13px;
    background: #86ff92;
    border-radius: 50%;
    margin: 7px;
  }

  p {
    font-family: Inter;
    font-style: normal;
    font-weight: bold;
    font-size: 12px;
    line-height: 15px;
    color: ${({ theme }) => theme.textColors.primary};
    padding-right: 12px;
  }
`;

const StatusPill: React.VFC<{ text: string }> = ({ text }) => {
  return (
    <StatusPillWrapper>
      <FlexRowWrapper>
        <div className="dot"></div>
        <p>{text}</p>
      </FlexRowWrapper>
    </StatusPillWrapper>
  );
};

export default StatusPill;
