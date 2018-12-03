const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//this gets stats for a game based on the incoming instance ID
router.get('/stats/:instance_id', (req,res) => {
    const sqlText = `SELECT instances.id, users.username, users.id, stats.score, stats.victory FROM stats
                    JOIN instances ON instances.id = stats.instance_id
                    JOIN users ON stats.user_id = users.id
                    WHERE instances.id = $1 ORDER BY users.id;`;
    pool.query(sqlText, [req.params.instance_id])
    .then((response) => {
        res.send(response.rows)
    })
    .catch(() => {
        res.sendStatus(500);
    })
    
});

//this gets notes for a game based on the incoming instance ID
router.get('/notes/:instance_id', (req,res) => {
    const sqlText = `SELECT notes, image, date_played
                    FROM instances WHERE id = $1;`;
    const id = req.params.instance_id;
    pool.query(sqlText, [id])
    .then((result) => {
        res.send(result.rows);
    })
    .catch(() => {
        res.sendStatus(500);
    })
})

//this gets the three most recent instances for a given game
router.get('/:id', (req,res) => {
    const sqlText = `SELECT id FROM instances
                    WHERE game_id = $1 ORDER BY id DESC LIMIT 3;`;
    const id = req.params.id;
    pool.query(sqlText, [id])
    .then((result) => {
        res.send(result.rows);
    })
    .catch(() => {
        res.sendStatus(500);
    })
});

module.exports = router;