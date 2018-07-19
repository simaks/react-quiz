export interface IQuestion {
    id: string,
    question: string,
    choices: string[]
}

export interface IQuestionsReducer {
    data: IQuestion[],
    activeQuestionIndex: number,
    activeQuestion: IQuestion | null,
    hasNext: boolean,
    hasPrevious: boolean,
    totalQuestions: number,
    error: Error | null,
    fetched: boolean,
    fetching: boolean,
}

export interface IAnswer {
    answer: number,
    questionId: string,
}

export interface IAnswersReducer {
    answers: IAnswer[],
}

export interface IResult {
    correct: number,
    skipped: number,
    wrong: number,
}

export interface IResultReducer {
    error: Error | null,
    fetched: boolean,
    fetching: boolean,
    result: IResult | null
}

export interface IAppReducer {
    activePage: string,
}

export interface IReducer {
    app: IAppReducer,
    questions: IQuestionsReducer,
    answers: IAnswersReducer,
    result: IResultReducer,
}
