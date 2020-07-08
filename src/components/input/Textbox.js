import React from 'react';
import PropTypes from 'prop-types';
import TextInput from './TextInput';

const Textbox = ({
    background,
    className,
    error,
    onChange,
    placeholder,
    type,
    value,
    iconAfter,
    iconAfterClassName,
    iconBefore,
    iconBeforeClassName,
}) => {
    const classNames = 'textbox ' + (className ? className : '');
    const textWrapperClassNames =
        `textbox__text-wrapper textbox__text-wrapper--${background} ` +
        (error ? 'textbox__text-wrapper--error' : '');
    const iconAfterClassNames = 'textbox__icon ' + (iconAfterClassName ? iconAfterClassName : '');
    const iconBeforeClassNames =
        'textbox__icon ' + (iconBeforeClassName ? iconBeforeClassName : '');

    return (
        <span className={classNames}>
            <div className={textWrapperClassNames}>
                {iconBefore && <img className={iconBeforeClassNames} src={iconBefore} />}
                <TextInput
                    className={`textbox__input textbox__input--${background}`}
                    onChange={onChange}
                    placeholder={placeholder}
                    type={type}
                    value={value}
                />
                {iconAfter && <img className={iconAfterClassNames} src={iconAfter} />}
            </div>
            {error && <span className="textbox__error">{error}</span>}
        </span>
    );
};

Textbox.propTypes = {
    background: PropTypes.oneOf(['white', 'grey']),
    className: PropTypes.string,
    error: PropTypes.string,
    iconAfter: PropTypes.string,
    iconAfterClassName: PropTypes.string,
    iconBefore: PropTypes.string,
    iconBeforeClassName: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.string.isRequired,
};

Textbox.defaultProps = {
    background: 'white',
    className: '',
    error: '',
    iconAfter: '',
    iconAfterClassName: '',
    iconBefore: '',
    iconBeforeClassName: '',
    placeholder: '',
    type: 'text',
};

export default Textbox;
