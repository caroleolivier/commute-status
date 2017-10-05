import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ErrorMessage extends Component {
    render() {
        return (
            <div>
                {this.props.message}
            </div>
        );
    }
}
ErrorMessage.propTypes = {
    message: PropTypes.string.isRequired
};

export default ErrorMessage;
