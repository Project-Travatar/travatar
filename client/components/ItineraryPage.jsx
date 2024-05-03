import { useSelector } from "react-redux";
import Itinerary from "./Itinerary"


const ItineraryPage = () => {
  const itinerary = useSelector(state => state.itinerary);
  return (
    <div id="itinerary-page">
      <h2>Your Itinerary</h2>
      <Itinerary itinerary={itinerary} />
    </div>
  );
};

export default ItineraryPage;