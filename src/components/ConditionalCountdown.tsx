import { useState, useEffect, useCallback, memo } from 'react';
import styled from 'styled-components';
import CountDown from './CountDown';

const ConditionalCountdownWrapper = styled.div`
  color: ${({ theme }) => theme.textColors.secondary};
`;

interface ConditionalCountdownProps {
  startsAt: number;
  endsAt: number;
}

const ConditionalCountdown: React.VFC<
  ConditionalCountdownProps & React.HTMLAttributes<HTMLDivElement>
> = ({ startsAt, endsAt, ...props }) => {
  const [countdownType, setCountdownType] = useState<number>(0);
  const [duration, setDuration] = useState<number | null>(null);

  useEffect(() => {
    const now = Math.floor(new Date().getTime() / 1000);

    if (startsAt > now) {
      setCountdownType(1);
    } else if (endsAt > now) {
      setCountdownType(2);
    } else {
      setCountdownType(3);
    }
  }, [endsAt, startsAt]);

  useEffect(() => {
    const now = Math.floor(new Date().getTime() / 1000);
    if (countdownType === 1 && startsAt > now) {
      setDuration(startsAt - now);
    } else if (countdownType === 2 && endsAt > now) {
      setDuration(endsAt - now);
    } else {
      setDuration(0);
    }
  }, [startsAt, endsAt, countdownType]);

  const handleCountdownEnd = useCallback(() => {
    if ([1, 2].includes(countdownType)) {
      setDuration(null);

      return [1, 2].includes(countdownType)
        ? setCountdownType((prevState) => prevState + 1)
        : null;
    } else {
      setDuration(0);
    }
  }, [countdownType]);

  return (
    <ConditionalCountdownWrapper {...props}>
      {duration !== null && duration > 0 && (
        <>
          {countdownType === 1 && <p>Auction Starts In</p>}
          {countdownType === 2 && <p>Auction Ends In</p>}
        </>
      )}
      {duration !== null && duration >= 0 && (
        <CountDown duration={duration} onCountdownEnd={handleCountdownEnd} />
      )}
    </ConditionalCountdownWrapper>
  );
};

export default memo(ConditionalCountdown);
