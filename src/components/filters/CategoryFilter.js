import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Checkbox from '../input/Checkbox';

const categories = ['Facial', 'Massage', 'Manicure', 'Hair Treatment', 'Hair Cut'];

class CategoryFilter extends Component {
    state = {
        categories,
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevState !== this.state) {
            this.props.onChange(this.state.categories);
        }
    }

    onCheckboxChange = (isChecked, category) => {
        if (isChecked) {
            this.setState((prevState) => ({
                categories: [category].concat(prevState.categories),
            }));
        } else {
            this.setState((prevState) => ({
                categories: prevState.categories.filter((item) => item !== category),
            }));
        }
    };

    render() {
        const { className } = this.props;
        const classNames = 'category-filter ' + (className ? className : '');

        return (
            <div className={classNames}>
                <h3>Categories</h3>
                <div className="category-filter__checkboxes">
                    {categories.map((category) => (
                        <Checkbox
                            key={category}
                            onChange={this.onCheckboxChange}
                            text={category}
                            isChecked={this.state.categories.includes(category)}
                        />
                    ))}
                </div>
            </div>
        );
    }
}

CategoryFilter.propTypes = {
    className: PropTypes.string,
    onChange: PropTypes.func.isRequired,
};

CategoryFilter.defaultProps = {
    className: '',
};

export default CategoryFilter;
