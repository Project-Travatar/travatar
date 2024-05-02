//Controller to call the Open AI API for information on destinations for the itinerary
// import { Configuration, OpenAI } from "openai";
const OpenAI = require('openai');
const express = require('express');
const app = express();
const Itinerary = require('../models/Itinerary');
const { recompileSchema } = require('../models/User');

const openai = new OpenAI({ apiKey: process.env.OPEN_AI_API_KEY });

// TEST DATA - DELETE WHEN FINISHEDßß
// const travelPlans = {
//   destination: 'Los Angeles, CA',
//   startDate: 'June 2, 2024',
//   endDate: 'June 8, 2024',
//   activities: [],
//   budget: 500,
//   travelers: 1,
//   groupDescription: 'Solo traveler',
//   loading: false,
//   error: null,
// }
// ========= end of TEST DATA ============

const tripController = {
  // buildTrip - To fetch itinerary from API request to Open AI
  async buildTrip(req, res, next) {
    // console.log("buildTrip invoked");
    const { destination, startDate, endDate, activities, budget, travelers, groupDescription } = req.body;
    res.locals.tripName = `${destination} from ${startDate} to ${endDate}`;
    // Update prompt below to reflect req.body information - DONE (J.H.)
    const prompt = `Make an itinerary for a trip for ${travelers} to ${destination} from ${startDate} until ${endDate}. I have a budget of ${budget}. Include the following types of attractions: ${activities.join(', ')} for a ${groupDescription}. Organize the itinerary by the following times of day: Morning, Afternoon, and Evening. Recommend specific places of interest with their address. Limit cross-city commutes by grouping places of interest by geography for each day. The 'title' property should contain a descriptive title specific to this itinerary, which should be unique even with the same search criteria (nothing vague like "solo traveler in vegas" or "romatic getaway in boston"). Output the response in json format following this schema:
    // {
    //   title: string,  
    //   itinerary: {
    //     date: {
    //       time of day: {
    //         activity: string,
    //         description: string,
    //         address: string,
    //       }
    //     }
    //   }
    // }
    // Thank you.`;

    // console.log(prompt);
    try {
      const completion = await openai.chat.completions.create({
        messages: [{"role": "system", "content": "You are a helpful travel planning assistant."},
            {
              "role": "user", 
              "content": prompt,
            }],
        model: "gpt-3.5-turbo",
        response_format: { type: "json_object" },
      });
      
      // console.log('open itin:', completion.choices[0]);
      const itin = JSON.parse(completion.choices[0].message.content)
      res.locals.itinerary = itin;
      res.locals.title = itin.title; 
      
      return next();
    } catch (err) {
      console.log(err);
    }
  },

  // saveTrip - To save the contents of the generated itinerary into the database
  saveTrip(req, res, next) {
    // const { email } = req.body;
    console.log('itinerary created!!!')
    Itinerary.create({
      // email: req.body.email,
      title: res.locals.title,
      user: req.user._id,
      tripName: res.locals.tripName,
      destination: req.body.destination,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      trip: JSON.stringify(res.locals.itinerary),
    })
      .then (result => {
        console.log("itinerary successfully saved in database");
        res.locals.itinerary = result;
        // console.log('itinerary cont result:', res.locals.itinerary);
        return next();
      })
      .catch (err => {
        console.log("could not add itinerary to database - saveTrip middleware");
        console.error("saveTrip ERROR =>", err);
      })
  },
  /*
  saveTrip(req, res, next) {
    // const { email } = req.body;
    Itinerary.create({
      // email: req.body.email,
      user: req.user._id,
      tripName: res.locals.tripName,
      destination: req.body.destination,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      trip: JSON.stringify(res.locals.itinerary),
    })
    .then (savedItinerary => {
        console.log("itinerary successfully saved in database");
        //return the whole document that was created to the front end
        res.locals.itinerary = savedItinerary;
        return next();
      })
      .catch (err => {
        console.log("could not add itinerary to database - saveTrip middleware");
        console.error("saveTrip ERROR =>", err);
      })
  },
  */
  async updateTripActivities(req, res, next) {
    console.log("updateTripActivities invoked");
    const { newActivity, timeOfDay, date, itineraryId, destination } = req.body;
    
    // Update prompt below to reflect req.body information - DONE (J.H.)
    const prompt = `Recommend a place of interest for ${newActivity} at ${timeOfDay} on the ${date} located in ${destination}. Output the response in json format following this schema:
    // {
    //  date: {
    //    time of day: {
    //      activity: string,
    //      description: string,
    //      address: string,
    //     }
    //   }
    // }`;

    // console.log(prompt);
    try {
      const completion = await openai.chat.completions.create({
        messages: [{"role": "system", "content": "You are a helpful travel planning assistant."},
            {
              "role": "user", 
              "content": prompt,
            }],
        model: "gpt-3.5-turbo",
        response_format: { type: "json_object" },
      });
      
      console.log(completion.choices[0]);
      res.locals.updatedActivity = JSON.parse(completion.choices[0].message.content);

      //console.log('AI response for updating an activity: ', res.locals.updatedActivity)
      return next();
    } catch (err) {
      console.log(err);
    }
  },
  /*
  updateTrip(req, res, next) {
    //const itineraryId = req.body.itineraryId;
    const {tripName, destination, startDate, endDate, trip, user} = req.body;
    Itinerary.findOneAndUpdate({user:user},{
      tripName, destination, startDate, endDate, trip
    })
    .then(result => {
      console.log('result after updating itinerary: ', result);
      return next();
    })
    .catch(err => {
      console.log('error occured while trying to update itinerary.');
      res.status(500).json({message: 'error updating itinerary.'})
    })
  },
  */

  async updateTrip(req, res, next) {
    const itineraryId = req.body.itineraryId;
    const { date, timeOfDay} = req.body;
    //-----------------------------------------------------------------------

    Itinerary.find({_id:itineraryId})
    .then(itin => {
      console.log('itin:', itin);
      const tripParsed = JSON.parse(itin[0].trip);
      // console.log('not updated trip object: ', JSON.stringify(tripParsed));
      //console.log('updatedTripActivity: ',updatedTripActivity);
      tripParsed['itinerary'][date][timeOfDay] = res.locals.updatedActivity[date][timeOfDay];

      Itinerary.findOneAndUpdate({_id:itineraryId},{
        trip: JSON.stringify(tripParsed)
      })
      .then(result => {
        Itinerary.find({_id:itineraryId})
        .then(data => console.log('Itinerary after update: ', data))
        .catch(err => console.log('err: ', err));
        //console.log('trip object: ', JSON.parse(result.trip));
        return next();
        
      })
      .catch(err => {
        console.log('error occured while trying to update itinerary.');
        
      })


    })
    .catch(err => console.log('err: ', err));


    //---------------------------------------------------


    
  },
  // deleteTrip - To delete the itinerary from the database based on the ObjectId
  deleteTrip(req, res, next) {
    console.log(req.body);
    console.log("deleteTrip Middleware - tripId:", req.body.tripId);
    Itinerary.findOneAndDelete({ "_id" : `${req.body.tripId}` })
      .then( result => {
        if(result) {
          console.log("Itinerary deleted from the database - deleteTrip");
        } else {
          console.log("ObjectId not found. Nothing deleted");
        }
        return next();
      })
      .catch (err => {
        console.log("could not locate itinerary based on id passed in - deleteTrip middleware");
        console.error("deleteTrip ERROR =>", err);
      })
  },

  // retrieveAll - To retrieve all trips saved for a specific user
  retrieveAll(req, res, next) {
    Itinerary.find({
      "email": req.body.email,
    })
      .then (result => {
        // console.log(result);
        res.locals.allTrips = result;
        // console.log("All trips retrieved - retrieveAllTrips middleware");
        return next();
      })
      .catch (err => {
        console.log("could not retrieve all trips - retrieveAllTrips middleware");
        console.error("retrieveAllTrips ERROR =>", err);
      })
  },
}

module.exports = tripController;