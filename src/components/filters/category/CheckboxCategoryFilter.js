import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Checkbox from '../../input/Checkbox';
import { capitalizeCategory } from '../../../utils/categories';

const categories = ['facial', 'massage', 'manicure', 'hair-treatment', 'hair-cut'];

class CheckboxCategoryFilter extends Component {
    onCheckboxChange = (isChecked, category) => {
        const { categories, onChange } = this.props;

        if (isChecked) {
            onChange([category].concat(categories));
        } else {
            onChange(categories.filter((item) => item !== category));
        }
    };

    render() {
        const { className } = this.props;
        const classNames = 'checkbox-category-filter ' + (className ? className : '');

        return (
            <div className={classNames}>
                <h3>Categories</h3>
                <div className="checkbox-category-filter__checkboxes">
                    {categories.map((category) => (
                        <Checkbox
                            key={category}
                            onChange={this.onCheckboxChange}
                            text={capitalizeCategory(category)}
                            isChecked={this.props.categories.includes(category)}
                            value={category}
                        />
                    ))}
                </div>
            </div>
        );
    }
}

CheckboxCategoryFilter.propTypes = {
    categories: PropTypes.arrayOf(PropTypes.string).isRequired,
    className: PropTypes.string,
    onChange: PropTypes.func.isRequired,
};

CheckboxCategoryFilter.defaultProps = {
    className: '',
};

export default CheckboxCategoryFilter;
