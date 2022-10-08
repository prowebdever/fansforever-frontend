import styled from 'styled-components';

const BidAmountInputWrapper = styled.div`
  max-width: 30%;

  @media screen and (max-width: 700.99px) {
    margin-top: 20px;
  }
  display: flex;
  align-items: center;
  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    margin: 0;
  }

  position: relative;

  .trx-value {
    width: 200px;
    height: 48px;
    border: 2px solid ${({ theme }) => theme.accentColors.primary};
    border-radius: 8px 0 0 8px;
    background: ${({ theme }) => theme.backgroundColors.secondary};
    color: ${({ theme }) => theme.textColors.primary};
    padding: 5px 10px;
    font-size: 18px;
    font-weight: bold;
  }

  .crypto-symbol {
    margin-right: none;
    width: 60px;
    height: 48px;
    display: grid;
    place-items: center;
    background: ${({ theme }) => theme.accentColors.primary};
    font-family: Inter;
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 22px;
    letter-spacing: -0.21px;
    text-transform: uppercase;
    color: ${({ theme }) => theme.textColors.primary};
    border-radius: 0 8px 8px 0;
  }
`;

interface BidAmountInputProps {
  isTrxAuction: boolean;
  bidAmount: string;
  onBidAmountInput: (value: string) => void;
}

const BidAmountInput: React.VFC<BidAmountInputProps> = ({
  isTrxAuction,
  bidAmount,
  onBidAmountInput,
}) => {
  return (
    <BidAmountInputWrapper>
      <input
        className="trx-value"
        type="number"
        step=".01"
        value={bidAmount}
        onChange={(e) => {
          const exp = new RegExp(/^(0|[1-9]\d*)(\.\d{0,2})?$/); // Allow only numbers and decimal places upto 2 digits.
          const { value } = e.target;
          if (value === '' || exp.test(value)) {
            onBidAmountInput(value);
          }
        }}
      />
      <div className="crypto-symbol">{isTrxAuction ? 'trx' : 'usdt'}</div>
    </BidAmountInputWrapper>
  );
};

export default BidAmountInput;
