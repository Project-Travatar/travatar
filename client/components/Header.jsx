import { Link } from 'react-router-dom';
import '../stylesheets/header.css'
import arrow from '../assets/arrow.jpg';

const Header = () => {

  return (
    <div className="header-container flex">
      <div className="logo">
        <Link to='/' className='text-white text-3xl text-center name'>
          TRAVATAR</Link>
          <img className="arrow" src={arrow} />
      </div>
      <div className="headerItems flex">
        <div className='text-right m-2'>
          <Link to='/manager'>Manager</Link>
        </div>
        <div className='text-right m-2'>
          <Link to='/about'>About</Link>
        </div>
        <div className='text-center m-2'>
          <Link to='/register'>Register</Link>
        </div>
        <div className='text-center m-2'>
          <Link to='/login'>Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Header;