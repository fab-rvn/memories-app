import * as postTypes from "./postTypes";

export const postInitialState = {
  isLoaded: false,
  isLoading: false,
  error: null,
  posts: [],
  post: null,
  currentPostId: null,
};

const postReducer = (state = postInitialState, action) => {
  switch (action.type) {
    case postTypes.POST_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case postTypes.POST_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    }
    case postTypes.POST_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        posts: [...state.posts, action.payload],
      };
    }
    case postTypes.FETCH_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    }
    case postTypes.FETCH_POST_BY_ID: {
      return {
        ...state,
        isLoading: false,
        post: action.payload.data,
        relatedPosts: action.payload.relatedPosts.filter(
          (post) => post._id !== action.payload.data._id,
        ),
      };
    }
    case postTypes.GET_POST_ID: {
      return {
        ...state,
        isLoading: false,
        currentPostId: action.payload,
      };
    }
    case postTypes.RESET_POST_ID: {
      return {
        ...state,
        currentPostId: null,
      };
    }
    case postTypes.RESET_POST_STATE: {
      return {
        ...postInitialState,
      };
    }
    case postTypes.UPDATE_POST: {
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post,
        ),
        post: action.payload,
      };
    }
    case postTypes.DELETE_POST: {
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };
    }
    case postTypes.COMMENT_POST: {
      return {
        ...state,
        post: action.payload,
      };
    }
    case postTypes.COMMENT_DELETE: {
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        post: {
          ...state.post,
          comments: state.post.comments.filter((c) => c._id !== action.payload),
        },
      };
    }
    default:
      return state;
  }
};

export default postReducer;
