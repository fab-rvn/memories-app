import * as userTypes from "./userTypes";

export const userInitialState = {
  isLoading: false,
  error: null,
  posts: [],
};

const userReducer = (state = userInitialState, action) => {
  switch (action.type) {
    case userTypes.FETCH_USER_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case userTypes.FETCH_USER_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    }
    case userTypes.FETCH_USER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        user: action.payload.user,
        posts: action.payload.userPosts,
      };
    }
    case userTypes.UPDATE_USER: {
      return {
        ...state,
        isLoading: false,
        user: action.payload,
      };
    }
    default:
      return state;
  }
};

export default userReducer;
