const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const moment = require('moment');

// used to get nearby locations of user from Google Places API search
const GoogleLocations = require('google-locations');
const locations = new GoogleLocations(process.env.GOOGLE_API);


/**
 * GET all deals from database
 */
router.get('/', (req, res) => {

    // locations.search({
    //     radius: 50000, 
    //     keyword: 'Harpos Bar and Grill',
    //     location: [39.0985854, -94.5783239]
    // }, function(err,response) {
    //     console.log("search: ", response.results)
    // });

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
      console.log('DB LOG: ', result.rows);
      // returns all businesses with deals going on now and stores in array
      const businessesArray = result.rows.map((dealItem, index) => {
          return (
            dealItem.business_name
          );
      });
      console.log('BUSINESSES ARRAY ', businessesArray);
      // locations.search({
    //     radius: 50000, 
    //     keyword: 'Harpos Bar and Grill',
    //     location: [39.0985854, -94.5783239]
    // }, function(err,response) {
    //     console.log("search: ", response.results)
    // });

      res.send(result.rows);
    })
    .catch(error => {
      console.log('error getting deals', error);
      res.sendStatus(500);
    });
  });

/**
 * GET deals for each individual business
 */
router.get('/admin', (req, res) => {
    console.log('/api/deals/admin');    
    // to ensure business is authenticated before fetching their 
    // specific deals list
    if (req.isAuthenticated()) {
        console.log('SEC LEVEL: ', req.user.sec_level);
       
        // check to ensure user has authorization
        if (req.user.sec_level > 1 ) {

            let queryText = `SELECT * FROM "deals" 
                            JOIN "user" ON "user".id = "deals"."user_id"
                            WHERE "user".id = $1
                            ORDER BY "user"."id", "end_time" DESC;`;
            
            const dealID = req.user.id; 
            console.log('USER ID:', req.user.id);

            pool.query(queryText, [dealID]).then(result => {
                // Sends back the results in an object
                console.log('SUCCESS!!!!: ', result.rows)
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