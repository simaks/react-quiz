import { Dispatch } from 'redux';
import { serverUrl } from './constants';
import { IAnswer, IQuestion, IResult } from './interfaces';

export enum actionTypes {
    QUESTIONS_FETCH = "QUESTIONS_FETCH",
    QUESTIONS_LOAD = "QUESTIONS_LOAD",
    QUESTIONS_FETCH_ERROR = "QUESTIONS_FETCH_ERROR",
    QUESTIONS_PREV = "QUESTIONS_PREV",
    QUESTIONS_NEXT = "QUESTIONS_NEXT",

    ANSWER_QUESTION = "ANSWER_QUESTION",

    RESULT_ANSWERS_SUBMIT = "RESULT_ANSWERS_SUBMIT",
    RESULT_SUBMIT_ERROR = "RESULT_SUBMIT_ERROR",
    RESULT_RESPONSE = "RESULT_RESPONSE",

    APP_SHOW_INTRO = "APP_SHOW_INTRO",
    APP_SHOW_QUESTION = "APP_SHOW_QUESTION",
    APP_SHOW_RESULT = "APP_SHOW_RESULT",

    RESET = "RESET",
}

export const questionsFetched = (questions: IQuestion[]) => {
    return {
        payload: questions,
        type: actionTypes.QUESTIONS_LOAD,
    }
}

export const questionsPrev = () => {
    return {
        type: actionTypes.QUESTIONS_PREV,
    }
}

export const questionsNext = () => {
    return {
        type: actionTypes.QUESTIONS_NEXT,
    }
}


export const questionsFetchError = (error: Error) => {
    return {
        payload: error,
        type: actionTypes.QUESTIONS_FETCH_ERROR,
    }
}

export const fetchQuestions = () => (dispatch: Dispatch) => {
    dispatch({
        type: actionTypes.QUESTIONS_FETCH
    })
    return fetch(`${serverUrl}/questions/get`)
        .then((response) => response.json())
        .then(response => dispatch(questionsFetched(response)))
        .catch(error => dispatch(questionsFetchError(error)));
}

export const showIntroPage = () => {
    return {
        type: actionTypes.APP_SHOW_INTRO,
    }
}

export const showQuestionPage = () => {
    return {
        type: actionTypes.APP_SHOW_QUESTION,
    }
}

export const showResultPage = () => {
    return {
        type: actionTypes.APP_SHOW_RESULT,
    }
}

export const answerQuestion = (questionId: string, answer: number) => {
    return {
        payload: { questionId, answer },
        type: actionTypes.ANSWER_QUESTION,
    }
}

export const submitAnswersSuccess = (result: IResult) => {
    return {
        payload: result,
        type: actionTypes.RESULT_RESPONSE,
    }
}

export const submitAnswersError = (error: Error) => {
    return {
        payload: error,
        type: actionTypes.RESULT_SUBMIT_ERROR,
    }
}

export const submitAnswers = (answers: IAnswer[]) => (dispatch: Dispatch) => {
    dispatch({
        type: actionTypes.RESULT_ANSWERS_SUBMIT
    });
    return fetch(`${serverUrl}/questions/check`, {
        body: JSON.stringify({ answers }),
        headers: { "Content-Type": "application/json; charset=utf-8" },
        method: "POST",
        mode: "cors",
    })
        .then(response => response.json())
        .then(response => dispatch(submitAnswersSuccess(response)))
        .catch(error => dispatch(submitAnswersError(error)));
}

export const resetQuiz = () => {
    return {
        type: actionTypes.RESET
    }
}
