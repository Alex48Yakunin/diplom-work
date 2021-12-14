import {
  CHANGE_SEARCH_INPUT,
  SEARCHING
} from '../actions/actionTypes'

const initialState = {
  searchText: '',
  isSearching: false
};

export default function searchReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_SEARCH_INPUT:
      const {searchText} = action.payload;
      return {
        ...state,
        searchText
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