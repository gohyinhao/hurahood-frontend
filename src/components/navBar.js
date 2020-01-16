import React from 'react';
import { Link } from 'react-router-dom';

class NavBar extends React.Component {
  render() {
    return (
      <div className='nav-bar'>
        <Link className='nav-bar__element' to='/register'>SIGN UP</Link>
        <Link className='nav-bar__element' to='/login'>LOGIN</Link>
      </div>
    );
  }
}

export default NavBar;