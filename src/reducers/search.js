import {
  CHANGE_SEARCH_INPUT,
  SEARCHING
} from '../actions/actionTypes'

const initialState = {
  searchString: '',
  isSearching: false
};

export default function searchReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_SEARCH_INPUT:
      const {searchString} = action.payload;
      return {
        ...state,
        searchString
      };
    case SEARCHING:
      return {
        ...state,
        isSearching: !state.isSearching
      };
    default:
      return state;
  }
}