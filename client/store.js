import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';
import tripReducer from './reducers/tripReducer';
import itineraryReducer from './reducers/itineraryReducer';

const rootReducer = combineReducers({
  user: userReducer,
  trip: tripReducer,
  itinerary: itineraryReducer,
});

export default function setupStore(preloadedState) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}