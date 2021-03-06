import API from "../../assets/js/api";
import { returnErrors } from "./errorActions";

import {
  GET_ALL_SEARCH_RESULTS_SUCCESS,
  GET_ALL_SEARCH_RESULTS_FAILURE,
  SEARCH_INPUT_CHANGE
} from "./types";


export const searchInputChange = (name, value) => async (dispatch) => {
  try {
    dispatch({
      type: SEARCH_INPUT_CHANGE,
      payload: {
        name: name,
        value: value,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

export const getSearchResults = (searchQuery) => async (dispatch) => {
  try {
    document.body.classList.add("loading-indicator");
    const result = await API.getSearchResults(searchQuery);
    dispatch({
      type: GET_ALL_SEARCH_RESULTS_SUCCESS,
      payload: result.data.data,
    });
    document.body.classList.remove("loading-indicator");
  } catch (err) {
    document.body.classList.remove("loading-indicator");
    dispatch(
      returnErrors(
        err.response.data.errors
          ? err.response.data.errors
          : err.response.data.error,
        err.response.data.status,
        "GET_ALL_SEARCH_RESULTS_FAILURE"
      )
    );
    dispatch({
      type: GET_ALL_SEARCH_RESULTS_FAILURE,
    });
  }
};
