import ExternalLink from 'components/common/ExternalLink';

import { ReactComponent as IpfsLogo } from 'assets/logos/ipfs_logo.svg';

const ViewOnIPFS: React.VFC<{ link: string }> = ({ link }) => {
  return (
    <ExternalLink href={link} target="_blank" rel="noopener noreferrer">
      <IpfsLogo />
      View On IPFS
    </ExternalLink>
  );
};

export default ViewOnIPFS;
