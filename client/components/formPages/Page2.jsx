import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { updateStartDate, updateEndDate } from '../../reducers/tripReducer';
import '../../stylesheets/formPages/page2.css';

const Page2 = () => {
  const navigate = useNavigate();

  const { startDate, endDate } = useSelector(state => state.trip);
  
  const dispatch = useDispatch();

  const handleInputChange = e => {
    const { name, value } = e.target;
    if (name === 'startDate') {
      dispatch(updateStartDate(value));
    } else {
      dispatch(updateEndDate(value));
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      navigate('/form/page3');
    }
  };

  return (
    <div className="page-2 rounded">
      <div>
        <label className='text-2xl text-[#95a3c1]' htmlFor="startDate">
          Start Date:
        </label>
        <input className='typed-input trip-details-input' 
          type="date"
          name="startDate"
          value={startDate}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div>
        <label className='text-2xl text-[#95a3c1]' htmlFor="endDate">
          End Date:
        </label>
        <input className='typed-input trip-details-input'
          type="date"
          name="endDate"
          value={endDate}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div >
        <Link to='/form'>
          <button className='m-4 trip-details-button' type='button'>Back</button>
        </Link>
        <Link to='/form/page3'>
          <button className='m-4 trip-details-button' type='button'>Next</button>
        </Link>
      </div>
    </div>
  );
};

export default Page2;