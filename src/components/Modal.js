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
        const { className, children, showModal, onClose } = this.props;
        const classNames =
            `modal ${showModal ? '' : 'modal--hidden '}` + (className ? className : '');

        return (
            <div
                ref="modal"
                className={classNames}
                onKeyDown={this.onEsc}
                tabIndex="-1"
                onClick={onClose}
            >
                <div className="modal__container" onClick={(e) => e.stopPropagation()}>
                    {children}
                </div>
            </div>
        );
    }
}

Modal.propTypes = {
    className: PropTypes.string,
    onClose: PropTypes.func.isRequired,
    showModal: PropTypes.bool.isRequired,
};

Modal.defaultProps = {
    className: '',
};

export default Modal;
