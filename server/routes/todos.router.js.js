const router = require('express').Router();
const pool = require('../modules/pool');

// GET ROUTE 
router.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "todos" ORDER BY "id";'
    pool.query(queryText)
    .then((dbResult) => {
        console.log('GET /todos', dbResult.rows)
        res.send(dbResult.rows)
    })
    .catch((dbError) => {
        console.log('error with getting todo:', dbError)
        res.sendStatus(500)
    })
});

// POST route to post new task

// PUT route

// Delete route


module.exports = router;
