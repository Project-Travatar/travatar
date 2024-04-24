import Header from "./Header";
import { Link } from "react-router-dom";
import '../stylesheets/landing.css';

const Main = () => {
  return (
    <div>
      <Header />
      <body id="landing">
        <p id="slogan">Let us plan the trip of your dreams...</p>
        <Link to='/form' id='start'>Get Started </Link>
      </body>
      
    </div>
  );
};

export default Main;