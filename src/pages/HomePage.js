import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Carousel from '../components/carousel/Carousel';
import CarouselList from '../components/carousel/CarouselList';
import List from '../components/List';
import ProductItem from '../components/product/ProductItem';
import ListItem from '../components/ListItem';
import ScrollableList from '../components/ScrollableList';
import Message from '../components/Message';
import Form from '../components/Form';
import Button from '../components/Button';
import TextInput from '../components/input/TextInput';
import HairdresserImage from '../assets/images/hairdresser.jpg';
import HairdresserImage2 from '../assets/images/hairdresser-2.jpg';

const trendingItems = [
    {
        brand: 'ABC Haircut',
        service: 'Haircut',
        image: HairdresserImage2,
        location: 'ABC Road',
        rating: 0.5,
        numOfRatings: 10,
    },
    {
        brand: 'ABC Haircut',
        service: 'Haircut',
        image: HairdresserImage2,
        location: 'ABC Road',
        rating: 1.2,
        numOfRatings: 10,
    },
    {
        brand: 'ABC Haircut',
        service: 'Haircut',
        image: HairdresserImage2,
        location: '6 Petir Rd',
        rating: 2.3,
        numOfRatings: 10,
    },
    {
        brand: 'ABC Haircut',
        service: 'Haircut',
        image: HairdresserImage,
        location: 'ABC Road',
        rating: 3.55,
        numOfRatings: 10,
    },
    {
        brand: 'ABC Haircut',
        service: 'Haircut',
        image: HairdresserImage,
        location: 'ABC Road',
        rating: 4.89,
        numOfRatings: 10,
    },
    {
        brand: 'ABC Haircut',
        service: 'Haircut',
        image: HairdresserImage,
        rating: 5.0,
        numOfRatings: 10,
    },
    {
        brand: 'ABC Haircut',
        service: 'Haircut',
        image: HairdresserImage2,
        location: 'ABC Road',
        rating: 4.23,
        numOfRatings: 10,
    },
    {
        brand: 'ABC Haircut',
        service: 'Haircut',
        image: HairdresserImage2,
        location: '17 Cheong Chin Nam Rd',
        rating: 4.26,
        numOfRatings: 10,
    },
    {
        brand: 'ABC Haircut',
        service: 'Haircut',
        image: HairdresserImage2,
        location: 'ABC Road',
        rating: 4.49,
        numOfRatings: 10,
    },
];

const bulletinItems = [
    {
        title: '[Title of article]',
        content:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima aspernatur incidunt repellendus cupid',
    },
    {
        title: 'Addition of new service!',
        content: 'Hurahood will be introducing eye brow threading atop the mountain peaks',
    },
    {
        title: 'testing really long content',
        content:
            'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Error, reiciendis quae voluptatum explicabo dolorem earum facere porro consectetur reprehenderit accusamus necessitatibus fugiat cupiditate aut voluptates quaerat id harum architecto? Neque?',
    },
];

class HomePage extends Component {
    state = {
        messageText: '',
    };

    onMessageTextChange = (messageText) => {
        this.setState(() => ({
            messageText,
        }));
    };

    onSubmit = () => {};

    render() {
        return (
            <>
                <Carousel />
                <CarouselList />
                <h2>Trending</h2>
                <List className="homepage__list">
                    {trendingItems.map((item, index) => (
                        <ProductItem
                            key={index}
                            brand={item.brand}
                            image={item.image}
                            location={item.location}
                            numOfRatings={item.numOfRatings}
                            rating={item.rating}
                            service={item.service}
                        />
                    ))}
                </List>
                <div className="homepage__list-link-wrapper">
                    <Link to="#" className="homepage__list-link">
                        See more
                    </Link>
                </div>
                <div className="homepage__services">
                    <h2>Featured Services</h2>
                </div>
                <ScrollableList className="homepage__bulletin" title="Bulletin">
                    {bulletinItems.map(({ title, content }, index) => (
                        <ListItem key={index} title={title} content={content} />
                    ))}
                </ScrollableList>
                <Message className="homepage__message-wrapper">
                    <p className="homepage__message">
                        Want to stay updated with our news and best deals around you? Sign up for
                        our newsletter now!
                    </p>
                    <Form className="homepage__form" onSubmit={this.onSubmit}>
                        <TextInput
                            className="homepage__text-input"
                            onChange={this.onMessageTextChange}
                            placeholder="Enter your email address"
                            type="email"
                            value={this.state.messageText}
                        />
                        <Button onClick={this.onSubmit} text="Sign up" />
                    </Form>
                </Message>
            </>
        );
    }
}

export default HomePage;
