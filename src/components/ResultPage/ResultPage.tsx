import * as React from 'react';
import { connect } from 'react-redux';
import { showIntroPage, submitAnswers } from '../../actions';
import { IAnswer, IReducer, IResult } from '../../interfaces';
import Button from '../Button';
import { ButtonSizes } from '../Button/Button';
import ErrorMessage from '../ErrorMessage';
import './ResultPage.css';

interface IResultPageProps {
  answers?: IAnswer[],
  error?: Error | null,
  result?: IResult,
  showIntroPage?: () => void,
  submitAnswers?: (answers: IAnswer[]) => void,
}

class ResultPage extends React.Component<IResultPageProps> {
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
        {result ? <div>
          <h2>Your results</h2>
          <p>Correct: {result.correct}</p>
          <p>Wrong: {result.wrong}</p>
          <p>Skipped: {result.skipped}</p>
        </div> : 'no result'}
        {this.props.error ? <div>
          <ErrorMessage error={this.props.error} />
          <Button onClick={this.onTrySubmitAgainClick}>Try submit again</Button>
        </div> : ''}
        <Button onClick={this.onHomeClick} size={ButtonSizes.LG}>Home</Button>
      </div>
    );
  }

  private onTrySubmitAgainClick() {
    if (this.props.submitAnswers) {
      this.props.submitAnswers(this.props.answers ? this.props.answers : []);
    }
  }

  private onHomeClick() {
    if (this.props.showIntroPage) {
      this.props.showIntroPage();
    }
  }
}

const mapStateToProps = (state: IReducer): IResultPageProps => {
  return {
    answers: state.answers.answers,
    error: state.result.error,
    result: state.result.result || undefined,
  }
}

const mapDispatchToProps = (dispatch: any): IResultPageProps => {
  return {
    showIntroPage: () => {
      dispatch(showIntroPage())
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
