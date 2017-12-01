import * as React from 'react';

interface IErrorMessageProps {
    message: string;
}

export class ErrorMessage extends React.Component<IErrorMessageProps, {}> {
    render(): JSX.Element {
        return (
            <div>
                {this.props.message}
            </div>
        );
    }
}
