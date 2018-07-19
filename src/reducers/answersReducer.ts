import { actionTypes } from '../actions';
import { IAnswer, IAnswersReducer } from '../interfaces';

const answersReducerInitialState: IAnswersReducer = {
    activeAnswer: null,
    answers: [],
}

const answersReducer = (state: IAnswersReducer = answersReducerInitialState, action: any) => {
    switch (action.type) {
        case actionTypes.RESET:
            return {
                ...state,
                activeAnswer: null,
                answers: [],
            };
        case actionTypes.ANSWER_QUESTION:
            const newAnswer: IAnswer = action.payload;
            const newAnswers = [...state.answers];
            const answerIndex = newAnswers.findIndex((answer) => answer.questionId === newAnswer.questionId);

            if (answerIndex === -1) {
                newAnswers.push(newAnswer);
            } else {
                newAnswers[answerIndex] = newAnswer;
            }

            return {
                ...state,
                answers: newAnswers
            };
        default:
            return state;
    }
}

export default answersReducer;
