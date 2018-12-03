const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

//this gets the current instance ID
router.get('/', rejectUnauthenticated, (req, res) => {
    const sqlText = `SELECT instances.id FROM instances
                    JOIN games ON games.id = instances.game_id
                    WHERE games.user_id = $1 
                    ORDER BY instances.id DESC LIMIT 1;`;
    const user = req.user.id;
    pool.query(sqlText, [user])
    .then((result) => {
        res.send(result.rows);
    })
    .catch(() => {
        console.log('error getting instance id');
    })
});

//this creates a new instance
router.post('/', rejectUnauthenticated, (req, res) => {
    const sqlText = `INSERT INTO instances (primary_user_id, game_id) VALUES ($1, $2)`;
    const game = req.body.id;
    pool.query(sqlText, [req.user.id, game])
    .then(() => {
        res.sendStatus(200);
    })
    .catch(() => {
        res.sendStatus(500);
    })
});

module.exports = router;