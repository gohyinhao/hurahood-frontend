import React, { Component } from 'react';
import { connect } from 'react-redux';
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
import CarouselThumbnail from '../components/carousel/CarouselThumbnail';
import FacialImage from '../assets/images/facial.jpg';
import MassageImage from '../assets/images/massage.jpg';
import ManicureImage from '../assets/images/manicure.jpg';
import HairTreatmentImage from '../assets/images/hair-treatment.png';
import HairCutImage from '../assets/images/hair-cut.jpg';

const thumbnails = [
    {
        title: 'Facial',
        image: FacialImage,
        path: '/explore?categories[]=facial',
    },
    {
        title: 'Massage',
        image: MassageImage,
        path: '/explore?categories[]=massage',
    },
    {
        title: 'Manicure',
        image: ManicureImage,
        path: '/explore?categories[]=manicure',
    },
    {
        title: 'Hair Treatment',
        image: HairTreatmentImage,
        path: '/explore?categories[]=hair-treatment',
    },
    {
        title: 'Hair Cut',
        image: HairCutImage,
        path: '/explore?categories[]=hair-cut',
    },
    {
        title: 'Facial',
        image: FacialImage,
        path: '/explore?categories[]=facial',
    },
    {
        title: 'Massage',
        image: MassageImage,
        path: '/explore?categories[]=massage',
    },
    {
        title: 'Manicure',
        image: ManicureImage,
        path: '/explore?categories[]=manicure',
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
                <CarouselList
                    caretStyle="thick"
                    scrollValue={220}
                    className="homepage__carousel-list"
                >
                    {thumbnails.map(({ image, path, title }, index) => (
                        <CarouselThumbnail key={index} image={image} title={title} path={path} />
                    ))}
                </CarouselList>
                <h2>Trending</h2>
                <List className="homepage__list">
                    {this.props.trendingProducts.map((item, index) => (
                        <Link to={`product/${item.id}`} key={index} className="homepage__list-item">
                            <ProductItem
                                brand={item.brand}
                                image={item.image}
                                location={item.location}
                                numOfRatings={item.numOfRatings}
                                rating={item.rating}
                                category={item.category}
                            />
                        </Link>
                    ))}
                </List>
                <div className="homepage__list-link-wrapper">
                    <Link to="/explore" className="homepage__list-link">
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
                        <Button
                            onClick={this.onSubmit}
                            text="Sign up"
                            textColor="white"
                            backgroundColor="black"
                        />
                    </Form>
                </Message>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    trendingProducts: state.products.trendingList,
});

export default connect(mapStateToProps)(HomePage);
