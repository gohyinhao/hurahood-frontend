import React from 'react';
import { Link } from 'react-router-dom';
import Searchbar from './Searchbar';
import Dropdown from './Dropdown';
import Icon from './Icon';
import CalendarIcon from '../assets/fontawesome/regular/calendar-alt.svg';
import ChatIcon from '../assets/fontawesome/regular/comment-alt.svg';
import HeartIcon from '../assets/fontawesome/regular/heart.svg';
import UserIcon from '../assets/fontawesome/solid/user.svg';

// TOOD: add onSubmit for searchbar

// TODO: add icon links
const icons = [
    {
        iconName: 'calendar',
        icon: CalendarIcon,
    },
    {
        iconName: 'chat',
        icon: ChatIcon,
    },
    {
        iconName: 'favourites',
        icon: HeartIcon,
    },
];

const profileItems = [
    {
        link: '/explore',
        text: 'Account',
    },
    {
        link: '#',
        text: 'History',
    },
    {
        link: '#',
        text: 'Contact Us',
    },
    {
        link: '#',
        text: 'Merchant',
    },
    {
        link: '#',
        text: 'Sign Out',
    },
];

const NavBar = () => {
    return (
        <header className="navbar">
            <Link to="/" className="navbar__title">
                hurahood
            </Link>
            <Searchbar className="navbar__search" />
            <nav className="navbar__icons">
                {icons.map(({ iconName, icon }) => (
                    <Icon
                        key={iconName}
                        link="#"
                        linkClassName="navbar__icon-link"
                        icon={icon}
                        iconClassName={`navbar__icon navbar__icon--${iconName}`}
                    />
                ))}
                <Dropdown
                    areItemsLinks
                    className="navbar__dropdown"
                    leftIcon={UserIcon}
                    items={profileItems}
                />
            </nav>
        </header>
    );
};

export default NavBar;
