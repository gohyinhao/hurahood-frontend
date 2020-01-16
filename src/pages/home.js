import React from 'react';
import NavBar from '../components/navBar.js';

class HomePage extends React.Component {
  render() {
    return (
      <div className='page'>
        <NavBar />
        <div className='homepage__container'>
          <h1 className='homepage__container__header'>App For Me</h1>
          <h3 className='homepage__container__subheading'>
            Appointment & Personal Planner made for easy booking
          </h3>
        </div>
      </div>
    );
  }
}

export default HomePage;
