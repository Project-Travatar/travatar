import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { updateTravelers } from "../../reducers/tripReducer";

const Page5 = () => {
  const { travelers } = useSelector((state) => state.trip);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = e => {
    const { value } = e.target;
    dispatch(updateTravelers(value));
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      navigate('/form/page6');
    }
  };

  return (
    <div className="rounded form-page">
      <label className='text-2xl text-[#95a3c1]' htmlFor="travelers">
        No. of Travelers
      </label>
      <input className="typed-input trip-details-input"
        type="number"
        name="travelers"
        value={travelers}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <div>
        <Link to='/form/page4'>
          <button className='m-4 trip-details-button' type='button'>Back</button>
        </Link>
        <Link to='/form/page6'>
          <button className='m-4 trip-details-button' type='button'>Next</button>
        </Link>
      </div>
    </div>
  );
};

export default Page5;