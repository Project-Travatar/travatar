import Header from "./Header";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import '../stylesheets/landing.css';

const Main = () => {
  const { user } = useSelector((state) => state.user);
  
  return (
    <div>
      <Header />
      <body id="landing">
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

      </body>

    </div>
  );
};

export default Main;