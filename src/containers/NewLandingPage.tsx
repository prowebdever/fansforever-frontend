import styled from 'styled-components';

import Container from '../components/layout/Container';
import Banner from '../components/Banner';
import PoweredBySection from '../components/new-landing/PoweredBySection';
import SellingPoints from '../components/new-landing/SellingPoints';
import InfoSection from '../components/new-landing/InfoSection';
import HeroSection from '../components/new-landing/HeroSection';

const NewLandingPageWrapper = styled.div`
  min-height: 100vh;
  background: #222b38;

  padding-bottom: 68px;
`;

const NewLandingPage = () => {
  return (
    <NewLandingPageWrapper>
      <Container>
        <HeroSection />
        <InfoSection />
        <SellingPoints />
        <PoweredBySection />
        <Banner />
      </Container>
    </NewLandingPageWrapper>
  );
};

export default NewLandingPage;
