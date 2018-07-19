import { actionTypes } from '../actions';
import answersReducer from './answersReducer';

describe('reducer', () => {
    describe('answersReducer', () => {
        it('should return initial state', () => {
            expect(answersReducer(undefined, {})).toEqual({
                answers: [],
            });
        })

        it('should handle RESET', () => {
            expect(
                answersReducer({ answers: [{ answer: 1, questionId: '1' }] }, { type: actionTypes.RESET })
            ).toEqual({ answers: [] })
        })

        it('should handle ANSWER_QUESTION new answer', () => {
            expect(
                answersReducer(
                    { answers: [{ answer: 1, questionId: '2' }] },
                    { type: actionTypes.ANSWER_QUESTION, payload: { answer: 0, questionId: '1' } }
                )
            ).toEqual({
                answers: [
                    { answer: 1, questionId: '2' },
                    { answer: 0, questionId: '1' }
                ]
            })
        })

        it('should handle ANSWER_QUESTION update answer', () => {
            expect(
                answersReducer(
                    { answers: [{ answer: 1, questionId: '1' }] },
                    { type: actionTypes.ANSWER_QUESTION, payload: { answer: 0, questionId: '1' } }
                )
            ).toEqual({
                answers: [
                    { answer: 0, questionId: '1' }
                ]
            })
        })
    })
})
