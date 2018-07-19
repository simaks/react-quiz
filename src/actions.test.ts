
import * as actions from './actions';
import { IAnswer, IQuestion, IResult } from './interfaces';

describe('actions', () => {
    describe('resetQuiz', () => {
        it('sends correct action', () => {
            expect(actions.resetQuiz()).toEqual({
                type: "RESET"
            });
        })
    })

    describe('questionsFetched', () => {
        it('sends correct action', () => {
            const questions: IQuestion[] = [{
                choices: ['13', '42', '777'],
                id: '132',
                question: 'What is the purpose of life?'
            }];
            expect(actions.questionsFetched(questions)).toEqual({
                payload: questions,
                type: "QUESTIONS_LOAD"
            });
        })
    })

    describe('questionsFetchError', () => {
        it('sends correct action', () => {
            const error = new Error('test error');
            expect(actions.questionsFetchError(error)).toEqual({
                "payload": error,
                "type": "QUESTIONS_FETCH_ERROR",
            });
        })
    })

    describe('showIntroPage', () => {
        it('sends correct action', () => {
            expect(actions.showIntroPage()).toEqual({
                type: "APP_SHOW_INTRO"
            });
        })
    })

    describe('showQuestionPage', () => {
        it('sends correct action', () => {
            expect(actions.showQuestionPage()).toEqual({
                type: "APP_SHOW_QUESTION"
            });
        })
    })

    describe('showResultPage', () => {
        it('sends correct action', () => {
            expect(actions.showResultPage()).toEqual({
                type: "APP_SHOW_RESULT"
            });
        })
    })

    describe('answerQuestion', () => {
        it('sends correct action', () => {
            const answer: IAnswer = {
                answer: 42,
                questionId: '123',
            };
            expect(actions.answerQuestion(answer.questionId, answer.answer)).toEqual({
                payload: answer,
                type: "ANSWER_QUESTION",
            });
        })
    })

    describe('submitAnswersSuccess', () => {
        it('sends correct action', () => {
            const result: IResult = {
                correct: 2,
                skipped: 3,
                wrong: 0,
            }
            expect(actions.submitAnswersSuccess(result)).toEqual({
                payload: result,
                type: "RESULT_RESPONSE",
            });
        })
    })

    describe('submitAnswersError', () => {
        it('sends correct action', () => {
            const error = new Error('test error');
            expect(actions.submitAnswersError(error)).toEqual({
                payload: error,
                type: "RESULT_SUBMIT_ERROR",
            });
        })
    })

    // describe('fetchQuestions', () => {
    //     it('sends correct action', () => {
    //         expect(actions.fetchQuestions()).toEqual({
    //         });
    //     })
    // })

    // describe('submitAnswers', () => {
    //     it('sends correct action', () => {
    //         expect(actions.submitAnswers()).toEqual({
    //         });
    //     })
    // })
})
