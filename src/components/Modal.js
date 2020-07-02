import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Modal extends Component {
    componentDidMount() {
        if (this.props.showModal) {
            this.refs.modal.focus();
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.showModal) {
            this.refs.modal.focus();
        }
    }

    onEsc = (e) => {
        if (!e.isComposing && e.keyCode === 27) {
            this.props.onClose();
        }
    };

    render() {
        const {
            className,
            children,
            isLightBackground,
            showModal,
            showCloseSign,
            onClose,
        } = this.props;
        const classNames =
            `modal ${showModal ? '' : 'modal--hidden '} ${
                isLightBackground ? 'modal--light-bg ' : ''
            }` + (className ? className : '');

        return (
            <div
                ref="modal"
                className={classNames}
                onKeyDown={this.onEsc}
                tabIndex="-1"
                onClick={onClose}
            >
                <div className="modal__container" onClick={(e) => e.stopPropagation()}>
                    {showCloseSign && (
                        <div className="modal__close-sign" onClick={onClose}>
                            &#10005;
                        </div>
                    )}
                    {children}
                </div>
            </div>
        );
    }
}

Modal.propTypes = {
    className: PropTypes.string,
    isLightBackground: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
    showCloseSign: PropTypes.bool,
    showModal: PropTypes.bool.isRequired,
};

Modal.defaultProps = {
    className: '',
    isLightBackground: false,
    showCloseSign: false,
};

export default Modal;
