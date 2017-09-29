import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BusArrivalHeader extends Component {
    render() {
        const direction = this.props.direction;

        return (
            <div>
                <h3>Buses towards {direction}</h3>
            </div>
        );
    }
}
BusArrivalHeader.propTypes = {
    direction: PropTypes.string.isRequired
};

export default BusArrivalHeader;
