import styled, { useTheme } from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { RootState } from 'store';
import { showModal } from 'actions/userActions'
import { useHistory } from 'react-router';


const SelectWalletWrapper = styled.div`
  h3 {
    font-size: 20px;
    border-bottom: 1px solid ${({ theme }) => theme.textColors.tertiary};
    padding: 20px;
  }
  .follower-image {
    float: left;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    cursor: pointer;
    color: ${({ theme }) => theme.textColors.tertiary};
  }
`;

const FollowModal: React.VFC = () => {

  const { isOpneFollowModal, selectedFollowData, isfollow } = useSelector(
    (state: RootState) => state.user
  );
  const theme = useTheme();
  const dispatch = useDispatch();
  const history = useHistory()
  return (
            <Modal
            open={isOpneFollowModal}
            onClose={() => dispatch(showModal({type: false, show: false,followdata: {}}))}
            center
            styles={{
            modalContainer: {
                background: 'rgba(255, 255, 255, 0.1)',
            },
            modal: {
                padding: 0,
                background: theme.backgroundColors.secondary,
                color: theme.textColors.primary,
                width: '80%',
                maxWidth: '300px',
                borderRadius: '10px',
            },
            closeButton: {
                background: theme.backgroundColors.secondary,
                borderRadius: '50%',
            },
            }}
            >
            <SelectWalletWrapper>
            {isfollow&&
                <>
                <h3>Followers</h3>
                <div style={{display:'grid', padding: '30px', maxHeight: 500}}>
                    {selectedFollowData?.map((follower, index)=>{
                        if(follower){
                            return (<div style={{marginBottom:'10px'}} onClick = {()=>{dispatch(showModal({type: false, show: false,followdata: {}}));history.push('/profile/'+ follower?.userAccountHandle)}}>
                                <img key={"img_"+index} src={follower?.userProfileImageUrl} alt={follower?.username} className="follower-image"  />
                                <div key={"name_"+ index} style={{float:'right', fontSize: '25px', fontWeight: 700}}>{"@"+ follower?.userAccountHandle}</div>
                            </div>)
                        }else {
                            return {}
                        }
                    })}
                </div>
                </>
            }
            {!isfollow&&<h3>Followings</h3>}

            </SelectWalletWrapper>
            </Modal>
  );
};

export default FollowModal;