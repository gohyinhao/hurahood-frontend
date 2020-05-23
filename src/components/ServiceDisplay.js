import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ServiceDisplay extends Component {
    state = {
        activeServiceIndex: 0,
        activeInfoIndex: 0,
    };

    onSelectChange = (activeServiceIndex) => {
        this.setState(() => ({
            activeServiceIndex,
        }));
    };

    render() {
        const { activeServiceIndex: index } = this.state;
        const { className, services } = this.props;
        const classNames = 'service-display ' + (className ? className : '');
        const { price, description, info } = services[index];

        return (
            <div className={classNames}>
                <h2>Services</h2>
                <div className="service-display__select-wrapper">
                    <select
                        className="service-display__select"
                        onChange={(e) => {
                            const value = e.target.value;
                            this.onSelectChange(value);
                        }}
                        value={this.state.activeServiceIndex}
                    >
                        {services.map((service, index) => (
                            <option key={index} value={index}>
                                {service.name}
                            </option>
                        ))}
                    </select>
                    <span className="service-display__price">${price}</span>
                </div>
                <p className="service-display__description">{description}</p>
                {info && (
                    <div className="service-display__info-wrapper">
                        {info.map((infoPart, index) => {
                            const infoClassNames =
                                'service-display__info-header ' +
                                (index === this.state.activeInfoIndex
                                    ? 'service-display__info-header--active'
                                    : '');
                            return (
                                <span
                                    onClick={() =>
                                        this.setState(() => ({
                                            activeInfoIndex: index,
                                        }))
                                    }
                                    className={infoClassNames}
                                    key={index}
                                >
                                    Information {String.fromCharCode(65 + index)}
                                </span>
                            );
                        })}
                        <p className="service-display__info">{info[this.state.activeInfoIndex]}</p>
                    </div>
                )}
            </div>
        );
    }
}

ServiceDisplay.propTypes = {
    services: PropTypes.arrayOf(
        PropTypes.shape({
            description: PropTypes.string.isRequired,
            info: PropTypes.arrayOf(PropTypes.string),
            name: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
        }),
    ).isRequired,
};

export default ServiceDisplay;
