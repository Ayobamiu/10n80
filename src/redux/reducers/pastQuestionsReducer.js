import {
    PAST_QUESTIONS_INPUT_CHANGE,
    GET_PAST_QUESTION_SUBJECTS_SUCCESS,
    LOAD_QUESTIONS_SUCCESS,
    FLAG_QUESTION_SUCCESS,
    SAVE_USER_ANSWER,
    UPDATE_QUESTION_TAG,
    POPULATE_SUBMITTED_ANSWER
  } from '../actions/types';
  
  const initialState = {
    pastQuestionCategoryId:1, 
    subjectTag:'Subject',
    subjects:[],
    selectedSubject:'Unknown',
    selectedYear:'2020',
    selectedSubjectImg:'',
    questions:[],
    answers:[],
    submittedAnswers:[],
    correctAnswers:0,
    skippedAnswers:0,
    selectedCategory:'Unknown',
    selectedCategoryImg:'',
    currentQuestion:0,
    progressBarStatus:0,  
    progressBarUnit:0,
    questionLength:0,
    questionTags:[],
    questionTime:3600000, 
    subjectId:0,
    motivations:[],
    motivationItemNo:0,
    motivationInterval: 0,
    motivateGoodPerformance: false,
    report1:true,
    report2:false,
    report3:false,
    report4:false,
    report5:false,
    report6:false,
    report7:'', 
    result:{},
    pastQuestionRedirect:false,
    pastQuestionRedirectLocation:'/past-questions/remark',
    speed:0,
    speedRange1:0,
    speedRange2: 0,  
    speedRange3: 0,
    examType:'quiz',
    quizTitle:'',
    quizLessonId:'',     
  };
  
  const pastQuestionsReducer = (state = initialState, action) => {
    switch (action.type) {
        case PAST_QUESTIONS_INPUT_CHANGE:
            return {
            ...state,
            [action.payload.name]: action.payload.value,
            };

        case GET_PAST_QUESTION_SUBJECTS_SUCCESS:
            return{
                ...state, 
                subjects:action.payload                                                                         
            } 

        case LOAD_QUESTIONS_SUCCESS:                           
            return{
                ...state, 
                questions:action.payload.questions, 
                progressBarUnit:100/action.payload.questions.length,  
                progressBarStatus:100/action.payload.questions.length,
                questionLength:action.payload.questions.length,
                questionTags:action.payload.questionTags,
                questionTime: action.payload.questionTime,
                answers:[],
                correctAnswers:0,
                currentQuestion:0,
                subjectId:action.payload.theSubjectId ,
                speedRange1: action.payload.questionTime/4,
                speedRange2: (action.payload.questionTime/4) * 2,  
                speedRange3: (action.payload.questionTime/4) * 3,  
                speed: (action.payload.questionTime/4 * 1)/60000,            
                motivations: action.payload.motivations,                                                    
            }  

        case FLAG_QUESTION_SUCCESS:
            return{
                ...state, 
                report1:true,
                report2:false,
                report3:false,
                report4:false,
                report5:false,
                report6:false,
                report7:'',                                                           
            } 

        case SAVE_USER_ANSWER:           
            state.answers[state.currentQuestion] = action.payload.value
            return{
                ...state                                              
            }  

        case POPULATE_SUBMITTED_ANSWER:           
            state.submittedAnswers[state.currentQuestion] = action.payload.value
            return{
                ...state                                              
            }
        
        case UPDATE_QUESTION_TAG:           
            state.questionTags[state.currentQuestion] = action.payload.value                           
            return{
                ...state                                              
            }
        
      
      default:
        return state;
    }
  };
  export default pastQuestionsReducer;
  