import * as React from 'react';
import { connect } from 'react-redux';
import { resetQuiz, submitAnswers } from '../../actions';
import { IAnswer, IReducer, IResult } from '../../interfaces';
import Button from '../Button';
import { ButtonSizes } from '../Button/Button';
import ErrorMessage from '../ErrorMessage';
import './ResultPage.css';

interface IResultPageProps {
  answers?: IAnswer[],
  error?: Error | null,
  loading?: boolean,
  result?: IResult,
  resetQuiz?: () => void,
  submitAnswers?: (answers: IAnswer[]) => void,
}

class ResultPage extends React.PureComponent<IResultPageProps> {
  constructor(props: IResultPageProps) {
    super(props);
    this.onTrySubmitAgainClick = this.onTrySubmitAgainClick.bind(this);
    this.onHomeClick = this.onHomeClick.bind(this);
  }

  public componentDidMount() {
    if (this.props.submitAnswers) {
      this.props.submitAnswers(this.props.answers ? this.props.answers : []);
    }
  }

  public render() {
    const result = this.props.result;
    return (
      <div className='ResultPage'>
      {this.props.loading ? 'Loading...' : <div>
        {result ? <div>
          <h2>Your results</h2>
          <p>Correct: {result.correct}</p>
          <p>Wrong: {result.wrong}</p>
          <p>Skipped: {result.skipped}</p>
        </div> : this.props.error ? <div>
          <ErrorMessage error={this.props.error} />
          <Button onClick={this.onTrySubmitAgainClick}>Try submit again</Button>
        </div> : 'no result'}
        <Button onClick={this.onHomeClick} size={ButtonSizes.LG}>Home</Button>
      </div>}
      </div>
    );
  }

  private onTrySubmitAgainClick() {
    if (this.props.submitAnswers) {
      this.props.submitAnswers(this.props.answers ? this.props.answers : []);
    }
  }

  private onHomeClick() {
    if (this.props.resetQuiz) {
      this.props.resetQuiz();
    }
  }
}

const mapStateToProps = (state: IReducer): IResultPageProps => {
  return {
    answers: state.answers.answers,
    error: state.result.error,
    loading: state.result.fetching,
    result: state.result.result || undefined,
  }
}

const mapDispatchToProps = (dispatch: any): IResultPageProps => {
  return {
    resetQuiz: () => {
      dispatch(resetQuiz())
    },
    submitAnswers: (answers: IAnswer[]) => {
      dispatch(submitAnswers(answers))
    },
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResultPage);
