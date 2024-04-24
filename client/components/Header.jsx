import { Link } from 'react-router-dom';
import '../stylesheets/header.css'

const Header = () => {

  return (
    <div className="header-container flex">
      <div className="logo">
        <Link to='/' className='text-white text-3xl font-bold font-serif text-center'>
          TRAVATAR</Link>
      </div>
      <div className="headerItems">
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