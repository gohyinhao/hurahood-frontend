import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

class NavBar extends React.Component {
  render() {
    return (
      <div className='nav-bar'>
        <li className='nav-bar__element'>[AppForMe Logo Placeholder]</li>
        <li className='nav-bar__element'>Appointment & Personal Planner made easy</li>

        <li className='nav-bar__right-element'>Login</li>
        <li className='nav-bar__right-element'>About</li>
        <li className='nav-bar__vertical-rule'></li>
        <li className='nav-bar__right-element'>
          <div className='nav-bar__right-element__search-bar'>
            <input type='text' className='nav-bar__right-element__search-bar__text-input' />
            <FontAwesomeIcon icon={ faSearch } className='nav-bar__right-element__search-bar__icon' />
          </div>
        </li>
      </div>
    );
  }
}

export default NavBar;