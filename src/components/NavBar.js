import React from 'react';
import Searchbar from './Searchbar';
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
    {
        iconName: 'profile',
        icon: UserIcon,
    },
];

const NavBar = () => {
    return (
        <header className="navbar">
            <h1 className="navbar__title">hurahood</h1>
            <Searchbar />
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
            </nav>
        </header>
    );
};

export default NavBar;
