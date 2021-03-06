import API from "./../../assets/js/api";
import { returnErrors } from "./errorActions";

import {
  INPUT_CHANGE,
  GET_ROLES_SUCCESS,
  GET_ROLES_FAILURE,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  CLEAR_FORM,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  RESET_PASSWORD_FAILURE,
  RESET_PASSWORD_SUCCESS,
  PASSWORD_CHANGE_FAILURE,
  PASSWORD_CHANGE_SUCCESS,
  SOCIAL_LOGIN_UPDATE_SUCCESS,
  SOCIAL_LOGIN_UPDATE_FAILURE,
  COURSE_ENROLMENT_SUCCESS,
  COURSE_ENROLMENT_FAILURE,
  AUTH_SUCCESS,
  AUTH_FAILURE,
  LOAD_QUESTIONS_SUCCESS,
  LOAD_QUESTIONS_FAILURE,
  CHECK_USER_AND_JOIN_CLASS_FAILURE,
  UPDATE_PROFILE_SUCCES,
  UPDATE_PROFILE_FAILURE,
  PASSWORD_CHANGE_FROM_PROFILE_SUCCESS,
  PASSWORD_CHANGE_FROM_PROFILE_FAILURE,
  LOGOUT_SUCCESS,
  UPDATE_PROFILE_PIC_SUCCESS,
  UPDATE_PROFILE__PIC_FAILURE,
} from "./types";

export const inputChange = (name, value) => async (dispatch) => {
  try {
    dispatch({
      type: INPUT_CHANGE,
      payload: {
        name: name,
        value: value,
      },
    });
  } catch (error) {
    console.error(error);
  }
};
export const checkUserExists = (email, classId) => async (dispatch) => {
  try {
    document.body.classList.add("loading-indicator");
    await API.checkUserExistJoinClass(email, classId);
    dispatch(
      returnErrors(
        "Class request has been approved. Login to continue",
        "200",
        "CHECK_USER_AND_JOIN_CLASS_SUCCESS"
      )
    );
    document.body.classList.remove("loading-indicator");
  } catch (err) {
    document.body.classList.remove("loading-indicator");
    dispatch(
      returnErrors(
        err.response.data.errors
          ? err.response.data.errors
          : err.response.data.error,
        err.response.data.status,
        "CHECK_USER_AND_JOIN_CLASS_FAILURE"
      )
    );
    dispatch({
      type: CHECK_USER_AND_JOIN_CLASS_FAILURE,
    });
  }
};

export const getRoles = () => async (dispatch) => {
  try {
    document.body.classList.add("loading-indicator");
    const result = await API.getRoles();
    dispatch({
      type: GET_ROLES_SUCCESS,
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
        "GET_ROLES_FAILURE"
      )
    );
    dispatch({
      type: GET_ROLES_FAILURE,
    });
  }
};
export const registerUser = (user) => async (dispatch) => {
  try {
    document.body.classList.add("loading-indicator");
    const result = await API.registerUser(user);
    dispatch({
      type: CLEAR_FORM,
    });
    dispatch({
      type: REGISTER_SUCCESS,
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
        "REGISTER_FAILURE"
      )
    );
    dispatch({
      type: REGISTER_FAILURE,
    });
  }
};
export const loginUser = (user, google = false, facebook = false) => async (
  dispatch
) => {
  try {
    document.body.classList.add("loading-indicator");
    let result = null;
    if (google) {
      result = await API.socialLoginGoogle(user);
    } else if (facebook) {
      result = await API.socialLoginFacebook(user);
    } else {
      result = await API.login(user);
    }
    dispatch({
      type: LOGIN_SUCCESS,
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
        "LOGIN_FAILURE"
      )
    );
    dispatch({
      type: LOGIN_FAILURE,
    });
  }
};
export const resetPassword = (user) => async (dispatch) => {
  try {
    document.body.classList.add("loading-indicator");
    const result = await API.resetPassword(user);
    dispatch({
      type: RESET_PASSWORD_SUCCESS,
      payload: result.data.data,
    });
    dispatch({
      type: CLEAR_FORM,
    });
    dispatch(
      returnErrors(
        "Password reset code sent to your email",
        "200",
        "RESET_PASSWORD_SUCCESS"
      )
    );
    document.body.classList.remove("loading-indicator");
  } catch (err) {
    document.body.classList.remove("loading-indicator");
    dispatch(
      returnErrors(
        err.response.data.errors
          ? err.response.data.errors
          : err.response.data.error,
        err.response.data.status,
        "RESET_PASSWORD_FAILURE"
      )
    );
    dispatch({
      type: RESET_PASSWORD_FAILURE,
    });
  }
};
export const updateProfile = (user) => async (dispatch) => {
  try {
    document.body.classList.add("loading-indicator");
    await API.updateProfile(user);
    dispatch({
      type: UPDATE_PROFILE_SUCCES,
    });
    dispatch(
      returnErrors(
        "Profile Updated Successfully!",
        "200",
        "UPDATE_PROFILE_SUCCES"
      )
    );
    document.body.classList.remove("loading-indicator");
  } catch (err) {
    document.body.classList.remove("loading-indicator");
    dispatch(
      returnErrors(
        err.response.data.errors
          ? err.response.data.errors
          : err.response.data.error,
        err.response.data.status,
        "UPDATE_PROFILE_FAILURE"
      )
    );
    dispatch({
      type: UPDATE_PROFILE_FAILURE,
    });
  }
};

