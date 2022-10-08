import {
  FETCHING_PROFILE,
  SET_PROFILE,
  FETCHING_PROFILE_FAILED,
} from '../actions/userActions';

const initialState = {
  isFetchingProfile: false,
  profile: null,
  error: null,
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

    case FETCHING_PROFILE_FAILED:
      return { ...initialState, ...{ error: action.payload } };

    default:
      return state;
  }
};

export default userReducer;
