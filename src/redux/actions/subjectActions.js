import API from "../../assets/js/api";
import { returnErrors } from "./errorActions";

import {
  GET_SUBJECT_AND_RELATED_LESSONS_SUCCESS,
  GET_SUBJECT_AND_RELATED_LESSONS_FAILURE,
  ADD_RECENT_ACTIVITIES_FAILURE,
  ADD_RECENT_ACTIVITIES_SUCCESS,
  ADD_SUBJECT_PROGRESS_FAILURE,
  ADD_SUBJECT_PROGRESS_SUCCESS,
} from "./types";

export const getSubjectAndRelatedLessons = (courseId, subjectId) => async (
  dispatch
) => {
  try {
    document.body.classList.add("loading-indicator");
    const result = await API.getSubjectAndRelatedLessons(courseId, subjectId);
   
    dispatch({
      type: GET_SUBJECT_AND_RELATED_LESSONS_SUCCESS,
      payload: {
        subject: result.data.data.subject,
        numOfUsers:result.data.data.numOfUsers
      },
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
        "GET_SUBJECT_AND_RELATED_LESSONS_FAILURE"
      )
    );
    dispatch({
      type: GET_SUBJECT_AND_RELATED_LESSONS_FAILURE,
    });
  }
};

export const addSubjectProgress = (
  classId,
  lessonId,
  subjectId,
  courseId,
  recommended,
  reason, 
  type
) => async (dispatch) => {
  try {
    document.body.classList.add("loading-indicator");
    await API.addSubjectProgress(
      classId,
      lessonId,
      subjectId,
      courseId,
      recommended,
      reason,
      type
    );
    dispatch({
      type: ADD_SUBJECT_PROGRESS_SUCCESS,
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
        "ADD_SUBJECT_PROGRESS_FAILURE"
      )
    );
    dispatch({
      type: ADD_SUBJECT_PROGRESS_FAILURE,
    });
  }
};

export const addRecentActivity = (lessonId, type) => async (dispatch) => {
  try {
    document.body.classList.add("loading-indicator");
    await API.addRecentActivity(lessonId, type);
    dispatch({
      type: ADD_RECENT_ACTIVITIES_SUCCESS,
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
        "ADD_RECENT_ACTIVITIES_FAILURE"
      )
    );
    dispatch({
      type: ADD_RECENT_ACTIVITIES_FAILURE,
    });
  }
};
