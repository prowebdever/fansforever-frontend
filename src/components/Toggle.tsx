import styled from 'styled-components';

const ToggleWrapper = styled.div<{ isToggleOn: boolean }>`
  background: ${(props) => (props.isToggleOn ? '#ff3465' : '#ff346577')};
  height: 14px;
  width: 28px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  cursor: pointer;

  .knob {
    position: relative;
    width: 10px;
    height: 10px;
    background: #222b38;
    border-radius: 50%;
    left: 2px;
    transition: left 0.2s ease-out;
  }

  .knob.active {
    left: 16px;
  }
`;

interface ToggleProps {
  isToggleOn: boolean;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

const Toggle: React.VFC<ToggleProps> = ({ isToggleOn, onClick }) => {
  return (
    <ToggleWrapper onClick={onClick} isToggleOn={isToggleOn}>
      <div className={isToggleOn ? 'knob active' : 'knob'} />
    </ToggleWrapper>
  );
};

export default Toggle;
