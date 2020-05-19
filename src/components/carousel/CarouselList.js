import React, { Component } from 'react';
import CarouselThumbnail from './CarouselThumbnail';
import FacialImage from '../../assets/images/facial.jpg';
import MassageImage from '../../assets/images/massage.jpg';
import ManicureImage from '../../assets/images/manicure.jpg';
import HairTreatmentImage from '../../assets/images/hair-treatment.png';
import HairCutImage from '../../assets/images/hair-cut.jpg';
import LeftCaret from '../../assets/fontawesome/solid/caret-left.svg';
import RightCaret from '../../assets/fontawesome/solid/caret-right.svg';

const thumbnails = [
    {
        title: 'Facial',
        image: FacialImage,
    },
    {
        title: 'Massage',
        image: MassageImage,
    },
    {
        title: 'Manicure',
        image: ManicureImage,
    },
    {
        title: 'Hair Treatment',
        image: HairTreatmentImage,
    },
    {
        title: 'Hair Cut',
        image: HairCutImage,
    },
    {
        title: 'Facial',
        image: FacialImage,
    },
    {
        title: 'Massage',
        image: MassageImage,
    },
    {
        title: 'Manicure',
        image: ManicureImage,
    },
];

class CarouselList extends Component {
    state = {
        isLeftCaretDisabled: true,
        isRightCaretDisabled:
            this.carousel && this.carousel.current.offsetWidth >= this.carousel.current.scrollWidth
                ? true
                : false,
    };

    carousel = React.createRef();

    updateCaretState = (scrollLeft) => {
        const { offsetWidth, scrollWidth } = this.carousel.current;

        this.setState(() => ({
            isLeftCaretDisabled: scrollLeft <= 0 ? true : false,
            isRightCaretDisabled: scrollLeft + offsetWidth >= scrollWidth ? true : false,
        }));
    };

    onNext = () => {
        this.carousel.current.scrollLeft += 200;
        this.updateCaretState(this.carousel.current.scrollLeft + 200);
    };

    onPrevious = () => {
        this.carousel.current.scrollLeft -= 200;
        this.updateCaretState(this.carousel.current.scrollLeft - 200);
    };

    render() {
        const leftCaretClassName =
            'carousel-list__caret carousel-list__caret--left' +
            (this.state.isLeftCaretDisabled ? ' carousel-list__caret--disabled' : '');

        const rightCaretClassName =
            'carousel-list__caret carousel-list__caret--right' +
            (this.state.isRightCaretDisabled ? ' carousel-list__caret--disabled' : '');

        return (
            <div className="carousel-list">
                <img onClick={this.onPrevious} src={LeftCaret} className={leftCaretClassName} />
                <div className="carousel-list__wrapper" ref={this.carousel}>
                    {thumbnails.map(({ image, title }, index) => (
                        <CarouselThumbnail key={index} image={image} title={title} />
                    ))}
                </div>
                <img onClick={this.onNext} src={RightCaret} className={rightCaretClassName} />
            </div>
        );
    }
}

export default CarouselList;