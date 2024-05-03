import { useSelector } from "react-redux";
import Itinerary from "./Itinerary"


const ItineraryPage = () => {
  const itinerary = useSelector(state => state.itinerary);
  return (
    <div id="itinerary-page">
      <h2 className='text-3xl font-bold mt-3'>Your Itinerary</h2>
      <Itinerary itinerary={itinerary} />
    </div>
  );
};

export default ItineraryPage;