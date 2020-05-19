import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SearchIcon from '../assets/images/search.svg';

class Searchbar extends Component {
    state = {
        text: '',
    };

    onChange = (e) => {
        const text = e.target.value;
        this.setState(() => ({ text }));
    };

    render() {
        return (
            <form className={`searchbar ${this.props.className}`} onSubmit={this.props.onSubmit}>
                <button className="searchbar__button">
                    <img src={SearchIcon} className="searchbar__icon" />
                </button>
                <input
                    type="text"
                    placeholder="Search for service or salon name"
                    value={this.state.searchText}
                    className="searchbar__input"
                    onChange={this.onChange}
                    autoComplete="on"
                />
            </form>
        );
    }
}

Searchbar.propTypes = {
    className: PropTypes.string,
    // onSubmit: PropTypes.func.isRequired,
};

Searchbar.defaultProps = {
    className: '',
};

export default Searchbar;
