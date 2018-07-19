import { actionTypes } from '../actions';
import questionsReducer from './questionsReducer';

describe('reducer', () => {
    describe('questionsReducer', () => {
        const q1 = { id: '111', question: 'what?', choices: ['ha!', 'yes'] };
        const q2 = { id: '222', question: 'where?', choices: ['hi!', 'idk'] };
        const q3 = { id: '333', question: 'who?', choices: ['hu!', 'other'] };

        const stateInitial = {
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

        const stateQ1 = {
            activeQuestion: q1,
            activeQuestionIndex: 0,
            data: [q1, q2, q3],
            error: null,
            fetched: true,
            fetching: false,
            hasNext: true,
            hasPrevious: false,
            totalQuestions: 3,
        }

        const stateQ2 = {
            activeQuestion: q2,
            activeQuestionIndex: 1,
            data: [q1, q2, q3],
            error: null,
            fetched: true,
            fetching: false,
            hasNext: true,
            hasPrevious: true,
            totalQuestions: 3,
        }

        const stateQ3 = {
            activeQuestion: q3,
            activeQuestionIndex: 2,
            data: [q1, q2, q3],
            error: null,
            fetched: true,
            fetching: false,
            hasNext: false,
            hasPrevious: true,
            totalQuestions: 3,
        }

        it('should return initial state', () => {
            expect(questionsReducer(undefined, {})).toEqual(stateInitial);
        })

        it('should load questions to state', () => {
            expect(
                questionsReducer(stateInitial, { type: actionTypes.QUESTIONS_LOAD, payload: [q1, q2, q3] })
            ).toEqual(stateQ1)
        })

        it('should stay at the same state', () => {
            expect(
                questionsReducer(stateQ1, { type: actionTypes.QUESTIONS_PREV })
            ).toEqual(stateQ1)
            expect(
                questionsReducer(stateQ3, { type: actionTypes.QUESTIONS_NEXT })
            ).toEqual(stateQ3)
        })

        it('should activate next question', () => {
            expect(
                questionsReducer(stateQ1, { type: actionTypes.QUESTIONS_NEXT })
            ).toEqual(stateQ2)
            expect(
                questionsReducer(stateQ2, { type: actionTypes.QUESTIONS_NEXT })
            ).toEqual(stateQ3)
        })

        it('should activate previous question', () => {
            expect(
                questionsReducer(stateQ2, { type: actionTypes.QUESTIONS_PREV })
            ).toEqual(stateQ1)
            expect(
                questionsReducer(stateQ3, { type: actionTypes.QUESTIONS_PREV })
            ).toEqual(stateQ2)
        })
    })
})
