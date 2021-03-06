import {
  GET_SINGLE_CLASS_SUCCESS,
  GET_CLASSES_SUCCESS,
  USER_JOIN_THROUGH_INVITE_SUCCESS,
  SEND_CLASS_INVITE_SUCCESS,
  ACCEPT_REJECT_CLASSMEMBER_SUCCESS,
  ADD_CLASS_SUCCESS,
  ADD_ANNOUNCEMENT_SUCCESS,
} from "../actions/types";

const initialState = {
  classes: [],
  class: {},
  classMembers: [],
};

const classReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SINGLE_CLASS_SUCCESS:
      return {
        ...state,
        class: action.payload.class,
        classMembers: action.payload.classMembers,
      };
    case GET_CLASSES_SUCCESS:
      return {
        ...state,
        classes: action.payload.classes,
      };
    case USER_JOIN_THROUGH_INVITE_SUCCESS:
      return {
        ...state,
      };
    case SEND_CLASS_INVITE_SUCCESS:
      return {
        ...state,
      };
    case ACCEPT_REJECT_CLASSMEMBER_SUCCESS:
      return {
        ...state,
      };
    case ADD_CLASS_SUCCESS:
      return {
        ...state,
      };
    case ADD_ANNOUNCEMENT_SUCCESS:
      return {
        ...state,
      };

    default:
      return state;
  }
};
export default classReducer;
