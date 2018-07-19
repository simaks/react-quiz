import * as React from 'react';
import './ErrorMessage.css';

interface IErrorMessageProps {
    error: Error,
}

class ErrorMessage extends React.Component<IErrorMessageProps> {
    public render() {
        return (
            <div className='ErrorMessage'>
                {this.props.error.name}: {this.props.error.message}
            </div>
        );
    }
}

export default ErrorMessage;
