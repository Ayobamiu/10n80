import {
  INPUT_CHANGE,
  GET_ROLES_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  CLEAR_FORM,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  PASSWORD_CHANGE_SUCCESS,
  SOCIAL_LOGIN_UPDATE_SUCCESS,
  AUTH_SUCCESS,
  AUTH_FAILURE,
  CHECK_USER_AND_JOIN_CLASS_SUCCESS,
  UPDATE_PROFILE_SUCCES,
  PASSWORD_CHANGE_FROM_PROFILE_SUCCESS,
  LOGOUT_SUCCESS,
  UPDATE_PROFILE_PIC_SUCCESS,
} from "../actions/types";

const initialState = {
  drop: false,
  searchRedirect: false,
  redirect: false,
  location: localStorage.getItem("location"),
  chartSection: "subject",
  searchLocation: "/search",
  isAuthenticated: false,
  inClass: false,
  targetUser: null,
  role: "",
  activeEnrolledCourseId: "",
  activeCourseId: "",
  activeCourseName: "",
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
  referralCode: "",
  passwordMode: true,
  roles: [],
  classes: [],
  classLabel: "Select a Class",
  userId: "",
  user: {},
  courseId: "",
  address: "unknown",
  activeCoursePaidStatus: false,
  dashboardRoute: false,
  className: "",
  students:0,
  teachers:0,
  numberOfClassNote:0,
  numberOfQuizQuestions:0,
  state:'',
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };

    case CHECK_USER_AND_JOIN_CLASS_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
      };
    case GET_ROLES_SUCCESS:
      return {
        ...state,
        roles: action.payload.roles,
        classes: action.payload.courses,
        students: action.payload.students,
        teachers: action.payload.teachers,
        numberOfClassNote: action.payload.numberOfClassNote,
        numberOfQuizQuestions: action.payload.numberOfQuizQuestions
      };

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
    case AUTH_SUCCESS:
    case SOCIAL_LOGIN_UPDATE_SUCCESS:
      let myObj = {};
      let otherObj = {};

      if (action.payload.token) {
        localStorage.setItem("token", action.payload.token);
      }

      if (!action.payload.user.role) {
        myObj = {
          isAuthenticated: false,
          location: "/social-login",
        };
      } else {
        if (action.payload.user.role === "602f3ce39b146b3201c2dc1d") {
          myObj = {
            isAuthenticated: true,
            location: "/classes/teacher",
            activeEnrolledCourseId:
              action.payload.user.classOwnership &&
              action.payload.user.classOwnership.length
                ? action.payload.user.classOwnership[0]._id
                : "",
            activeCourseId:
              action.payload.user.classOwnership &&
              action.payload.user.classOwnership.length
                ? action.payload.user.classOwnership[0].enrolledCourse._id
                : "",
            activeCourseName:
              action.payload.user.classOwnership &&
              action.payload.user.classOwnership.length
                ? action.payload.user.classOwnership[0].name
                : "",
            activeCoursePaidStatus:
              action.payload.user.classOwnership &&
              action.payload.user.classOwnership.length
                ? action.payload.user.classOwnership[0].enrolledCourse
                    .paymentIsActive
                : "",
          };
        } else if (action.payload.user.role === "5fd08fba50964811309722d5") {
          myObj = {
            activeEnrolledCourseId:
              action.payload.user.enrolledCourses &&
              action.payload.user.enrolledCourses.length
                ? action.payload.user.enrolledCourses[0]._id
                : "",
            activeCourseId:
              action.payload.user.enrolledCourses &&
              action.payload.user.enrolledCourses.length
                ? action.payload.user.enrolledCourses[0].courseId._id
                : "",
            activeCourseName:
              action.payload.user.enrolledCourses &&
              action.payload.user.enrolledCourses.length
                ? action.payload.user.enrolledCourses[0].courseId.name
                : "",
            activeCoursePaidStatus:
              action.payload.user.enrolledCourses &&
              action.payload.user.enrolledCourses.length
                ? action.payload.user.enrolledCourses[0].paymentIsActive
                : "",
            isAuthenticated: true,
            location: "/dashboard",
          };
        }
      }
      otherObj = {
        userId: action.payload.user._id,
        user: action.payload.user,
        redirect: true,
        email: action.payload.user.email,
        fullName: action.payload.user.fullName,
        role: action.payload.user.role ? action.payload.user.role : "",
        state: action.payload.user.state ? action.payload.user.state : ""
      };

      return {
        ...state,
        ...myObj,
        ...otherObj,
      };

    case CLEAR_FORM:
      return {
        ...state,
        role: "",
        fullName: "",
        email: "",
        password: "",
        referralCode: "",
        passwordMode: true,
      };

    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
    case AUTH_FAILURE:
      localStorage.removeItem("token");
      localStorage.setItem("location", "/");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: {},
      };
    case PASSWORD_CHANGE_SUCCESS:
      return {
        ...state,
        password: "",
        confirmPassword: "",
      };
    case PASSWORD_CHANGE_FROM_PROFILE_SUCCESS:
      return {
        ...state,
        password: "",
        confirmPassword: "",
      };
    case UPDATE_PROFILE_SUCCES:
      return {
        ...state,
      };
    case UPDATE_PROFILE_PIC_SUCCESS:
      return {
        ...state,
      };
    case LOGOUT_SUCCESS:
      localStorage.removeItem("token");
      return {
        ...state,
        drop: false,
        searchRedirect: false,
        redirect: false,
        location: "",
        chartSection: "subject",
        searchLocation: "/search",
        isAuthenticated: false,
        role: "",
        activeEnrolledCourseId: "",
        activeCourseId: "",
        activeCourseName: "",
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        referralCode: "",
        passwordMode: true,
        classLabel: "Select a Class",
        userId: "",
        user: {},
        courseId: "",
        address: "unknown",
        activeCoursePaidStatus: false,
        dashboardRoute: false,
        className: "",
      };
    default:
      return state;
  }
};
export default authReducer;
