import { actionTypes } from '../actions';
import { IResultReducer } from '../interfaces';

const resultReducerInitialState: IResultReducer = {
    error: null,
    fetched: false,
    fetching: false,
    result: null,
}

const resultReducer = (state: IResultReducer = resultReducerInitialState, action: any) => {
    switch (action.type) {
        case actionTypes.RESET:
            return {
                ...state,
                error: null,
                fetched: false,
                result: null,
            }
        case actionTypes.RESULT_ANSWERS_SUBMIT:
            return {
                ...state,
                fetched: false,
                fetching: true,
            }
        case actionTypes.RESULT_SUBMIT_ERROR:
            return {
                ...state,
                error: action.payload,
                fetched: false,
                fetching: false,
            }
        case actionTypes.RESULT_RESPONSE:
            return {
                ...state,
                error: null,
                fetched: true,
                fetching: false,
                result: action.payload,
            }
        default:
            return state;
    }
}
export default resultReducer;
