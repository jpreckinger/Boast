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
    console.log('instance req.body is ', req.body);
    const sqlText = `INSERT INTO instances (game_id) VALUES ($1)`;
    const game = req.body.data;
    pool.query(sqlText, [game])
    .then(() => {
        res.sendStatus(200);
    })
    .catch(() => {
        res.sendStatus(500);
    })
});

module.exports = router;