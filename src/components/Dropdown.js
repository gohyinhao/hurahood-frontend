import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Dropdown extends Component {
    state = {
        isListHidden: true,
    };

    render() {
        const { areItemsLinks, className, items, leftIcon, rightIcon, title } = this.props;
        const classNames = 'dropdown ' + (className ? className : '');
        const listClassNames =
            'dropdown__list ' + (this.state.isListHidden ? 'dropdown__list--hidden' : '');

        return (
            <div
                className={classNames}
                onMouseOver={() => this.setState({ isListHidden: false })}
                onMouseOut={() => this.setState({ isListHidden: true })}
            >
                <div className="dropdown__header">
                    {leftIcon && <img src={leftIcon} className="dropdown__icon" />}
                    {title && <span className="dropdown__title">{title}</span>}
                    {rightIcon && <img src={rightIcon} className="dropdown__icon" />}
                </div>
                <ul className={listClassNames}>
                    {items.map((item, index) =>
                        areItemsLinks ? (
                            <Link
                                key={index}
                                to={item.link}
                                className="dropdown__link dropdown__list-item"
                            >
                                {item.text}
                            </Link>
                        ) : (
                            <li className="dropdown__list-item" key={index}>
                                {item.text}
                            </li>
                        ),
                    )}
                </ul>
            </div>
        );
    }
}

Dropdown.propTypes = {
    areItemsLinks: PropTypes.bool,
    className: PropTypes.string,
    items: PropTypes.array,
    leftIcon: PropTypes.string,
    rightIcon: PropTypes.string,
    title: PropTypes.string,
};

Dropdown.defaultProps = {
    areItemsLinks: false,
    className: '',
    items: [],
    leftIcon: '',
    rightIcon: '',
    title: '',
};

export default Dropdown;
