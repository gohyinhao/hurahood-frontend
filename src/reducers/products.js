import HairdresserImage from '../assets/images/hairdresser.jpg';
import HairdresserImage2 from '../assets/images/hairdresser-2.jpg';

const initialState = {
    product: {},
    trendingList: [
        {
            brand: 'ABC Haircut',
            category: 'Haircut',
            image: HairdresserImage2,
            location: 'ABC Road',
            rating: '0.5',
            numOfRatings: 10,
            id: '1',
        },
        {
            brand: 'ABC Haircut',
            category: 'Haircut',
            image: HairdresserImage2,
            location: 'ABC Road',
            rating: '1.2',
            numOfRatings: 10,
            id: '1',
        },
        {
            brand: 'ABC Haircut',
            category: 'Haircut',
            image: HairdresserImage2,
            location: '6 Petir Rd',
            rating: '2.3',
            numOfRatings: 10,
            id: '1',
        },
        {
            brand: 'ABC Haircut',
            category: 'Haircut',
            image: HairdresserImage,
            location: 'ABC Road',
            rating: '3.5',
            numOfRatings: 10,
            id: '1',
        },
        {
            brand: 'ABC Haircut',
            category: 'Haircut',
            image: HairdresserImage,
            location: 'ABC Road',
            rating: '4.9',
            id: '1',
            numOfRatings: 10,
        },
        {
            brand: 'ABC Haircut',
            category: 'Haircut',
            image: HairdresserImage,
            rating: '5.0',
            numOfRatings: 10,
            id: '1',
        },
        {
            brand: 'ABC Haircut',
            category: 'Haircut',
            image: HairdresserImage2,
            location: 'ABC Road',
            rating: '4.3',
            numOfRatings: 10,
            id: '1',
        },
        {
            brand: 'ABC Haircut',
            category: 'Haircut',
            image: HairdresserImage2,
            location: '17 Cheong Chin Nam Rd',
            rating: '4.6',
            numOfRatings: 10,
            id: '1',
        },
        {
            brand: 'ABC Haircut',
            category: 'Haircut',
            image: HairdresserImage2,
            location: 'ABC Road',
            rating: '4.9',
            numOfRatings: 10,
            id: '1',
        },
    ],
};

const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

export default productsReducer;