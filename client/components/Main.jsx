import Header from "./Header";
import { Link } from "react-router-dom";
import '../stylesheets/landing.css';

const Main = () => {
  return (
    <div>
      <Header />
      <body id="landing">
        <div className="landing-content">
          <div className="slogan">
            <p>Let us plan the trip of your dreams...</p>
          
          <Link to='/form' className='get-started'>GET STARTED</Link>
          </div>
        </div>

      </body>

    </div>
  );
};

export default Main;