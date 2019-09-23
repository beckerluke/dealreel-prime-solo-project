const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET all deals from database
 */
router.get('/', (req, res) => {
    let queryText = `SELECT * FROM "deals" 
                    JOIN "user" ON "user".id = "deals"."user_id"
                    ORDER BY "end_time";`;
    pool.query(queryText).then(result => {
      // Sends back the results in an object
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
                            WHERE "user".id = $1;`;
            

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
}); // end end GET for specific business fetching their deals

/**
 * POST route template
 */
router.post('/admin/add/deal', (req, res) => {
    const newDeal = req.body;
    const dealID = req.user.id
    console.log(newDeal);
    console.log(dealID)
    
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
});

module.exports = router;