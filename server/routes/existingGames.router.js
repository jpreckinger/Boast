const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/:id', (req, res) => {
    console.log(req.params.id);
    const sqlText = `SELECT * FROM games
                    WHERE id = $1;`;
    const id = req.params.id;
    pool.query(sqlText, [id])
    .then((result) => {
        res.send(result.rows);
    })
    .catch(() => {
        res.sendStatus(500);
    })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;