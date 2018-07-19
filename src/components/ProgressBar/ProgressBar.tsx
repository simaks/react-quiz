import * as React from 'react';
import './ProgressBar.css';

interface IProgressBarProps {
    done: number,
    total: number,
}

export class ProgressBar extends React.PureComponent<IProgressBarProps> {
    public render() {
        return (
            <div className='ProgressBar'>
                <div className='ProgressBar-progress' style={this.progressStyle}>
                    <div className='ProgressBar-text'>
                        {this.progressText}
                    </div>
                </div>
            </div>
        );
    }

    get progressStyle(): React.CSSProperties {
        return { minWidth: `${this.props.done / this.props.total * 100}%` };
    }

    get progressText() {
        return `${Math.round(this.props.done / this.props.total * 100)}%`;
    }
}

export default ProgressBar;
