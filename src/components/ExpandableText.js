import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ExpandableText extends Component {
    state = {
        isExpanded: false,
    };

    onClick = () => {
        this.setState((prevState) => ({
            isExpanded: !prevState.isExpanded,
        }));
    };

    render() {
        const { isExpanded } = this.state;
        const { charLimit, className, text } = this.props;
        const classNames = 'expandable-text ' + (className ? className : '');
        const trimmedText = text.length > charLimit ? text.substring(0, charLimit) + '...' : text;

        return (
            <div className={classNames}>
                <div className="expandable-text__text">{isExpanded ? text : trimmedText}</div>
                {text.length > charLimit && (
                    <span className="expandable-text__toggle" onClick={this.onClick}>
                        See {isExpanded ? 'less' : 'more'}
                    </span>
                )}
            </div>
        );
    }
}

ExpandableText.propTypes = {
    charLimit: PropTypes.number,
    className: PropTypes.string,
    text: PropTypes.string.isRequired,
};

ExpandableText.defaultProps = {
    charLimit: 220, // roughly 2 lines
    className: '',
};

export default ExpandableText;
