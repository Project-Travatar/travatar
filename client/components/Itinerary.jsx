import Reroll from './Reroll.jsx';
import { createClient } from 'pexels';

const Itinerary = ({ itinerary }) => {
  // console.log('jsx itin:', itinerary);
  document.backgroundDiv = 0;
  const client = createClient('PEgQiisiCDMXUtU68bsOrQ6YvizFI0M1uhqWesivRNHbIOxdqtlEIRX2');
  console.log('itinirary: ', JSON.stringify(itinerary));
  let div = 0;
  Object.entries(itinerary.itinerary).map(([date, timesOfDay]) => {
    Object.entries(timesOfDay).map(([timeOfDay, suggestion]) => {
      let query = suggestion.address;
      client.photos.search({ query, per_page: 1 }).then(photos => {
      client.photos.show({ id: photos.photos[Math.floor(Math.random() * photos.photos.length)].id}).then(photo => {
      let picture = document.querySelector('#img'+ ++div) //.src = photo.src.original;
      picture.src  = photo.src.original;
        });
      })
    });
  });

  if (itinerary) return (
    <div id='itinerary-details'>
      {Object.entries(itinerary.itinerary).map(([date, timesOfDay]) => (
        <div className="day-entry" key={date}>
          <h2 className='date'>{date}</h2>
          <div className="day-details">
            {Object.entries(timesOfDay).map(([timeOfDay, suggestion]) => (
              <div className='activity-details' key={timeOfDay}>
                <div className='activity-header'>
                  <h3 className="time-of-day">{timeOfDay}</h3>
                  <Reroll timeOfDay={timeOfDay} date={date} itinerary={itinerary.itinerary} />
                </div>
                <div className='activity'>
                <p><span className='underline'>Activity</span>: {suggestion.activity}</p>
                </div>
                <div className='description'>
                <p><span className='underline'>Description</span>: {suggestion.description}</p>
                </div>
                <div className='address'>
                <p><span className='underline'>Address</span>: {suggestion.address}</p>
                </div>
                <img id={'img' + ++document.backgroundDiv} src='' alt='' width='100%'></img>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Itinerary;
