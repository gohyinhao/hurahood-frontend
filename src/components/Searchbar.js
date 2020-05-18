import React, { Component } from 'react';
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

// TODO: set default props. must have onSubmit

export default Searchbar;
