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
          {user ? 
            <Link to='/manager'>Trips</Link>
          : <></>}
        </div>
        <div className='text-right m-2'>
          <Link to='/about'>About</Link>
        </div>
        <div className='text-center m-2'>
          <Link to='/register'>Register</Link>
        </div>
        <div>
          {user ? (
            <button 
              className="flex items-center justify-center m-2"
              onClick={() => {
              fetch('/api/users/logout')
              dispatch(logoutUser());
              dispatch(resetUser());
              navigate('/');
            }}
            >
              <span className="flex items-center">
                <FaSignOutAlt className="mr-1" style={{ lineHeight: 1 }} />
                <span style={{ verticalAlign: "middle" }}>Logout</span>
              </span>
            </button>
          ) : (
            <Link className="flex items-center justify-center m-2" to='/login'>
              <span className="flex items-center">
                <FaSignInAlt className="mr-1" style={{ lineHeight: 1 }} />
                <span style={{ verticalAlign: "middle" }}>Login</span>
              </span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;