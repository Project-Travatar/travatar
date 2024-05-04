import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateItinerary } from '../reducers/itineraryReducer';
import { updateActivities } from '../reducers/tripReducer';
import '../stylesheets/reroll.css';

const Reroll = (props) => {
    const dispatch = useDispatch();
    const formData = useSelector(state => state.trip);
    const itinerary = useSelector(state => state.itinerary.itinerary);

    const dropdownRef = useRef(null);
    const [ shouldShow, setShouldShow ] = useState(false);

    function rerollAct () {
        const newAct = dropdownRef.current.value;
        const body = {itineraryId: formData.id,
            destination: formData.destination,
            newActivity: newAct,
            timeOfDay: props.timeOfDay,
            date: props.date}

        // console.log('itineraryId:', formData.id);
        fetch('/api/trip/update', {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('userToken')}`
            },
            body: JSON.stringify(body)
        })
            .then(res => res.json())
            .then((json) => {
                console.log('json res:', json);
                let newItin = structuredClone(itinerary);
                console.log("new itin:", newItin);
                newItin[props.date][props.timeOfDay] = json[props.date][props.timeOfDay];
                dispatch(updateItinerary(newItin))
                setShouldShow(false);
            })
    }

    function updateShouldShow() {
        return setShouldShow(true)
    }
    if(shouldShow){
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
    else{
        return (
            <button className='updateActivitiesButton' type='button' onClick={updateShouldShow}>Get New Activity</button>
        )
    }
}

export default Reroll;