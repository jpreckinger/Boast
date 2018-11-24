const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
    console.log('stats req.body is ', req.body);
    const sqlText = `INSERT INTO stats (user_id, instance_id) VALUES ($1, $2);`;
    const instance = req.body.instance[0].id; 
    pool.query(sqlText, [req.body.players.id, instance])
    .then(() => {
        res.sendStatus(200);
    })
    .catch(() => {
        console.log('error adding user to stats');
    })
});

module.exports = router;