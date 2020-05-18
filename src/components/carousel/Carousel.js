import React, { Component } from 'react';
import CarouselSlide from './CarouselSlide';
import DotSlider from '../DotSlider';
import MountainPic from '../../assets/images/mountains.jpg';

const slides = [
    {
        title: 'Hurahood beta',
        subtitle: 'Your one stop e-neighbourhood of services for appointment scheduling',
    },
    {
        title: 'test 2',
        subtitle: 'This is a test site. There are going to be bugs',
    },
    {
        title: 'Facial with mountains',
        subtitle: 'Enjoy your facial facing the Au Naturel mountain peaks!',
        image: MountainPic,
    },
];

class Carousel extends Component {
    state = {
        activeIndex: 0,
    };

    componentDidMount() {
        this.interval = setInterval(() => this.nextSlide(), 7000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    nextSlide = () => {
        this.setState((prevState) => {
            if (prevState.activeIndex + 1 === slides.length) {
                return {
                    activeIndex: 0,
                };
            } else {
                return {
                    activeIndex: prevState.activeIndex + 1,
                };
            }
        });
    };

    onDotClick = (activeIndex) => {
        this.setState(() => ({ activeIndex }));
    };

    render() {
        return (
            <div className="carousel">
                {slides.map(({ title, subtitle, image }, index) => (
                    <CarouselSlide
                        key={index}
                        isActive={this.state.activeIndex === index ? true : false}
                        title={title}
                        subtitle={subtitle}
                        image={image}
                    />
                ))}
                <DotSlider
                    activeIndex={this.state.activeIndex}
                    className="carousel__dot-slider"
                    onClick={this.onDotClick}
                    numOfDots={slides.length}
                />
            </div>
        );
    }
}

export default Carousel;
