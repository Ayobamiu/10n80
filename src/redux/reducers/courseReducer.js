import {
  COURSE_INPUT_CHANGE,
  GET_ALL_COURSES_SUCCESS,
  GET_SINGLE_COURSE_SUCCESS,
  POPULATE_DASHBOARD_SUCCESS,
  GET_PERFORMANCE_SUCCESS,
  GET_PERFORMANCE_IN_CLASS_SUCCESS,
} from "../actions/types";

const initialState = {
  courses: [],
  course: {},
  classNoteCount: 0,
  videoLessonCount: 0,
  quizQuestionsCount:0,
  subjectCount: 0,
  dashboardData: [],
  excelling: 0,
  average: 0,
  belowAverage: 0,
  noRating: 0,
  excellingText: "",
  averageText: "",
  belowAverageText: "",
  noRatingText: "",
  selectedCategory: "Unknown Category",
  performance: [],
  barChart: [],
  barChartTitles: [],
  overallPerformance: 0,
  overallProgress: 0,
  dashboardRoute: false,
  numOfUsers:0
};

const courseReducer = (state = initialState, action) => {
  switch (action.type) {
    case COURSE_INPUT_CHANGE:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };

    case GET_ALL_COURSES_SUCCESS:
      return {
        ...state,
        courses: action.payload.courses,
      };

    case GET_SINGLE_COURSE_SUCCESS:
      return {
        ...state,
        course: action.payload.course,
        classNoteCount: action.payload.classNoteCount,        
        videoLessonCount: action.payload.videoLessonCount,
        quizQuestionsCount :action.payload.quizQuestionsCount,
        subjectCount: action.payload.subjectCount,
        numOfUsers: action.payload.numOfUsers
      };

    case POPULATE_DASHBOARD_SUCCESS:
      return {
        ...state,
        excelling: action.payload.excelling,
        average: action.payload.average,
        belowAverage: action.payload.belowAverage,
        noRating: action.payload.noRating,
        excellingText: action.payload.excellingText,
        averageText: action.payload.averageText,
        belowAverageText: action.payload.belowAverageText,
        noRatingText: action.payload.noRatingText,
        dashboardData: action.payload.dashboard,
      };

    case GET_PERFORMANCE_SUCCESS:
      return {
        ...state,
        performance: action.payload.data,
        barChart: action.payload.barChart,
        barChartTitles: action.payload.barChartTitles,
        overallPerformance: action.payload.overallPerformance,
        overallProgress: action.payload.overallProgress,
      };

    case GET_PERFORMANCE_IN_CLASS_SUCCESS:
      return {
        ...state,
        performance: action.payload.data,
        barChart: action.payload.barChart,
        barChartTitles: action.payload.barChartTitles,
        overallPerformance: action.payload.overallPerformance,
        overallProgress: action.payload.overallProgress,
      };
    default:
      return state;
  }
};
export default courseReducer;
