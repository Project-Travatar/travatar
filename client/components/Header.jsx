import { Link, useNavigate } from 'react-router-dom';
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import {useSelector, useDispatch} from 'react-redux';
import {logoutUser, resetUser} from '../reducers/userReducer';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  return (
    <div className="header-container">
      <div>
        <Link to='/' className='text-blue-600 text-3xl font-bold font-serif text-center'>Travelotl</Link>
      </div>
      {user ? <div className='text-right m-2'>
        <Link to='/manager'>Manager</Link>
      </div> : <div></div>}
      <div className='text-right m-2'>
        <Link to='/about'>About</Link>
      </div>
      <div className='text-center m-2'>
        <Link to='/register'>Register</Link>
      </div>
      <div>
        {user ? (
          <button className="text-center m-2"
            onClick={() => {
              dispatch(logoutUser());
              dispatch(resetUser());
              navigate('/');
            }}
          >
            <FaSignOutAlt />Logout
          </button>
        ) : (
          <Link className="text-center m-2" to='/login'>
            <FaSignInAlt />Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;