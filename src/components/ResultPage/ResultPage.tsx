import * as React from 'react';
import { connect } from 'react-redux';
import { submitAnswers } from '../../actions';
import { IAnswer, IReducer, IResult } from '../../interfaces';

interface IResultPageProps {
  answers?: IAnswer[],
  error?: string,
  result?: IResult,
  submitAnswers?: (answers: IAnswer[]) => any,
}

class ResultPage extends React.Component<IResultPageProps> {
  public componentDidMount() {
    if (this.props.submitAnswers) {
      this.props.submitAnswers(this.props.answers ? this.props.answers : []);
    }
  }

  public render() {
    const result = this.props.result;
    return (
      <div>
        {result ? <div>
          <div>Correct: {result.correct}</div>
          <div>Wrong: {result.wrong}</div>
          <div>Missing: {result.missing}</div>
        </div> : 'no result'}
        {this.props.error ? <div>{this.props.error}</div> : ''}
      </div>
    );
  }
}

const mapStateToProps = (state: IReducer): IResultPageProps => {
  return {
    answers: state.answers.answers,
    error: state.result.error ? state.result.error.message : '',
    result: state.result.result || undefined,
  }
}

const mapDispatchToProps = (dispatch: any): IResultPageProps => {
  return {
    submitAnswers: (answers: IAnswer[]) => {
      dispatch(submitAnswers(answers))
    }
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResultPage);
