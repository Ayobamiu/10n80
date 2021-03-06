import API from "./../../assets/js/api";
import { returnErrors } from "./errorActions";

import {
  COURSE_INPUT_CHANGE,
  GET_ALL_COURSES_SUCCESS,
  GET_ALL_COURSES_FAILURE,
  GET_SINGLE_COURSE_SUCCESS,
  GET_SINGLE_COURSE_FAILURE,
  POPULATE_DASHBOARD_SUCCESS,
  POPULATE_DASHBOARD_FAILURE,
  GET_PERFORMANCE_SUCCESS,
  GET_PERFORMANCE_FAILURE,
  GET_PERFORMANCE_IN_CLASS_SUCCESS,
  GET_PERFORMANCE_IN_CLASS_FAILURE,
} from "./types";

export const inputChange = (name, value) => async (dispatch) => {
  try {
    dispatch({
      type: COURSE_INPUT_CHANGE,
      payload: {
        name,
        value,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

export const getCourses = () => async (dispatch) => {
  try {
    // document.body.classList.add("loading-indicator");

    const result = await API.getCourses();

    dispatch({
      type: GET_ALL_COURSES_SUCCESS,
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
        "GET_ALL_COURSES_FAILURE"
      )
    );
    dispatch({
      type: GET_ALL_COURSES_FAILURE,
    });
  }
};

export const getCourse = (data) => async (dispatch) => {
  try {
    document.body.classList.add("loading-indicator");
    const result = await API.getCourse(data);

    let classNoteCount = 0;
    let videoLessonCount = 0;
    let quizQuestionsCount = 0;

        
    const subjects = result.data.data.course.relatedSubjects;
    let i;
    for (i = 0; i < subjects.length; i++) {
      classNoteCount += subjects[i].relatedLessons.length;
    }

    let k;
    for (k = 0; k < subjects.length; k++) {
      let relatedLessons = subjects[k].relatedLessons;
      let l = 0;
      for (l = 0; l < relatedLessons.length; l++) {
        videoLessonCount += relatedLessons[l].videoUrls.length;
        if (relatedLessons[l].questions && relatedLessons[l].questions.length) {
          quizQuestionsCount += relatedLessons[l].questions.length;
        }
      }
    }

   
    dispatch({
      type: GET_SINGLE_COURSE_SUCCESS,
      payload: {
        classNoteCount,
        videoLessonCount,
        quizQuestionsCount,
        course: result.data.data.course,
        subjectCount: result.data.data.course.relatedSubjects.length,
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
        "GET_SINGLE_COURSE_FAILURE"
      )
    );
    dispatch({
      type: GET_SINGLE_COURSE_FAILURE,
    });
  }
};

export const populateDashboard = (data) => async (dispatch) => {
  try {
    // document.body.classList.add("loading-indicator");
    const result = await API.populateDashboard(data);
    let excelling,
      average,
      belowAverage,
      noRating = [];
    let excellingText = "";
    let averageText = "";
    let belowAverageText = "";
    let noRatingText = "";

    if (
      Object.keys(result.data.data).length &&
      Object.keys(result.data.data.subjectsList).length
    ) {
      let subjects = result.data.data.subjectsList;
      excelling = subjects.filter((item) => item.performance > 70);
      average = subjects.filter(
        (item) => item.performance > 40 && item.performance < 70
      );
      belowAverage = subjects.filter(
        (item) =>
          item.performance < 40 &&
          item.performance >= 0 &&
          item.performance !== null
      );
      noRating = subjects.filter((item) => item.performance === null);

      excelling.forEach((element) => {
        excellingText += element.subject + "&nbsp;&nbsp;&nbsp;";
      });
      average.forEach((element) => {
        averageText += element.subject + "&nbsp;&nbsp;&nbsp;";
      });
      belowAverage.forEach((element) => {
        belowAverageText += element.subject + "&nbsp;&nbsp;&nbsp;";
      });
      noRating.forEach((element) => {
        noRatingText += element.subject + "&nbsp;&nbsp;&nbsp;";
      });
    }
    dispatch({
      type: POPULATE_DASHBOARD_SUCCESS,
      payload: {
        dashboard: result.data.data,
        excelling: excelling.length,
        average: average.length,
        belowAverage: belowAverage.length,
        noRating: noRating.length,
        excellingText,
        averageText,
        belowAverageText,
        noRatingText,
      },
    });
    document.body.classList.remove("loading-indicator");
  } catch (err) {
    document.body.classList.remove("loading-indicator");
    dispatch(
      returnErrors(
        err.response && err.response.data.errors
          ? err.response && err.response.data.errors
          : err.response && err.response.data.error,
        err.response && err.response.data.status,
        "POPULATE_DASHBOARD_FAILURE"
      )
    );
    dispatch({
      type: POPULATE_DASHBOARD_FAILURE,
    });
  }
};

export const getPerformance = (data) => async (dispatch) => {
  try {
    document.body.classList.add("loading-indicator");
    const result = await API.getPerformance(data);
    let barChart = [];
    let barChartTitles = [];
    let overallProgress = 0;
    let overallPerformance = 0;

    if (result.data.data.subjectsList.length) {
      barChart = result.data.data.subjectsList.map((item) => {
        overallProgress += overallProgress + item.progress;
        if (typeof item.performance == "number") {
          overallPerformance += overallPerformance + item.performance;
        }

        return {
          key: item.subject,
          value: item.progress,
        };
      });
      overallProgress = overallProgress / 100;
      overallPerformance = overallPerformance / 100;
    }

    if (result.data.data.subjectsList.length) {
      barChartTitles = result.data.data.subjectsList.map((item) => {
        return item.subject;
      });
    }

    dispatch({
      type: GET_PERFORMANCE_SUCCESS,
      payload: {
        data: result.data.data,
        barChart,
        barChartTitles,
        overallPerformance,
        overallProgress,
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
        "GET_PERFORMANCE_FAILURE"
      )
    );
    dispatch({
      type: GET_PERFORMANCE_FAILURE,
    });
  }
};

export const getPerformanceInClass = (courseId, data) => async (
  dispatch
) => {
  try {
    document.body.classList.add("loading-indicator");
    const result = await API.getPerformanceInClass(courseId, data);
    let barChart = [];
    let barChartTitles = [];
    let overallProgress = 0;
    let overallPerformance = 0;

    if (result.data.data.subjectsList.length) {
      barChart = result.data.data.subjectsList.map((item) => {
        overallProgress += overallProgress + item.progress;
        if (typeof item.performance == "number") {
          overallPerformance += overallPerformance + item.performance;
        }

        return {
          key: item.subject,
          value: item.progress,
        };
      });
      overallProgress = overallProgress / 100;
      overallPerformance = overallPerformance / 100;
    }

    if (result.data.data.subjectsList.length) {
      barChartTitles = result.data.data.subjectsList.map((item) => {
        return item.subject;
      });
    }

    dispatch({
      type: GET_PERFORMANCE_IN_CLASS_SUCCESS,
      payload: {
        data: result.data.data,
        barChart,
        barChartTitles,
        overallPerformance,
        overallProgress,
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
        "GET_PERFORMANCE_IN_CLASS_FAILURE"
      )
    );
    dispatch({
      type: GET_PERFORMANCE_IN_CLASS_FAILURE,
    });
  }
};
