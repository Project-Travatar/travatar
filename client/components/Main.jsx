import Header from "./Header";
import { Link } from "react-router-dom";
import '../stylesheets/landing.css';

const Main = () => {
  return (
    <div>
      <Header />
      <body id="landing">
        <div className="slogan">
          <p>Let us plan the trip of your dreams...</p>
        </div>
          <Link to='/form' className='start'>GET STARTED</Link>
        
      </body>
      
    </div>
  );
};

export default Main;