import * as React from 'react';
import { connect } from 'react-redux';
import { isUndefined } from 'util';
import { Button, ErrorMessage, ProgressBar } from '../';
import { answerQuestion, fetchQuestions, questionsNext, questionsPrev, showResultPage } from '../../actions';
import { IAnswer, IQuestion, IReducer } from '../../interfaces';
import { ButtonSizes, ButtonTypes } from '../Button/Button';
import './QuestionPage.css';

interface IQuestionPageProps {
  activeAnswer?: IAnswer | null,
  activeQuestion?: IQuestion | null,
  activeQuestionIndex?: number,
  answers?: IAnswer[],
  allAnswered?: boolean,
  questionsFetching?: boolean,
  questionsFetchError?: Error | null,
  hasNext?: boolean,
  hasPrevious?: boolean,
  totalQuestions?: number,
  answerQuestion?: (id: string, answer: number) => any,
  fetchQuestions?: () => any,
  showResultPage?: () => any,
  questionsPrev?: () => any,
  questionsNext?: () => any,
}

class QuestionPage extends React.Component<IQuestionPageProps> {
  constructor(props: IQuestionPageProps) {
    super(props);
    this.onNextClick = this.onNextClick.bind(this);
    this.onPrevClick = this.onPrevClick.bind(this);
    this.onSubmitClick = this.onSubmitClick.bind(this);
  }

  public componentDidMount() {
    if (this.props.fetchQuestions) {
      this.props.fetchQuestions();
    }
  }

  public render() {
    return (
      <div className='QuestionPage'>
        <ProgressBar
          done={this.props.answers ? this.props.answers.length : 0}
          total={this.props.totalQuestions ? this.props.totalQuestions : 0} />

        <div className='QuestionPage-question'>
          {this.props.questionsFetching ? 'Loading...' : <div>
            <div className='QuestionPage-number'>
              Question {!isUndefined(this.props.activeQuestionIndex) ? this.props.activeQuestionIndex + 1 : ''} out of {this.props.totalQuestions}
            </div>
            <h2 className='QuestionPage-title'>{this.questionTitle}</h2>
            <div className='QuestionPage-choices'>{this.answerChoices}</div>
            {this.props.questionsFetchError ? <ErrorMessage error={this.props.questionsFetchError} /> : ''}
          </div>}
        </div>


        <div className='QuestionPage-controls'>
          <Button onClick={this.onPrevClick} disabled={!this.props.hasPrevious}>Previous</Button>&nbsp;
          <Button onClick={this.onNextClick} disabled={!this.props.hasNext}>{this.props.activeAnswer ? 'Next' : 'Skip'}</Button>&nbsp;
          <Button onClick={this.onSubmitClick} disabled={this.submitBtnDisabled} type={this.props.allAnswered ? ButtonTypes.SUCCESS : ButtonTypes.WARNING}>Submit</Button>
        </div>
      </div>
    );
  }

  get submitBtnDisabled() {
    if (this.props.answers && this.props.answers.length === this.props.totalQuestions) {
      return false;
    }
    return this.props.hasNext;
  }

  private get questionTitle() {
    return this.props.activeQuestion ? this.props.activeQuestion.question : '';
  }

  private get answerChoices() {
    if (this.props.activeQuestion) {
      const answer = this.props.activeAnswer;
      const question = this.props.activeQuestion;
      return question.choices.map((choice, index) => {
        return <div key={index} className='QuestionPage-choice'>
          <Button
            size={ButtonSizes.LG}
            type={answer && answer.answer === index ? ButtonTypes.WARNING : ButtonTypes.DEFAULT}
            onClick={this.onAnswerClick(question.id, index)}>
            {choice}
          </Button>
        </div>
      });
    }
    return '';
  }

  private onAnswerClick(id: string, answer: number) {
    return () => {
      if (this.props.answerQuestion) {
        this.props.answerQuestion(id, answer);

        if (this.props.hasNext && this.props.questionsNext) {
          this.props.questionsNext();
        }
      }
    }
  }

  private onPrevClick() {
    if (this.props.questionsPrev) {
      this.props.questionsPrev();
    }
  }

  private onNextClick() {
    if (this.props.questionsNext) {
      this.props.questionsNext();
    }
  }

  private onSubmitClick() {
    if (this.props.showResultPage) {
      this.props.showResultPage();
    }
  }
}

const mapStateToProps = (state: IReducer): IQuestionPageProps => {
  return {
    activeAnswer: (() => {
      const activeQuestion = state.questions.activeQuestion;
      let activeAnswer;

      if (activeQuestion && state.answers.answers) {
        activeAnswer = state.answers.answers.find(answer => {
          return answer.questionId === activeQuestion.id
        });
      }
      return activeAnswer ? activeAnswer : null;
    })(),
    activeQuestion: state.questions.activeQuestion,
    activeQuestionIndex: state.questions.activeQuestionIndex,
    allAnswered: state.answers.answers && state.answers.answers.length === state.questions.totalQuestions,
    answers: state.answers.answers,
    hasNext: state.questions.hasNext,
    hasPrevious: state.questions.hasPrevious,
    questionsFetchError: state.questions.error,
    questionsFetching: state.questions.fetching,
    totalQuestions: state.questions.totalQuestions
  }
}

const mapDispatchToProps = (dispatch: any): IQuestionPageProps => {
  return {
    answerQuestion: (id: string, answer: number) => {
      dispatch(answerQuestion(id, answer))
    },
    fetchQuestions: () => {
      dispatch(fetchQuestions())
    },
    questionsNext: () => {
      dispatch(questionsNext())
    },
    questionsPrev: () => {
      dispatch(questionsPrev())
    },
    showResultPage: () => {
      dispatch(showResultPage())
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionPage)
