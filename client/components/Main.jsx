import Header from "./Header";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
const Main = () => {
  const { user } = useSelector((state) => state.user);
  
  return (
    <div>
      <Header />
      {user ? (<div><p>Let us plan the trip of your dreams...</p>
      <Link to='/form' id='start'>Click here to get started... </Link></div>) 
       : (<p>Register or login to get started...</p>
       )}
    </div>
  );
};

export default Main;