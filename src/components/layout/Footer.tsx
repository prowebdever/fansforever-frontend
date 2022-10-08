import styled from 'styled-components';
import {
  // ImFacebook2,
  ImTwitter,
} from 'react-icons/im';
// import { SiInstagram, SiYoutube } from 'react-icons/si';
import { FaTelegramPlane } from 'react-icons/fa';

import Container from './Container';
import FlexColumnWrapper from 'components/common/FlexColumnWrapper';

import { ReactComponent as FanLogo } from 'assets/logos/fan_logo.svg';

const FooterWrapper = styled.div`
  margin-top: 68px;

  ${Container} {
    border-top: 1px solid ${({ theme }) => theme.textColors.tertiary};
    padding: 60px 15px;

    .grid {
      display: grid;
      grid-template-columns: 1.5fr 1fr 1fr 1fr 1fr;
      grid-template-areas: ${FlexColumnWrapper} ${FlexColumnWrapper} ${FlexColumnWrapper} ${FlexColumnWrapper} ${FlexColumnWrapper};
      grid-gap: 20px;

      @media screen and (max-width: 998px) {
        grid-template-columns: 2fr 1fr 1fr 1fr;
        justify-content: center;
      }

      @media screen and (max-width: 767.99px) {
        grid-template-columns: 2fr 1fr 1fr;
      }

      @media screen and (max-width: 650px) {
        grid-template-columns: 2fr 1fr;
      }

      @media screen and (max-width: 575.99px) {
        grid-template-columns: 1fr;
      }

      ${FlexColumnWrapper} {
        width: 100%;

        svg {
          color: ${({ theme }) => theme.accentColors.primary};
          margin-bottom: 12px;
        }

        .description {
          max-width: 265px;
          font-family: Inter;
          font-style: normal;
          font-weight: normal;
          font-size: 16px;
          line-height: 28px;
          color: ${({ theme }) => theme.textColors.secondary};
          margin-bottom: 24px;
        }

        .footer-social-links {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          flex-flow: row wrap;

          a {
            width: 40px;
            height: 40px;

            background: ${({ theme }) => theme.backgroundColors.secondary};
            border-radius: 50%;

            display: grid;
            place-items: center;

            margin-right: 18px;

            svg {
              color: ${({ theme }) => theme.textColors.secondary};
              margin-bottom: 0;
            }
          }
        }

        h4.column-heading {
          font-style: normal;
          font-weight: bold;
          font-size: 18px;
          line-height: 23px;
          color: ${({ theme }) => theme.textColors.primary};
          margin-bottom: 32px;
        }

        & > a {
          font-family: Inter;
          font-style: normal;
          font-weight: normal;
          font-size: 16px;
          line-height: 19px;
          color: ${({ theme }) => theme.textColors.secondary};
          text-decoration: none;
          margin-bottom: 28px;

          &:last-of-type {
            margin-bottom: 0;
          }
        }
      }
    }
  }
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <Container>
        <div className="grid">
          <FlexColumnWrapper>
            <FanLogo />
            <p className="description">
              FansForever is a convergence of celebrities and artists to launch
              NFTs together for maximum reach and to make a difference.
            </p>
            <section className="footer-social-links">
              {/* <a
                href="http://google.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ImFacebook2 />
              </a> */}
              <a
                href="https://t.me/thefandiscussion"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTelegramPlane />
              </a>
              <a
                href="https://twitter.com/thefandao"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ImTwitter />
              </a>
              {/* <a
                href="http://google.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SiInstagram />
              </a>
              <a
                href="http://google.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SiYoutube />
              </a> */}
            </section>
          </FlexColumnWrapper>
          <FlexColumnWrapper>
            <h4 className="column-heading">Product</h4>
            <a
              href="http://google.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              landingPage
            </a>
            <a
              href="http://google.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Features
            </a>
            <a
              href="http://google.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Documentation
            </a>
            <a
              href="http://google.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Referral Program
            </a>
            <a
              href="http://google.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Pricing
            </a>
          </FlexColumnWrapper>
          <FlexColumnWrapper>
            <h4 className="column-heading">Services</h4>
            <a
              href="http://google.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Documentation
            </a>
            <a
              href="http://google.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Design
            </a>
            <a
              href="http://google.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Themes
            </a>
            <a
              href="http://google.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Illustrations
            </a>
            <a
              href="http://google.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ui kit
            </a>
          </FlexColumnWrapper>
          <FlexColumnWrapper>
            <h4 className="column-heading">Company</h4>
            <a
              href="http://google.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              About
            </a>
            <a
              href="http://google.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Terms
            </a>
            <a
              href="http://google.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy Pollicy
            </a>
            <a
              href="http://google.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Careers
            </a>
          </FlexColumnWrapper>
          <FlexColumnWrapper>
            <h4 className="column-heading">More</h4>
            <a
              href="http://google.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Documentation
            </a>
            <a
              href="http://google.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              License
            </a>
            <a
              href="http://google.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Changelog
            </a>
          </FlexColumnWrapper>
        </div>
      </Container>
    </FooterWrapper>
  );
};

export default Footer;
