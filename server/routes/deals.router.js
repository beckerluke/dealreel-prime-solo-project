const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const moment = require('moment');
const axios = require('axios');

/**
 * GET all active deals from database
 */
router.get('/', (req, res) => {

    let queryText = `SELECT * FROM "deals" 
                    JOIN "user" ON "user".id = "deals"."user_id"
                    WHERE "start_time" <= $1 
                    AND "end_time" >= $1
                    AND "end_time" <= $2
                    ORDER BY "user"."id", "end_time" DESC;`;

    const currentDateTime = moment().format();
    const cutOffDate = moment().add(8, 'hours');

    // Retrieve all deals from DB where end time is greater than the 
    // current date time and less than current date time plus 8 hours
    pool.query(queryText,[currentDateTime, cutOffDate]).then(result => {
      // Sends back business and deals results in an object
      
      // all active deals retrieved from database
      const activeDeals = result.rows;

      // user coordinates passed
      const userLatitude = req.query.lat;
      const userLongitude = req.query.lng;

      // string to send to GOOGLE DISTANCE MATRIX API
      let googleQuery = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${userLatitude},${userLongitude}&key=${process.env.GOOGLE_API}&destinations=`
      
      // loop through all active deals and add each one's address as 
      // destinations for Google API query
      activeDeals.forEach((deal, index) => {
        googleQuery += deal.address;
        if (index !== (activeDeals.length - 1)) {
            googleQuery += `|`
        }
      });

      // send axios request to GOOGLE DISTANCE MATRIX API
      axios.get(googleQuery).then((response) => {
        
        // Response from Google: the user's origin location
        const originLocation = response.data.rows[0];
        
        // all of the active deals locations
        const destinations = originLocation.elements;

        // mapping over all active deals and adding distance data from 
        // Google Distance Matrix to each dealItem to capture deal's 
        // distance from user
        const dealsWithDistance = activeDeals.map((deal, index) => {
            const distance = destinations[index].distance;
            return {
                ...deal,
                distance,
            };
        })

        // send back new array holding distance data from Google to 
        // deals saga
        res.send(dealsWithDistance);
      }).catch(error => {
          console.log('ERR0R getting from Google: ', error )
      });
    })
    .catch(error => {
      console.log('error getting deals', error);
      res.sendStatus(500);
    });
  }); // end of GET to retrieve all active deals within user's location

/**
 * GET deals for each individual business
 */
router.get('/admin', (req, res) => {  
    // to ensure business is authenticated before fetching their 
    // specific deals list
    if (req.isAuthenticated()) {   
        // check to ensure user has authorization
        if (req.user.sec_level > 1 ) {

            let queryText = `SELECT * FROM "deals" 
                            JOIN "user" ON "user".id = "deals"."user_id"
                            WHERE "user".id = $1
                            ORDER BY "user"."id", "end_time" DESC;`;
            
            const dealID = req.user.id; 

            pool.query(queryText, [dealID]).then(result => {
                // Sends back the results in an object
                res.send(result.rows);
            })
            .catch(error => {
                console.log('error getting deals', error);
                res.sendStatus(500);
            });
        } else {
            res.send('Authorization problem')
        } // end if for user authorization check
    } else {
        res.sendStatus(500);
    } // end if for authentication check
}); // end GET for specific business fetching their deals

/**
 * POST route so businesses can add a deal that broadcasts on main page
 */
router.post('/admin/add/deal', (req, res) => {
    const newDeal = req.body;
    const dealID = req.user.id
   
    if (req.isAuthenticated()) {
        if (req.user.sec_level > 1) {
    
            const queryText = `INSERT INTO "deals" ("start_time", "end_time", 
                            "description", "user_id", "redemptions_limit", "image_file_selected")
                            VALUES ($1, $2, $3, $4, $5, $6);`;
            const queryValues = [
                newDeal.startTime,
                newDeal.endTime,
                newDeal.description,
                dealID,
                parseInt(newDeal.redemptionsLimit),
                newDeal.imageFileSelected
            ];
            pool.query(queryText, queryValues)
                .then(() => { res.sendStatus(201); })
                .catch((err) => {
                console.log('ERROR POSTING DEAL TO DB', err);
                res.sendStatus(500);
                });
        } else {
            res.send('Authorization problem')
        } // end if authorization check
    } else {
        res.sendStatus(500);
    } // end authentication check
}); // end POST to allow business to add a deal

module.exports = router;