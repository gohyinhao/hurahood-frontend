import React from 'react';
import { Link } from 'react-router-dom';
import Carousel from '../components/carousel/Carousel';
import CarouselList from '../components/carousel/CarouselList';
import List from '../components/List';
import ProductItem from '../components/product/ProductItem';
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
        rating: 5,
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

const HomePage = () => (
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
    </>
);

export default HomePage;
