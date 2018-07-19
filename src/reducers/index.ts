import { combineReducers } from 'redux';
import answersReducer from './answersReducer';
import appReducer from './appReducer';
import questionsReducer from './questionsReducer';
import resultReducer from './resultReducer';


export default combineReducers({
    answers: answersReducer,
    app: appReducer,
    questions: questionsReducer,
    result: resultReducer,
})
