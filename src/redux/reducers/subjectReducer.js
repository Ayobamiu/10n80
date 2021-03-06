import {
  GET_SUBJECT_AND_RELATED_LESSONS_SUCCESS,
  ADD_SUBJECT_PROGRESS_SUCCESS,
  ADD_RECENT_ACTIVITIES_SUCCESS,
} from "../actions/types";

const initialState = {
  subject: {},
  lessonSubjectName: "",
  lessonSubjectId: "",
  totalNumberOfLessons: 0,
  subjectProgresses: [],
  numOfUsers:0
};

const subjectReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SUBJECT_AND_RELATED_LESSONS_SUCCESS:
      return {
        ...state,
        subject: action.payload.subject,
        lessonSubjectName: action.payload.subject.mainSubjectId.name,
        lessonSubjectId: action.payload.subject._id,
        numOfUsers: action.payload.numOfUsers
      };
    case ADD_SUBJECT_PROGRESS_SUCCESS:
      return {
        ...state,
      };
    case ADD_RECENT_ACTIVITIES_SUCCESS:
      return {
        ...state,
      };

    default:
      return state;
  }
};
export default subjectReducer;
