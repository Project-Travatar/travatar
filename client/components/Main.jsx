import Header from "./Header";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import '../stylesheets/landing.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginUserSync } from '../reducers/userReducer';

const Main = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    // console.log('Main useEffect');
    (async () => {
      const response = await fetch('/api/users/verifyCookie')
      if(!response.ok) {
        console.log('No user logged in');
      }
      else {
        const userData = await response.json();
        // console.log('userData', userData);
        dispatch(loginUserSync(userData));
      }

    })();
   
  }, []);
  
  return (
    <div>
      <div id="landing">
        <div className="landing-content">
          <div className="slogan">
            {user ? (
              <div>
                <p>Let us plan the trip of your dreams...</p>
                <Link to='/form' className='get-started'>GET STARTED</Link>
              </div>) : (
                <p>Register or login to get started...</p>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};

export default Main;