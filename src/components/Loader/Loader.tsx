import * as React from 'react';
import './Loader.css';
import logo from './logo.svg';

interface ILoaderProps {
    loading?: boolean,
}

class Loader extends React.PureComponent<ILoaderProps> {
    public render() {
        return (
            <div className={this.className}>
                <img className='Loader-img' src={logo} alt="Loading..." />
            </div>
        );
    }

    get className() {
        let className = 'Loader';
        if (this.props.loading !== false) {
            className += ' Loader-loading';
        }
        return className;
    }
}

export default Loader;
