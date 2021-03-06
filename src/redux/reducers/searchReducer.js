import {
  GET_ALL_SEARCH_RESULTS_SUCCESS,
  SEARCH_INPUT_CHANGE,
} from "../actions/types";

const initialState = {
  searchResults: [],
  searchText: "",
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_INPUT_CHANGE:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };

    case GET_ALL_SEARCH_RESULTS_SUCCESS:
      return {
        ...state,
        searchResults: action.payload.lessons,
      };

    default:
      return state;
  }
};
export default searchReducer;
