import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { updateItinerary } from '../../reducers/itineraryReducer';
import Loader from '../Loader';
import { updateGroupDescription, updateId } from '../../reducers/tripReducer';
import { useState } from 'react';

const Page6 = () => {
  const formData = useSelector(state => state.trip);
  const { groupDescription } = useSelector(state => state.trip);
  
  const [loading, setLoading] = useState(false);


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDescriptionChange = e => {
    const { value, checked } = e.target;
    if (checked) {
      dispatch(updateGroupDescription(value));
    }
  };

  const handleKeyDown = async (event) => {
    if (event.key === 'Enter') {
      await handleClick();
    }
  };

  const handleClick = async () => {
    setLoading(true);
    try {
      console.log('data sent to back end server to make API request', ' data:', formData);
      const response = await fetch('/api/trip/build', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
        },
        body: JSON.stringify(formData)
      });
      
      const parsedData = await response.json();
      const itinerary = await JSON.parse(parsedData.trip).itinerary;
      // console.log('parsed data:', parsedData.trip);
      // console.log('itin:', itinerary);
      if (response.ok) {
        dispatch(updateItinerary(itinerary));
        dispatch(updateId(parsedData._id))
        console.log('page6 serv res', parsedData);
        navigate('/itinerary');
        setLoading(false);
      } else {
        throw new Error('failed to retrieve data');
      }
    } catch (error) {
      console.error('Error with request:', error);
    }
  }

  function renderGroupCards() {
    const groups = ['Solo Traveler', 'Family with Young Kids', 'Family of All Ages', 'Adults', 'Friends', 'Couple']
    return (
      <ul className="groups">
        {groups.map((group, index) => (
          <li key={index} className='group-card'>
            <label>
              <input
                type="radio"
                name="groupDescription"
                value={group}
                onChange={handleDescriptionChange}
                checked={groupDescription === group}
                onKeyDown={handleKeyDown}
              />
              {group}
            </label>
          </li>
        ))}
      </ul>
    );
  }

return (
    <div className="form-page">
      <div>{
        loading ? <div id='loader'><Loader/></div> :
        <>
          <p className='text-center text-2xl text-[#95a3c1]'>What best describes your travel group...</p>
          {renderGroupCards()}
          {/* <ul className="groups">
            <li>
              <label className='group-card'>
                <input
                  type="radio"
                  name="groupDescription"
                  value="Solo traveler"
                  onChange={handleDescriptionChange}
                  checked={groupDescription === 'Solo traveler'}
                  onKeyDown={handleKeyDown}
                />
                Solo traveler
              </label>
            </li>
            <li>
              <label className='group-card'>
                <input
                  type="radio"
                  name="groupDescription"
                  value="Family with young kids"
                  onChange={handleDescriptionChange}
                  checked={groupDescription === 'Family with young kids'}
                  onKeyDown={handleKeyDown}
                />
                Family (young kids)
              </label>
            </li>
            <li>
              <label className='group-card'> 
                <input
                  type="radio"
                  name="groupDescription"
                  value="Family of all ages"
                  onChange={handleDescriptionChange}
                  checked={groupDescription === 'Family of all ages'}
                  onKeyDown={handleKeyDown}
                />
                Family (all ages)
              </label>
            </li>
            <li>
              <label className='group-card'>
                <input
                  type="radio"
                  name="groupDescription"
                  value="Family of adults"
                  onChange={handleDescriptionChange}
                  checked={groupDescription === 'Family of adults'}
                  onKeyDown={handleKeyDown}
                />
                Family (adults)
              </label>
            </li>
            <li>
              <label className='group-card' onClick={handleCardClick}>
                <input
                  type="radio"
                  name="groupDescription"
                  value="Friends"
                  onChange={handleDescriptionChange}
                  checked={groupDescription === 'Friends'}
                  onKeyDown={handleKeyDown}
                />
                Friends
              </label>
            </li>
          </ul> */}
          <div className='trip-details-button-container'>
            <Link to='/form/page5'>
              <button className='m-4 trip-details-button' type='button'>Back</button>
            </Link>
            <button className='m-4 trip-details-button' type='submit' onClick={handleClick}>Submit</button>
          </div>
        </>  
      }</div>
    </div>
  );
};

export default Page6;