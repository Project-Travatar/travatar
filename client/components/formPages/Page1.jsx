import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState, useMemo} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { updateDestination } from '../../reducers/tripReducer';
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
import {
    APIProvider,
    Map,
    AdvancedMarker,
    Pin,
    InfoWindow
} from "@vis.gl/react-google-maps"
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption
} from '@reach/combobox';
import '@reach/combobox/styles.css';


const Page1 = () => {
  const envKey = import.meta.env.VITE_GPLACES_API_KEY;
  const libraries = ["places"];


  const navigate = useNavigate();
  const { destination } = useSelector(state => state.trip);
  const dispatch = useDispatch();

  const [autocomplete, setAutocomplete] = useState(null);
  const [ selected, setSelected] = useState(null);
  
    // const handleInputChange = e => {
    //   const { value } = e.target;
    //   dispatch(updateDestination(value));
    // }

    // const handleClick = () => {
    //   const value = document.getElementById('destInput').value
    //   console.log('value:', value)
      // dispatch(updateDestination(value));
    // }
  
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        handleClick();
        navigate('/form/page2');
      }
    };

    const PlacesAutocomplete = ({ setSelected })  => {
        const {
            ready,
            value,
            setValue,
            suggestions : { status, data },
            clearSuggestions,
        } = usePlacesAutocomplete();
        
        const handleSelect = async (dest) => {
          console.log('dest:', dest);
          setValue(dest, true);
          clearSuggestions();

          const results = await getGeocode({ address: dest });
          const { lat, lng } = await getLatLng(results[0]);
          console.log('lat:', lat, 'lng:', lng)
          setSelected({ lat, lng });
          dispatch(updateDestination(dest));
        }
        return (
            <Combobox onSelect={handleSelect}>
                <ComboboxInput
                    className='typed-input text-[#95a3c1] trip-details-input'
                    id="destInput"
                    type="text"
                    name="destination"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={!ready}
                    autoComplete="off"
                />
                <ComboboxPopover
                    style={{
                      backgroundColor: 'white',
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                      zIndex: '1000', // Ensure the dropdown appears above the map
                    }}
                >
                  <ComboboxList>
                    {status === "OK" &&
                      data.map(({place_id, description}) => (
                        <ComboboxOption key={place_id} value={description} />
                        ))}
                  </ComboboxList>
                </ComboboxPopover>
            </Combobox>
        )
    }

    function Places() {
        const { isLoaded } = useJsApiLoader({
            googleMapsApiKey: import.meta.env.VITE_GPLACES_API_KEY,
            libraries: libraries,
        });
    
        if (!isLoaded) return <div>Loading...</div>;
        return <MyMap />;
    }

    function MyMap() {
        const center = useMemo(() => selected || ({ lat: 36.17, lng: -115.13}), [selected]);

        const mapOptions = {
          streetViewControl: false,
          zoomControl: false,
          fullscreenControl: false,
          mapTypeControl: false,
        };
    
        return (
            <>
                <div className="places-container">
                    <PlacesAutocomplete setSelected={setSelected} />
                </div>

                <APIProvider apiKey={envKey}>
                    <div style= {{ width: '50vh', height: '50vh' }}>
                        <Map
                            zoom={9}
                            center={center}
                            mapId={import.meta.env.VITE_GMAPS_ID}
                            options={mapOptions}
                        >
                          {selected && <AdvancedMarker position={selected} />}
                        </Map>
                    </div>
                </APIProvider>
            </>
        )
    }

  return (
    <div className="form-page">
      <label className='text-2xl text-[#95a3c1]' htmlFor="destination">
        Destination:
      </label>
      <Places />
      <div>
        <Link to='/form/page2'>
          <button className='m-4 trip-details-button' type='button'>Next</button>
        </Link>
      </div>
    </div>
  )
};

export default Page1;