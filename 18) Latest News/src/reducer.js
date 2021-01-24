import {
  SET_LOADING,
  SET_STORIES,
  REMOVE_STORY,
  HANDLE_PAGE,
  HANDLE_SEARCH,
} from './actions';

const reducer = (state, action) => {
  // checking for action types
  switch (action.type) {
    // CASE 1)
    case SET_LOADING:
      return { ...state, isLoading: true };
    // CASE 2)
    case SET_STORIES:
      return {
        ...state,
        isLoading: false,
        hits: action.payload.hits,
        nbPages: action.payload.nbPages,
      };
    // CASE 3)
    case REMOVE_STORY:
      return {
        ...state,
        hits: state.hits.filter((story) => story.objectID !== action.payload),
      };
    // CASE 4)
    case HANDLE_SEARCH:
      return {
        ...state,
        query: action.payload,
        page: 0,
      };
    // CASE 5)
    case HANDLE_PAGE:
      if (action.payload === 'inc') {
        const newPage = state.page + 1;
        if (newPage >= state.nbPages) {
          return {
            ...state,
            page: 0,
          };
        }
        return {
          ...state,
          page: newPage,
        };
      }
      if (action.payload === 'dec') {
        const newPage = state.page - 1;
        if (newPage < 0) {
          return {
            ...state,
            page: state.nbPages - 1,
          };
        }
        return {
          ...state,
          page: newPage,
        };
      }
    // CASE 6)
    default:
      throw new Error(`No matching "${action.type}" action`);
  }
};
export default reducer;
