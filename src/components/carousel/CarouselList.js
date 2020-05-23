import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LeftCaret from '../../assets/fontawesome/solid/angle-left.svg';
import RightCaret from '../../assets/fontawesome/solid/angle-right.svg';
import ThickLeftCaret from '../../assets/fontawesome/solid/caret-left.svg';
import ThickRightCaret from '../../assets/fontawesome/solid/caret-right.svg';

class CarouselList extends Component {
    state = {
        isLeftCaretDisabled: true,
        isRightCaretDisabled:
            this.carousel && this.carousel.current.offsetWidth >= this.carousel.current.scrollWidth
                ? true
                : false,
    };

    carousel = React.createRef();

    componentDidMount() {
        if (this.props.initialScrollPosition !== 0) {
            this.carousel.current.scrollLeft = initialScrollPosition;
            this.updateCaretState(initialScrollPosition);
        }
    }

    updateCaretState = (scrollLeft) => {
        const { offsetWidth, scrollWidth } = this.carousel.current;

        this.setState(() => ({
            isLeftCaretDisabled: scrollLeft <= 0 ? true : false,
            isRightCaretDisabled: scrollLeft + offsetWidth >= scrollWidth ? true : false,
        }));

        if (this.props.onScroll) {
            this.props.onScroll(scrollLeft);
        }
    };

    onNext = () => {
        const scrollAdjustment =
            this.carousel.current.scrollLeft <= 0
                ? this.props.firstScrollValue
                : this.props.scrollValue;
        this.carousel.current.scrollLeft += scrollAdjustment;
        this.updateCaretState(this.carousel.current.scrollLeft + scrollAdjustment);
    };

    onPrevious = () => {
        const { offsetWidth, scrollWidth } = this.carousel.current;
        const scrollAdjustment =
            this.carousel.current.scrollLeft + offsetWidth >= scrollWidth
                ? this.props.lastScrollValue
                : this.props.scrollValue;
        this.carousel.current.scrollLeft -= scrollAdjustment;
        this.updateCaretState(this.carousel.current.scrollLeft - scrollAdjustment);
    };

    render() {
        const {
            caretStyle,
            className,
            children,
            imageWrapperClassName,
            useInvisibleCarets,
        } = this.props;

        const classNames =
            'carousel-list ' +
            (useInvisibleCarets ? '' : 'carousel-list--padding ') +
            (className ? className : '');
        const wrapperClassNames =
            'carousel-list__wrapper ' + (imageWrapperClassName ? imageWrapperClassName : '');
        const leftCaretClassNames =
            'carousel-list__caret' +
            (this.state.isLeftCaretDisabled ? ' carousel-list__caret--disabled' : '');
        const rightCaretClassNames =
            'carousel-list__caret' +
            (this.state.isRightCaretDisabled ? ' carousel-list__caret--disabled' : '');
        const leftCaretWrapperClassNames =
            'carousel-list__caret-wrapper carousel-list__caret-wrapper--left ' +
            (useInvisibleCarets ? 'carousel-list__caret-wrapper--invisible ' : '') +
            (caretStyle === 'none' ? 'carousel-list__caret-wrapper--none' : '');
        const rightCaretWrapperClassNames =
            'carousel-list__caret-wrapper carousel-list__caret-wrapper--right ' +
            (useInvisibleCarets ? 'carousel-list__caret-wrapper--invisible ' : '') +
            (caretStyle === 'none' ? 'carousel-list__caret-wrapper--none' : '');

        return (
            <div className={classNames}>
                <div className={leftCaretWrapperClassNames}>
                    <img
                        onClick={this.onPrevious}
                        src={caretStyle === 'thick' ? ThickLeftCaret : LeftCaret}
                        className={leftCaretClassNames}
                    />
                </div>
                <div className={wrapperClassNames} ref={this.carousel}>
                    {children}
                </div>
                <div className={rightCaretWrapperClassNames}>
                    <img
                        onClick={this.onNext}
                        src={caretStyle === 'thick' ? ThickRightCaret : RightCaret}
                        className={rightCaretClassNames}
                    />
                </div>
            </div>
        );
    }
}

CarouselList.propTypes = {
    caretStyle: PropTypes.oneOf(['normal', 'thick', 'none']),
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
    firstScrollValue: PropTypes.number,
    imageWrapperClassName: PropTypes.string,
    initialScrollPosition: PropTypes.number,
    lastScrollValue: PropTypes.number,
    onScroll: PropTypes.func,
    scrollValue: PropTypes.number,
    useInvisibleCarets: PropTypes.bool,
};

CarouselList.defaultProps = {
    caretStyle: 'normal',
    className: '',
    firstScrollValue: 200,
    imageWrapperClassName: '',
    initialScrollPosition: 0,
    lastScrollValue: 200,
    onScroll: undefined,
    scrollValue: 200,
    useInvisibleCarets: false,
};

export default CarouselList;