export const changePassword = (user) => async (dispatch) => {
  try {
    document.body.classList.add("loading-indicator");
    await API.changePassword(user);
    dispatch({
      type: PASSWORD_CHANGE_SUCCESS,
    });
    dispatch(
      returnErrors(
        "Password changed successfully",
        "200",
        "PASSWORD_CHANGE_SUCCESS"
      )
    );
    document.body.classList.remove("loading-indicator");
  } catch (err) {
    document.body.classList.remove("loading-indicator");
    dispatch(
      returnErrors(
        err.response.data.errors
          ? err.response.data.errors
          : err.response.data.error,
        err.response.data.status,
        "PASSWORD_CHANGE_FAILURE"
      )
    );
    dispatch({
      type: PASSWORD_CHANGE_FAILURE,
    });
  }
};

export const changePasswordFromProfile = (user) => async (dispatch) => {
  try {
    document.body.classList.add("loading-indicator");
    await API.changePasswordDirectly(user);
    dispatch({
      type: PASSWORD_CHANGE_FROM_PROFILE_SUCCESS,
    });
    dispatch(
      returnErrors(
        "Password changed successfully",
        "200",
        "PASSWORD_CHANGE_FROM_PROFILE_SUCCESS"
      )
    );
    document.body.classList.remove("loading-indicator");
  } catch (err) {
    document.body.classList.remove("loading-indicator");
    dispatch(
      returnErrors(
        err.response.data.errors
          ? err.response.data.errors
          : err.response.data.error,
        err.response.data.status,
        "PASSWORD_CHANGE_FROM_PROFILE_FAILURE"
      )
    );
    dispatch({
      type: PASSWORD_CHANGE_FROM_PROFILE_FAILURE,
    });
  }
};
export const socialLoginUpdate = (user, course) => async (dispatch) => {
  try {
    document.body.classList.add("loading-indicator");
    const result = await API.socialLoginUpdate(user);
    dispatch({
      type: SOCIAL_LOGIN_UPDATE_SUCCESS,
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
        "SOCIAL_LOGIN_UPDATE_FAILURE"
      )
    );
    dispatch({
      type: SOCIAL_LOGIN_UPDATE_FAILURE,
    });
  }
};
export const courseEnrolment = (user) => async (dispatch) => {
  try {
    document.body.classList.add("loading-indicator");
    await API.courseEnrolment(user);
    dispatch({
      type: COURSE_ENROLMENT_SUCCESS,
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
        "COURSE_ENROLMENT_FAILURE"
      )
    );
    dispatch({
      type: COURSE_ENROLMENT_FAILURE,
    });
  }
};
export const loadUser = () => async (dispatch) => {
  try {
    document.body.classList.add("loading-indicator");
    const result = await API.loadUser();

    dispatch({
      type: GET_ROLES_SUCCESS,
      payload: result.data.data,
    });

    dispatch({
      type: AUTH_SUCCESS,
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
        "AUTH_FAILURE"
      )
    );
    dispatch({
      type: AUTH_FAILURE,
    });
  }
};
export const loadQuestions = (subjectId) => async (dispatch) => {
  try {
    document.body.classList.add("loading-indicator");
    const result = await API.loadQuestions(subjectId);
    let questions = [];
    let questionTags = [];
    let questionTime = 60;
    let theSubjectId = -1;
    let motivations = [];

    if (result.data.error === false) {
      theSubjectId = result.data.subject_details.subject_id;
      questions = result.data.questions;
      let questionLength = questions.length;
      for (let i = 0; i < questionLength; i++) {
        questionTags.push(1);
      }
      questionTime = result.data.subject_details.duration;
      questionTime = questionTime * 1000 * 60;
      motivations = result.data.motivations;
    }

    dispatch({
      type: LOAD_QUESTIONS_SUCCESS,
      payload: {
        questions,
        questionTags,
        questionTime,
        theSubjectId,
        motivations,
      },
    });

    document.body.classList.remove("loading-indicator");
  } catch (err) {
    document.body.classList.remove("loading-indicator");
    dispatch({
      type: LOAD_QUESTIONS_FAILURE,
    });
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch({
      type: LOGOUT_SUCCESS,
    });
  } catch (error) {
    console.error(error);
  }
};

export const updateProfilePicture = (profilePhotoUrl) => async (dispatch) => {
  try {
    document.body.classList.add("loading-indicator");
    await API.updateProfilePic(profilePhotoUrl);

    dispatch({
      type: UPDATE_PROFILE_PIC_SUCCESS,
    });

    dispatch(
      returnErrors(
        "Image update succesfully",
        "200",
        "UPDATE_PROFILE_PIC_SUCCESS"
      )
    );

    document.body.classList.remove("loading-indicator");
  } catch (err) {
    document.body.classList.remove("loading-indicator");
    dispatch(
      returnErrors(
        err.response.data.errors
          ? err.response.data.errors
          : err.response.data.error,
        err.response.data.status,
        "UPDATE_PROFILE__PIC_FAILURE"
      )
    );
    dispatch({
      type: UPDATE_PROFILE__PIC_FAILURE,
    });
  }
};
