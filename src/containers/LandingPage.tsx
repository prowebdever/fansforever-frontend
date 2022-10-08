import styled from 'styled-components';
// import { useEffect, useState } from 'react';
import useAuctionsListQuery from 'hooks/auction/useAuctionsListQuery';

import Container from 'components/layout/Container';
import AuctionCardsSection from 'components/AuctionCardsSection';
import Banner from 'components/Banner';
import Footer from 'components/layout/Footer';
import useConversionRateQuery from 'hooks/auction/useConversionRateQuery';
import RecommendedPostSection from 'components/landing/recommended/RecommendedPostSection';
import HotPostsSection from 'components/landing/hot-posts/HotPostsSection';
import { CircularProgress } from '@mui/material';
import { useEffect } from 'react'
const LandingPageWrapper = styled.div`
  min-height: calc(100vh - 50px);
  background: ${({ theme }) => theme.backgroundColors.primary};

  padding-bottom: 68px;
`;

const LandingPage: React.VFC = () => {
  const conversionRateQuery = useConversionRateQuery({
    coingeckoCryptoId: 'tron,tether',
    coingeckoCurrency: 'usd',
  });
  useEffect(() => {
    window.scroll(0, 0);
  });  
  const auctionsListQuery = useAuctionsListQuery();
  return (
    <LandingPageWrapper>
      {conversionRateQuery?.data?
        <Container>
          <RecommendedPostSection
            conversionRate={conversionRateQuery?.data?.data}
          />
          <HotPostsSection conversionRate={conversionRateQuery?.data?.data} />
          <AuctionCardsSection auctions={auctionsListQuery?.data?.data || []} />
        </Container> 
        : <CircularProgress />
      }
      <Banner />
      <Footer />
    </LandingPageWrapper>
  );
};

export default LandingPage;
