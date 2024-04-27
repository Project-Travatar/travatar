import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { updateDestination } from '../../reducers/tripReducer';
import '../../stylesheets/formPages/page1.css';

const Page1 = () => {
  const navigate = useNavigate();

  const { destination } = useSelector(state => state.trip);
  const dispatch = useDispatch();

  const handleInputChange = e => {
    const { value } = e.target;
    dispatch(updateDestination(value));
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      navigate('/form/page2');
    }
  };

  return (
    <div className="bg-gray-300 rounded border-4 border-black page-1">
      <label className='text-2xl' htmlFor="destination">
        Destination:
      </label>
      <input className='typed-input'
        type="text"
        name="destination"
        value={destination}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <div>
        <Link to='/form/page2'>
          <button className='m-4 text-blue-600 underline' type='button'>Next</button>
        </Link>
      </div>
    </div>
  )
};

export default Page1;