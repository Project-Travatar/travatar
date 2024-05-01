import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { updateItinerary } from "../reducers/itineraryReducer";
import { Link, useNavigate } from 'react-router-dom';

const Manager = () => {
  const [itineraries, setItineraries] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Retrieve all itineraries associated with the user and update state
  useEffect(() => {
    try {
      const getItineraryList = async () => {
        let itineraryList = await fetch('api/trip/retrieve', {
          method: 'GET',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
            },
        });
  
        itineraryList = await itineraryList.json();
  
        console.log(itineraryList);
        setItineraries(itineraryList);
  
      }
      getItineraryList();   
    } catch (error) {
      console.error('Error with request:', error);
    }
    
  }, []);

  const deleteItinerary = async (e) => {
    const tripId = e.target.parentNode.parentNode.id;
    try {
      let remainingTrips = await fetch('api/trip/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
        },
        body: JSON.stringify({ tripId: tripId }),
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
      let itineraryList = await fetch('api/trip/retrieve', {
        method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
          },
      });

      itineraryList = await itineraryList.json();

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
  const renderList = itineraryList.map((itinerary) => {
    console.log('manager itin:', itinerary);
    return (<div className='trip-tile' key={itinerary._id} id={itinerary._id}>
      <h3><b>{itinerary.title}</b></h3>
      <h3>{itinerary.destination}</h3>
      <p>From: <b>{itinerary.startDate}</b></p>
      <p>To: <b>{itinerary.endDate}</b></p>
      <p>Created on: <b>{new Date(itinerary.createdAt).toLocaleString()}</b></p>
      <div className="tile-buttons"><button onClick={ seeDetails }>See Details</button><button onClick={ deleteItinerary }>Delete</button></div>
    </div>)
  })
  // state: { itinerary: { itinerary: itinerary.trip }}
  // to={{ pathname: '/other', state: dataToPass }}
  

  return (<div>
    <h2>Itinerary Manager</h2>
    <div id='itinerary-grid'>{renderList}</div>
  </div>)
}

export default Manager;