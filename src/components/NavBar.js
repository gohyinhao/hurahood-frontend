import React from 'react';
import Searchbar from './Searchbar';
import Icon from './Icon';

// TOOD: add onSubmit for searchbar

// TODO: add icon links
const icons = [
    {
        iconName: 'calendar',
        iconPath: 'public/fontawesome/regular/calendar-alt.svg',
    },
    {
        iconName: 'chat',
        iconPath: 'public/fontawesome/regular/comment-alt.svg',
    },
    {
        iconName: 'favourites',
        iconPath: 'public/fontawesome/regular/heart.svg',
    },
    {
        iconName: 'profile',
        iconPath: 'public/fontawesome/solid/user.svg',
    },
];

const NavBar = () => {
    return (
        <header className="navbar">
            <h1 className="navbar__title">hurahood</h1>
            <Searchbar />
            <nav className="navbar__icons">
                {icons.map((icon) => (
                    <Icon
                        key={icon.iconName}
                        link="#"
                        linkClassName="navbar__icon-link"
                        iconPath={icon.iconPath}
                        iconClassName={`navbar__icon navbar__icon--${icon.iconName}`}
                    />
                ))}
            </nav>
        </header>
    );
};

export default NavBar;
