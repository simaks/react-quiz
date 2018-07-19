import * as React from 'react';
import './ErrorMessage.css';

interface IErrorMessageProps {
    error: Error,
}

export class ErrorMessage extends React.PureComponent<IErrorMessageProps> {
    public render() {
        return (
            <div className='ErrorMessage'>
                {this.props.error.name}: {this.props.error.message}
            </div>
        );
    }
}

export default ErrorMessage;
