import { Link, useNavigate } from 'react-router-dom';
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import {useSelector, useDispatch} from 'react-redux';
import {logoutUser, resetUser} from '../reducers/userReducer';
import '../stylesheets/header.css'
import arrow from '../assets/arrow.jpg';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
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