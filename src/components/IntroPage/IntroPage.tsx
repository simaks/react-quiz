import * as React from 'react';
import { connect } from 'react-redux';
import { Button } from '../';
import { showQuestionPage } from '../../actions';
import { IReducer } from '../../interfaces';
import { ButtonSizes } from '../Button/Button';
import './IntroPage.css';

interface IIntroPageProps {
  showQuestionPage?: () => void,
}

class IntroPage extends React.PureComponent<IIntroPageProps> {
  constructor(props: IIntroPageProps) {
    super(props);

    this.onStartClick = this.onStartClick.bind(this);
  }

  public render() {
    return (
      <div className='IntroPage'>
        <p>Welcome to React quiz. Are you ready to test your react knowlege?</p>
        <Button onClick={this.onStartClick} size={ButtonSizes.LG}>Start Quiz</Button>
      </div>
    );
  }

  private onStartClick() {
    if (this.props.showQuestionPage) {
      this.props.showQuestionPage();
    }
  }
}

const mapStateToProps = (state: IReducer): IIntroPageProps => {
  return {
  }
}

const mapDispatchToProps = (dispatch: any): IIntroPageProps => {
  return {
    showQuestionPage: () => {
      dispatch(showQuestionPage())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IntroPage)
