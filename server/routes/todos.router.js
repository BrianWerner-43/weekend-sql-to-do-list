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
router.post('/', (req, res) => {
    
    console.log('In post route:', req.body);
    
    let queryText = 
    `INSERT INTO "todos"
    ("text")
    VALUES
    ($1)
    `
    const sqlValues = [
        req.body.taskToDo
    ]

    pool.query(queryText, sqlValues)
    .then((dbResult) => {
        res.sendStatus(201)
    })
    .catch((dbError) => {
        console.log('POST /todos query faild:', dbError)
    })
});

// PUT route
router.put('/:id', (req, res) => {
    let idToUpdate = req.params.id;

    queryText = `UPDATE "todos" SET "isComplete" = TRUE WHERE "id"=$1`;

    const sqlValues = [idToUpdate];

    pool.query(queryText, sqlValues)
    .then((dbResult) => {
        console.log('Task updated:');
        res.sendStatus(200);
    })
    .catch((dbError) => {
        console.log('PUT /todos:id failed:', dbError);
        res.sendStatus(500);
    })
    

})

// Delete route

router.delete('/:id', (req, res) => {
    let idOfTaskToDelete = req.params.id;
    const sqlText = 
    `DELETE FROM "todos"
       WHERE "id" = ($1);
    `

    const sqlValues = [idOfTaskToDelete]
    console.log(sqlValues);
    pool.query(sqlText, sqlValues)
    .then((dbResult) => {
        console.log('DELETE /todos :id deleted:')
        res.sendStatus(200);
    })
    .catch((dbError) => {
        console.log('DELETE /todos/:id failed:', dbError);
        res.sendStatus(500);
    })
})


module.exports = router;
