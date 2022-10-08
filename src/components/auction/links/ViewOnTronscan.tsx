import ExternalLink from 'components/common/ExternalLink';

import { ReactComponent as TronLogo } from 'assets/logos/tron_logo.svg';

const ViewOnTronscan: React.VFC<{ link: string }> = ({ link }) => {
  return (
    <ExternalLink href={link} target="_blank" rel="noopener noreferrer">
      <TronLogo />
      View On Tronscan
    </ExternalLink>
  );
};

export default ViewOnTronscan;
