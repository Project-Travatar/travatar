import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { updateActivities } from '../../reducers/tripReducer';

const Page3 = () => {
  const navigate = useNavigate();

  const { activities } = useSelector(state => state.trip);

  const dispatch = useDispatch();

  const selected = new Array(...activities);

  const handleActivitiesChange = e => {
    const { value, checked } = e.target;
    if (checked) {
      selected.push(value);
    } else {
      const index = selected.indexOf(value);
      selected.splice(index, 1);
    }
    dispatch(updateActivities(selected));
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      navigate('/form/page4');
    }
  };

  function renderActCards() {
    const acts = ['Hiking', 'Local Events', 'Restaurants', 'Danger', 'Museums', 'Performances']
    return (
      <ul className="activities">
        {acts.map((activity, index) => (
          <li key={index} className='activity-card'>
            <label>
              <input
                type="checkbox"
                value={activity}
                onChange={handleActivitiesChange}
                checked={activities.includes(activity)}
                onKeyDown={handleKeyDown}
              />
              {activity}
            </label>
          </li>
        ))}
      </ul>
    );
  }
  return (
    <div className="bg-gray-300 rounded border-4 border-black ">
      <p className='text-2xl text-center'>Select activities you are interested in...</p>
      {renderActCards()}
      <div>
        <Link to='/form/page2'>
          <button className='m-4 underline text-blue-600' type='button'>Back</button>
        </Link>
        <Link to='/form/page4'>
          <button className='m-4 underline text-blue-600' type='button'>Next</button>
        </Link>
      </div>
    </div>
  );
};

export default Page3;