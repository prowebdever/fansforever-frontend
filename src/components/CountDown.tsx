import { useState, useEffect } from 'react';
import styled from 'styled-components';

import FlexColumnWrapper from './common/FlexColumnWrapper';

const CountDownWrapper = styled.div`
  h3 {
    font-family: 'Roboto Mono';
    font-weight: bold;
    font-size: 13px;
    line-height: 16px;
    color: ${({ theme }) => theme.textColors.primary};
  }
`;

const Panel = ({ n }: { n: number }) => <span>{n < 10 ? '0' + n : n}</span>;

interface CountDownProps {
  duration: number;
  onCountdownEnd: () => void;
}

const CountDown: React.VFC<
  CountDownProps & React.HTMLAttributes<HTMLDivElement>
> = ({ duration, onCountdownEnd, ...props }) => {
  const [secondsLeft, setSecondsLeft] = useState(duration);

  useEffect(() => {
    setSecondsLeft(duration);
  }, [duration]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (secondsLeft <= 0) {
        clearInterval(interval);
        onCountdownEnd();
      } else {
        setSecondsLeft((prevState) => prevState - 1);
      }
    }, 1000);

    return () => {
      Boolean(interval) && clearInterval(interval);
    };
  }, [duration, secondsLeft, onCountdownEnd]);

  const days = Math.floor(secondsLeft / 24 / 60 / 60);
  const hoursLeft = Math.floor(secondsLeft - days * 86400);
  const hours = Math.floor(hoursLeft / 3600);
  const minutesLeft = Math.floor(hoursLeft - hours * 3600);
  const minutes = Math.floor(minutesLeft / 60);
  const seconds = secondsLeft % 60;

  return (
    <CountDownWrapper {...props}>
      <FlexColumnWrapper>
        <h3>
          <Panel n={days} />
          d:
          <Panel n={hours} />
          h:
          <Panel n={minutes} />
          m:
          <Panel n={seconds} />s
        </h3>
      </FlexColumnWrapper>
    </CountDownWrapper>
  );
};

export default CountDown;
