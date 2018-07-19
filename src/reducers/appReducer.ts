import { actionTypes } from '../actions';
import { IAppReducer } from '../interfaces';

export enum activePage {
    INTRO = "INTRO",
    QUESTION = "QUESTION",
    RESULT = "RESULT",
}

const appReducerInitialState: IAppReducer = {
    activePage: activePage.INTRO,
}

const appReducer = (state: IAppReducer = appReducerInitialState, action: any) => {
    switch (action.type) {
        case actionTypes.RESET:
            return {
                ...state,
                activePage: activePage.INTRO,
            }
        case actionTypes.APP_SHOW_INTRO:
            return {
                ...state,
                activePage: activePage.INTRO,
            }
        case actionTypes.APP_SHOW_QUESTION:
            return {
                ...state,
                activePage: activePage.QUESTION,
            }
        case actionTypes.APP_SHOW_RESULT:
            return {
                ...state,
                activePage: activePage.RESULT,
            }
        default:
            return state;
    }
}
export default appReducer;
