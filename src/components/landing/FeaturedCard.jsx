import styled from 'styled-components';

import image from '../../assets/nft/image 3.png';

const linearGradientsArray = [
  'linear-gradient(180deg, rgba(95, 91, 255, 0.72) 0%, rgba(35, 51, 74, 0.72) 100%)',
  'linear-gradient(180deg, rgba(91, 196, 255, 0.72) 0%, rgba(35, 51, 74, 0.72) 100%)',
  'linear-gradient(180deg,rgba(255, 91, 91, 0.72) 0%,rgba(35, 51, 74, 0.72) 100%)',
];

const FeaturedCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  padding: 50px 44px;

  width: 390px;
  height: 244px;

  z-index: 100;

  background: ${(props) => linearGradientsArray[props.idx]},
    url('${(props) => props.img}');
  border-radius: 11px;

  @media screen and (max-width: 1199.99px) {
    width: 340px;
    height: 228px;
    margin-bottom: 28px;
  }

  h2 {
    font-family: Space Grotesk;
    font-style: normal;
    font-weight: bold;
    font-size: 31px;
    line-height: 40px;

    color: #ffffff;
    margin: 0 0 18px 0;
  }

  h3 {
    font-family: Inter;
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 24px;

    color: rgba(255, 255, 255, 0.46);
    margin: 0 0 18px 0;
  }

  .bid-now {
    font-family: Inter;
    font-style: normal;
    font-weight: bold;
    font-size: 17px;
    line-height: 21px;
    text-transform: uppercase;

    color: #ffffff;
  }
`;

const FeaturedCard = ({ idx, cardTitle, cardInfo }) => {
  return (
    <FeaturedCardWrapper idx={idx} img={image}>
      <h2>{cardTitle}</h2>
      <h3>{cardInfo}</h3>
      <h4 className="bid-now">Bid now&nbsp;&rarr;</h4>
    </FeaturedCardWrapper>
  );
};

export default FeaturedCard;
