import {
  FETCHING_PROFILE,
  SET_PROFILE,
  FETCHING_PROFILE_FAILED,
  SHOW_FOLLOW,
  SHOW_OWNER_CHAT_MODAL
} from '../actions/userActions';

const initialState = {
  isFetchingProfile: false,
  profile: null,
  error: null,
  selectedProfile: null,
  isOpneFollowModal: false,
  selectedFollowData: [],
  isfollow: false,
  isOpenOwnerChatModal: false,
  selectedAuctionId: 0,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_PROFILE:
      return Object.assign({}, state, {
        isFetchingProfile: true,
      });

    case SET_PROFILE:
      return {
        ...state,
        ...{
          isFetchingProfile: false,
          profile: action.payload,
        },
      };
    case SHOW_FOLLOW:
      return {
        ...state,
        ...{
          isOpneFollowModal: action.payload.show,
          selectedFollowData: action.payload.followdata,
          isfollow: action.payload.isfollow
        }
      };
      case SHOW_OWNER_CHAT_MODAL:
        console.log(action.payload)
        return {
          ...state,
          ...{
            isOpenOwnerChatModal: action.payload.show,
            selectedAuctionId: action.payload.selectedAuctionId,
          }
        };
      case FETCHING_PROFILE_FAILED:
      return { ...initialState, ...{ error: action.payload } };

    default:
      return state;
  }
};

export default userReducer;
