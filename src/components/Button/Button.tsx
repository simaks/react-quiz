import * as React from 'react';
import './Button.css';

export enum ButtonTypes {
    DEFAULT = "DEFAULT",
    WARNING = "WARNING",
    SUCCESS = "SUCCESS",
    DANGER = "DANGER",
}

export enum ButtonSizes {
    MD = "MD",
    LG = "LG",
}

interface IButtonProps {
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => any,
    disabled?: boolean,
    type?: ButtonTypes,
    size?: ButtonSizes,
}

class Button extends React.PureComponent<IButtonProps> {
    public render() {
        return (
            <button
                className={this.className}
                disabled={this.props.disabled}
                onClick={this.props.onClick}>
                {this.props.children}
            </button>
        );
    }

    get className(): string {
        let className = 'Button';
        switch (this.props.size) {
            case ButtonSizes.LG:
                className += ' Button-lg';
                break;
            case ButtonSizes.MD:
            default:
                className += ' Button-md';
        }
        switch (this.props.type) {
            case ButtonTypes.SUCCESS:
                className += ' Button-success';
                break;
            case ButtonTypes.WARNING:
                className += ' Button-warning';
                break;
            case ButtonTypes.DANGER:
                className += ' Button-danger';
                break;
            case ButtonTypes.DEFAULT:
            default:
                className += ' Button-default';
        }
        return className;
    }
}

export default Button;
