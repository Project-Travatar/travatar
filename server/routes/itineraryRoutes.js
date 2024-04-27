const express = require('express');
const router = express.Router();
const tripController = require('../controllers/itinerary_controller');
const authController = require('../controllers/auth_controller');

router.post('/build', (req, res, next)=>{
  console.log("build route invoked");
  return next();
},authController.protect, tripController.buildTrip, tripController.saveTrip, (req, res) => {
  res.status(201).send(res.locals.itinerary);
});

router.post('/retrieve', authController.protect, tripController.retrieveUserItineraries, (req, res) => {
  // console.log(res.locals.allTrips[0]._id);
  res.status(200).json(res.locals.allTrips);
});

router.delete('/delete', authController.protect, tripController.deleteTrip, tripController.retrieveUserItineraries, (req, res) => {
  res.status(200).send(res.locals.allTrips);
})

module.exports = router;