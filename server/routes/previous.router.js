const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/stats/:instance_id', (req,res) => {
    const sqlText = `SELECT instances.id, users.username, stats.score, stats.victory FROM stats
                    JOIN instances ON instances.id = stats.instance_id
                    JOIN users ON stats.user_id = users.id
                    WHERE instances.id = $1;`;
    pool.query(sqlText, [req.params.instance_id])
    .then((response) => {
        res.send(response.rows)
    })
    .catch(() => {
        res.sendStatus(500);
    })
    
});

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