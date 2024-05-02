import { createSlice } from '@reduxjs/toolkit';

let startDate = new Date(Date.now());
let endDate = new Date(Date.now());
endDate.setDate(startDate.getDate() + 3);

const initialState = {
  destination: 'Las Vegas, NV',
  startDate: startDate.toISOString().slice(0, 10),
  endDate: endDate.toISOString().slice(0, 10),
  activities: [],
  budget: 500,
  travelers: 1,
  groupDescription: 'Solo Traveler',
  id: '1111111111111'
};

const tripSlice = createSlice({
  name: 'trip',
  initialState,
  reducers: {
    updateDestination(state, action) {
      state.destination = action.payload;
    },
    updateStartDate(state, action) {
      state.startDate = action.payload;
    },
    updateEndDate(state, action) {
      state.endDate = action.payload;
    },
    updateActivities(state, action) {
      state.activities = action.payload;
    },
    updateBudget(state, action) {
      state.budget = action.payload;
    },
    updateTravelers(state, action) {
      state.travelers = action.payload;
    },
    updateGroupDescription(state, action) {
      state.groupDescription = action.payload;
    },
    updateId(state, action) {
      state.id = action.payload;
    }
  },
});

export const { actions, reducer } = tripSlice;
export const { updateDestination, updateStartDate, updateEndDate, updateActivities, updateBudget, updateTravelers, updateGroupDescription, updateId } = actions;
export default reducer;