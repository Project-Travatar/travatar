import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { updateItinerary } from "../reducers/itineraryReducer";
import { Link, useNavigate } from 'react-router-dom';

const Manager = () => {
  const [ itineraries, setItineraries ] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user)
  
  // Function to get cookie value by name
  const getCookie = (name) => {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      const [cookieName, cookieValue] = cookie.trim().split('=');
      if (cookieName === name) {
        return decodeURIComponent(cookieValue);
      }
    }
    return null;
  };

  // Retrieve all itineraries associated with the user and update state
  useEffect(() => {
    const fetchData = async () => {
      try {
        const authToken = getCookie('authToken');
        const token = authToken ? authToken : localStorage.getItem('userToken');  
        const response = await fetch('api/trip/retrieve', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user }),
          });
          const itineraryList = await response.json();
          setItineraries(itineraryList);
        } catch (error) {
        console.error('Error with request:', error);
      }
    };
    fetchData();
  }, [user]);

  const deleteItinerary = async (e) => {
    const tripId = e.target.parentNode.parentNode.id;
    try {
      let remainingTrips = await fetch('api/trip/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
        },
        body: JSON.stringify({ tripId: tripId, user: user }),
      });

      remainingTrips = await remainingTrips.json();

      setItineraries(remainingTrips);

    } catch (err) {
      console.error('Error with request:', error);
    }
    
  }

  const seeDetails = async (e) => {
    const tripId = e.target.parentNode.parentNode.id;

    try {
      const authToken = getCookie('authToken');
      const token = authToken ? authToken : localStorage.getItem('userToken');  
      const response = await fetch('api/trip/retrieve', {
        method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ tripId: tripId, user: user }),
          });
      console.log(response);
      const itineraryList = await response.json();

      // console.log(itineraryList);

      let foundTrip;
      for (const trip of itineraryList) {
        // console.log(trip);
        // console.log("Parse ID:", trip.tripId, "| Target ID:", tripId)
        if (trip._id === tripId) {
          foundTrip = JSON.parse(trip.trip);
          break;
        }
      }
      console.log("See Details of:", foundTrip);
      if (foundTrip) {
        dispatch(updateItinerary(foundTrip.itinerary));
        navigate('/itinerary');
      }
      
    } catch (error) {
      console.error('Error with request:', error);
    }
  };

  const itineraryList = [...itineraries];
  
  console.log(itineraryList);

  const renderList = itineraryList.map((itinerary) => {

      return <div className='trip-tile' key={itinerary._id} id={itinerary._id}>
        <h3>{itinerary.destination}</h3>
        <p>From: <b>{itinerary.startDate}</b></p>
        <p>To: <b>{itinerary.endDate}</b></p>
        <p>Created on: <b>{new Date(itinerary.createdAt).toLocaleString()}</b></p>

      <div className="tile-buttons"><button onClick={ seeDetails }>See Details</button><button onClick={ deleteItinerary }>Delete</button></div>
    </div>})

  // state: { itinerary: { itinerary: itinerary.trip }}
  // to={{ pathname: '/other', state: dataToPass }}
  

  return (<div>
    <h2>Welcome {user.firstName}</h2>
    {renderList.length !==0 ?
    <> 
      <h2>Your trips:</h2>
      <div id='itinerary-grid'>{renderList}</div>
    </>
    : <><br/> <p>Plan your first trip, what are you waiting for?!</p></>}
  </div>)
}

export default Manager;