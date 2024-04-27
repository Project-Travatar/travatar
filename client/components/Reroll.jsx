import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateItinerary } from '../reducers/itineraryReducer';
import { updateActivities } from '../reducers/tripReducer';

const Reroll = (props) => {
    const dispatch = useDispatch();
    const dropdownRef = useRef(null);
    const formData = useSelector(state => state.trip);
    const itinerary = useSelector(state => state.itinerary);
    const activities = useSelector(state => state.activities);
    // console.log('trip:', formData);
    // console.log('itinerary:', itinerary);
//call the parameter sent in the request body itineraryId

    function rerollAct () {
        const newAct = dropdownRef.current.value;
        // console.log('formData:', formData, 'destination:', formData.destination);
        // console.log()
        // console.log('new activity:', newAct, 'in the', props.timeOfDay, 'on the date', props.date);
        fetch('/api/trip/update', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
                'body': {
                    itineraryId: formData.id,
                    destination: formData.destination,
                    newActivity: newAct,
                    timeOfDay: props.timeOfDay,
                    date: props.date
                }
              }
        })
            .then(res => res.json())
            .then((json) => {
                // dispatch(updateItinerary({
                    // ...itinerary,
                    // itinerary[props.date] = json
                // }))
                console.log('server res:', json);
            })
    }
    return (
        <div className='rerollActivities'>
            <select name="Activities" className="activityDropdown" ref={dropdownRef}>
                <option value="Food">Food</option>
                <option value="Bars">Bars</option>
                <option value="Museums">Museums</option>
                <option value="Culture">Culture</option>
                <option value="Events">Events</option>
            </select>
            <button className='rerollButton' type="button" onClick={rerollAct}>⟳</button>
        </div>
    )
}

export default Reroll;