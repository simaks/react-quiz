import * as fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './actions';
import { serverUrl } from './constants';
import { IQuestion, IResult } from './interfaces';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async actions', () => {
    describe('fetchQuestions', () => {
        afterEach(() => {
            fetchMock.reset()
            fetchMock.restore()
        });

        it('sends correct action', () => {
            const questions: IQuestion[] = [{
                choices: ['Nothing', 'Something'],
                id: '123',
                question: 'What?',
            }];

            fetchMock.getOnce(`${serverUrl}/questions/get`, { body: questions, headers: { 'content-type': 'application/json' } })

            const expectedActions = [
                { type: "QUESTIONS_FETCH" },
                { payload: questions, type: "QUESTIONS_LOAD" }
            ];
            const store = mockStore()

            return actions.fetchQuestions()(store.dispatch).then(() => {
                expect(store.getActions()).toEqual(expectedActions)
            });
        })
    })

    describe('submitAnswers', () => {
        it('sends correct action', () => {
            const result: IResult = {
                correct: 0,
                skipped: 5,
                wrong: 0,
            };

            fetchMock.postOnce(`${serverUrl}/questions/check`, { body: result, headers: { 'content-type': 'application/json' } })
            const expectedActions = [
                { type: "RESULT_ANSWERS_SUBMIT" },
                { payload: result, type: "RESULT_RESPONSE" }
            ];
            const store = mockStore()

            return actions.submitAnswers([])(store.dispatch).then(() => {
                expect(store.getActions()).toEqual(expectedActions)
            });
        });
    })
})
