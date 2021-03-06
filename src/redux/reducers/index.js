import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import courseReducer from "./courseReducer";
import paymentReducer from "./paymentReducer";
import subjectReducer from "./subjectReducer";
import classReducer from "./classReducer";
import pastQuestionsReducer from "./pastQuestionsReducer";
import searchReducer from "./searchReducer";

export default combineReducers({
  auth: authReducer,
  error: errorReducer,
  course: courseReducer,
  payment: paymentReducer,
  class: classReducer,
  subject: subjectReducer,
  search: searchReducer,
  pastQuestion: pastQuestionsReducer,
});
