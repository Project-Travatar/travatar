const app = require('../../../../server/app');
const httpMocks = require('node-mocks-http');
const itinerary_controller = require('../../../../server/controllers/itinerary_controller');
const userController = require('../../../../server/controllers/userController');

describe('build iternerary middleware', () => {
  let request;
  let response;
  
  beforeEach(async () => {

    const tokenToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2Mjg0ZmFjM2Y0Y2M4YjcwOTJiZjdkNiIsImlhdCI6MTcxNDQzOTA1MCwiZXhwIjoxNzE3MDMxMDUwfQ.mIOMGQlvtJ_ymslf-Oi-gBk87Aby2bhWDP_SzSew6PU'

    const activities = ['Hiking', 'restaurants', 'danger'];
    const budget = 1000;
    const destination = 'Las Vegas, NV';
    const startDate = '2022-12-01';
    const endDate = '2022-12-02';
    const groupDescription = 'Family with young kids';
    const travelers = '3';

    request = httpMocks.createRequest({
      method: 'POST',
      url: '/api/trip/build',
      body: {
        activities: activities,
        budget: budget,
        destination: destination,
        startDate: startDate,
        endDate: endDate,
        groupDescription: groupDescription,
        travelers: travelers
      },
      headers: {
        authorization: `Bearer ${tokenToken}`
      }
    });
    response = httpMocks.createResponse();
  });

  it('should return an itinerary', async () => {
    const mockNext = jest.fn();
    console.log('mockNext', mockNext)
    await itinerary_controller.buildTrip(request, response, mockNext);
    // console.log('response.locals.itinerary:', response.locals.itinerary)
    const itineraryList = response.locals.itinerary.itinerary;
    const itineraryDates = Object.keys(itineraryList);
    expect(mockNext).toHaveBeenCalled();
    expect(response.locals.itinerary).toBeDefined();
    expect(itineraryDates[0]).toEqual(request.body.startDate);
    expect(itineraryDates[itineraryDates.length - 1]).toEqual(request.body.endDate);
  }, 50000);


});
