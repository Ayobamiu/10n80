import API from '../../assets/js/api';
import {
  returnErrors
} from "./errorActions";

import {
    PAST_QUESTIONS_INPUT_CHANGE,
    GET_PAST_QUESTION_SUBJECTS_SUCCESS,
    GET_PAST_QUESTION_SUBJECTS_FAILURE,
    LOAD_QUESTIONS_SUCCESS,
    LOAD_QUESTIONS_FAILURE,
    FLAG_QUESTION_SUCCESS,
    FLAG_QUESTION_FAILURE,
    SAVE_USER_ANSWER,
    UPDATE_QUESTION_TAG,
    POPULATE_SUBMITTED_ANSWER,
    SUBMIT_RESULT_SUCCESS,
    SUBMIT_RESULT_FAILURE,
} from './types';

export const inputChange = (name, value) => async (dispatch) => {
  try {
    dispatch({
      type: PAST_QUESTIONS_INPUT_CHANGE,
      payload: {
        name: name,
        value: value,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

export const pastQuestionInputChange = (name, value) => async (dispatch) => {
    try {
      dispatch({
        type: PAST_QUESTIONS_INPUT_CHANGE,
        payload: {
          name: name,
          value: value,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

export const loadSubjects = (examId) => async dispatch => {    
    try {   
        document.body.classList.add('loading-indicator');  
        let result
        if(examId === '3'){ 
            dispatch({
                type: PAST_QUESTIONS_INPUT_CHANGE,
                payload:{
                    name: 'subjectTag',
                    value: 'School' 
                }
            })  
            result = await API.loadSchools(); 
        }else{   
            dispatch({
                type: PAST_QUESTIONS_INPUT_CHANGE,
                payload:{
                    name: 'subjectTag',
                    value: 'Subject' 
                }
            }) 
            result = await API.loadSubjects(examId); 
        }      

        if(result.data.error === false){           
            dispatch({
                type: GET_PAST_QUESTION_SUBJECTS_SUCCESS,
                payload:result.data.subjects  
            })                     
        }else{
            dispatch({
                type: GET_PAST_QUESTION_SUBJECTS_FAILURE          
            })	
        } 
        document.body.classList.remove('loading-indicator');
    } catch (err) {       
        document.body.classList.remove('loading-indicator');  
        dispatch(returnErrors('Server Error Occured', 400,'LOAD_SUBJECTS_FAILURE'));         
        dispatch({
            type: GET_PAST_QUESTION_SUBJECTS_FAILURE          
        })	
    }
}

export const loadQuestions = (subjectId) => async dispatch => {    
    try {   
        document.body.classList.add('loading-indicator');	   
        const result = await API.loadQuestions(subjectId);
        let questions = [];  
        let questionTags= []; 
        let questionTime=60; 
        let theSubjectId=-1;        
        let motivations =[];

        if(result.data.error === false){
            theSubjectId = result.data.subject_details.subject_id
            questions = result.data.questions;
            let questionLength =questions.length;
            for(let i =0; i<questionLength; i++){
                questionTags.push(1)
            }   
            questionTime = result.data.subject_details.duration; 
            questionTime = questionTime * 1000 * 60;   
            motivations =  result.data.motivations                 
        }          
      
        dispatch({
            type: LOAD_QUESTIONS_SUCCESS,
            payload:{
                questions,
                questionTags,
                questionTime,
                theSubjectId,
                motivations               
            }       
        })    
       
        document.body.classList.remove('loading-indicator');      
   
    } catch (err) {       
        document.body.classList.remove('loading-indicator');         
        dispatch({
            type: LOAD_QUESTIONS_FAILURE          
        })	
    }
}

export const loadQuizQuestions = (questions) => async dispatch => {    
    try { 

        let questionTags= []; 
        let questionTime=60 * 1000 * 60;         
        let motivations =[];

       
        let questionLength = questions.length;
        for(let i =0; i<questionLength; i++){
            questionTags.push(1)
        }        
      
        dispatch({
            type: LOAD_QUESTIONS_SUCCESS,
            payload:{
                questions,
                questionTags,
                questionTime,
                theSubjectId:-1,
                motivations               
            }       
        })
   
    } catch (err) {  
        dispatch({
            type: LOAD_QUESTIONS_FAILURE          
        })	
    }
}

export const flagQuestion = data => async dispatch => {    
    try {      
        const result = await API.flagQuestion(data); 
        if(result.data.error === false){
            dispatch({
                type: FLAG_QUESTION_SUCCESS
            })         
            dispatch(returnErrors(result.data.message, 200,'FLAG_QUESTION_SUCCESS')); 
        }else{
            dispatch(returnErrors(result.data.message, 400,'FLAG_QUESTION_FAILURE'));
            dispatch({
                type: FLAG_QUESTION_FAILURE     
            })
        }         
    } catch (err) {    
        dispatch(returnErrors('Server Error Occured', 400,'FLAG_QUESTION_FAILURE'));
        dispatch({
            type: FLAG_QUESTION_FAILURE          
        })  
    }
}

export const saveUserAnswer = (value) => async dispatch => {
    try {       	
        dispatch({
            type: SAVE_USER_ANSWER,
            payload:{              
                value:value
            }
        }) 

        let status = null;
        if(value === -1){
            status=3
        }else{
            status=2 
        }

        dispatch({
            type: UPDATE_QUESTION_TAG,
            payload:{              
                value:status
            }
        }) 
        
    } catch (error) {
        console.error(error);
    }    

}

export const populateSubmittedAnswer = (answer) => async dispatch => {
    try {       	
        dispatch({
            type: POPULATE_SUBMITTED_ANSWER,
            payload:{              
                value:answer
            }
        }) 
        
    } catch (error) {
        console.error(error);
    }
}

export const submitUserScore = (remark, score) => async (dispatch, getState) => {    
    try {           
        const { userId, activeCourseId } = getState().auth;
        const { pastQuestionCategoryId, quizLessonId, submittedAnswers, subjectId, speed, correctAnswers, answers, questionLength, selectedSubject, examType } = getState().pastQuestion;
        const { lessonSubjectId } = getState().subject;
        
        if(examType === 'quiz'){
            const response = {
                "results":submittedAnswers,
                "userId": userId,
                "courseId":activeCourseId,
                "lessonId":quizLessonId,
                "subjectId":lessonSubjectId,
                "subjectName":selectedSubject,               
                "timeSpent":`${speed}`,
                "numberOfCorrectAnswers":correctAnswers,
                "numberOfWrongAnswers":questionLength - (correctAnswers + answers.filter(item => item === -1).length),
                "numberOfSkippedQuestions":answers.filter(item => item === -1).length,        
                "score": score,
                "remark": remark, 
            }        
            console.log('am her')
            await API.submitLessonQuizResult(quizLessonId,response);      
            dispatch({
                type: SUBMIT_RESULT_SUCCESS                     
            }) 
        }else{
            const response = {
                "results":submittedAnswers,
                "userId": userId,
                "courseId":activeCourseId,
                "subjectCategoryId":subjectId,
                "subjectName":selectedSubject,
                pastQuestionCategoryId,
                "pastQuestionTypeId": "5fc8e7134bfe993c34a9689c", //not needed
                "subjectId": "5fc8e7134bfe993c34a9689c", //not needed 
                "timeSpent":`${speed}`,
                "numberOfCorrectAnswers":correctAnswers,
                "numberOfWrongAnswers":questionLength - (correctAnswers + answers.filter(item => item === -1).length),
                "numberOfSkippedQuestions":answers.filter(item => item === -1).length,        
                "score": score,
                "remark": remark, 
            }        
            await API.submitPastQuestionResult(response);      
            dispatch({
                type: SUBMIT_RESULT_SUCCESS                     
            })  
            const progress = {   
                subjectCategoryId:subjectId,        
                pastQuestionCategoryId,
               "courseId": activeCourseId            
            }         
            await API.submitPastQuestionProgress(progress);
        }
        
       
       
    } catch (err) {   
       
        dispatch(
          returnErrors(
            err.response.data.errors
              ? err.response.data.errors
              : err.response.data.error,
            err.response.data.status,
            'SUBMIT_RESULT_FAILURE'
          )
        );
        dispatch({
          type: SUBMIT_RESULT_FAILURE,
        });
    }
}