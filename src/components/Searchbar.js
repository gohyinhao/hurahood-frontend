import React, { Component } from 'react';

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
            <form className="searchbar" onSubmit={this.props.onSubmit}>
                <button className="searchbar__button">
                    <img src="public/images/search.svg" className="searchbar__icon" />
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
