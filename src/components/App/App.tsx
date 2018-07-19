import * as React from 'react';
import { connect } from 'react-redux';
import { IntroPage, Loader, QuestionPage, ResultPage } from '..';
import { IReducer } from '../../interfaces';
import { activePage } from '../../reducers/appReducer';
import './App.css';

interface IAppProps {
  activePage?: string,
  loading?: boolean,
}

export class App extends React.PureComponent<IAppProps> {
  get showIntroPage() {
    if (this.props) {
      return false;
    }
    return true;
  }

  get activePage() {
    switch (this.props.activePage) {
      case activePage.INTRO:
        return <IntroPage />
      case activePage.QUESTION:
        return <QuestionPage />
      case activePage.RESULT:
        return <ResultPage />
      default:
        return 'page not found';
    }
  }

  public render() {
    return (
      <div className="App">
        <div className="App-page">
          <Loader loading={this.props.loading} />
          <h1 className="App-title">React QUIZ</h1>
          {this.activePage}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: IReducer): IAppProps => {
  return {
    activePage: state.app.activePage,
    loading: state.result.fetching || state.questions.fetching,
  }
}

const mapDispatchToProps = (dispatch: any): IAppProps => {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
