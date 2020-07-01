import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Searchbar from './Searchbar';
import Dropdown from './Dropdown';
import Icon from './Icon';
import Modal from './Modal';
import UserAPI from '../api/users';
import UserActions from '../actions/users';
import Helper from '../utils/helper';
import Forms from '../forms';
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

class NavBar extends Component {
    state = {
        showLoginForm: false,
        showSignUpForm: false,
    };

    profileItems = [
        {
            link: '#',
            text: `${this.props.firstName ? `${this.props.firstName}'s ` : ''}Account`,
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
            link: '/user/merchant',
            text: 'Merchant',
        },
        {
            link: '/auth/signout',
            text: 'Sign Out',
        },
    ];

    async componentDidMount() {
        try {
            const user = await UserAPI.fetchUser();
            this.props.updateUser(user);
        } catch (err) {
            // do nothing
        }
    }

    showLoginForm = () => {
        this.setState({ showLoginForm: true, showSignUpForm: false });
    };

    showSignUpForm = () => {
        this.setState({ showLoginForm: false, showSignUpForm: true });
    };

    onClose = () => {
        this.setState({ showLoginForm: false, showSignUpForm: false });
    };

    render() {
        return (
            <header className="navbar">
                <Link to="/" className="navbar__title">
                    hurahood
                </Link>
                <Searchbar className="navbar__search" />
                {Helper.isEmptyObject(this.props.user) ? (
                    <span className="navbar__login" onClick={this.showLoginForm}>
                        Login/Register
                    </span>
                ) : (
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
                            items={this.profileItems}
                        />
                    </nav>
                )}

                <Modal showModal={this.state.showLoginForm} onClose={this.onClose}>
                    <Forms.LoginForm
                        showSignUpForm={this.showSignUpForm}
                        onSuccessfulLogin={this.onClose}
                    />
                </Modal>
                <Modal showModal={this.state.showSignUpForm} onClose={this.onClose}>
                    <Forms.SignUpForm showLoginForm={this.showLoginForm} />
                </Modal>
            </header>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
    updateUser: (user) => dispatch(UserActions.updateUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
