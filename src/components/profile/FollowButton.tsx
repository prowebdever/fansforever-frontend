import styled from 'styled-components';
import config from 'config';
const FollowButtonWrapper = styled.div`
  height: 32px;
  background: ${({ theme }) => theme.accentColors.primary};
  border-radius: 25px;
  width: 80px;
  display: grid;
  place-items: center;

  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;

  text-align: center;
  text-transform: capitalize;
  letter-spacing: -0.21px;

  color: #ffffff;
  cursor: pointer;
`;

interface FollowButtonProps {
  text: string;
  myWalletAddress: string;
  profiledata: any;
  setData: any;
}

const FollowButton: React.VFC<FollowButtonProps> = ({ text, profiledata, myWalletAddress, setData }) => {
  const followHandler = async (e)=>{
    e.preventDefault();
    if(text === "follow") {
      const response = await fetch(`${config.apiBaseUrl}/profile/follow`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          followprofiledata: profiledata,
          myWalletAddress : myWalletAddress
        }),
      });
      const result = await response.json();
      console.log(result)
      setData(result)
    } else {
      const response = await fetch(`${config.apiBaseUrl}/profile/unfollow`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          followprofiledata: profiledata,
          myWalletAddress : myWalletAddress
        }),
      });
      const result = await response.json();
      setData(result)
    }
  }

  return <FollowButtonWrapper onClick={(e)=>followHandler(e)}>{text}</FollowButtonWrapper>;
};

export default FollowButton;
