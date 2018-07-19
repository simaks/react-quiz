import { actionTypes } from '../actions';
import { IQuestion, IQuestionsReducer } from '../interfaces';

const questionsReducerInitialState: IQuestionsReducer = {
    activeQuestion: null,
    activeQuestionIndex: -1,
    data: [],
    error: null,
    fetched: false,
    fetching: false,
    hasNext: false,
    hasPrevious: false,
    totalQuestions: -1,
}

const questionsReducer = (state: IQuestionsReducer = questionsReducerInitialState, action: any) => {
    switch (action.type) {
        case actionTypes.QUESTIONS_FETCH:
            return {
                ...state,
                fetched: false,
                fetching: true,
            };
        case actionTypes.QUESTIONS_LOAD:
            const questions: IQuestion[] = action.payload;
            return {
                ...state,
                activeQuestion: questions[0],
                activeQuestionIndex: 0,
                data: questions,
                error: null,
                fetched: true,
                fetching: false,
                hasNext: questions.length > 0,
                hasPrevious: false,
                totalQuestions: questions.length,
            };
        case actionTypes.QUESTIONS_FETCH_ERROR:
            return {
                ...state,
                error: action.payload,
                fetched: false,
                fetching: false
            };
        case actionTypes.QUESTIONS_PREV:
            const prevIndex = state.activeQuestionIndex > 0 ? state.activeQuestionIndex - 1 : 0;
            return {
                ...state,
                activeQuestion: state.data[prevIndex],
                activeQuestionIndex: prevIndex,
                hasNext: prevIndex < state.totalQuestions - 1,
                hasPrevious: prevIndex > 0,
            };
        case actionTypes.QUESTIONS_NEXT:
            const nextIndex = state.activeQuestionIndex < state.totalQuestions - 1 ? state.activeQuestionIndex + 1 : state.totalQuestions - 1;
            return {
                ...state,
                activeQuestion: state.data[nextIndex],
                activeQuestionIndex: nextIndex,
                hasNext: nextIndex < state.totalQuestions - 1,
                hasPrevious: nextIndex > 0,
            };
        default:
            return state;
    }
}

export default questionsReducer;
