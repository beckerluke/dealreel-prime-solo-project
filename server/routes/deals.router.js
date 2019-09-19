const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
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
      console.log('error getting books', error);
      res.sendStatus(500);
    });
  });

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;