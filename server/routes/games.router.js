const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/:name', (req, res) => {
    const sqlText = `SELECT game_name, game_image, id FROM games
                    WHERE user_id=$1 AND game_name=$2;`;
    pool.query(sqlText, [req.user.id, req.params.name])
    .then((response) => {
        res.send(response.rows);
    })
    .catch(() => {
        res.sendStatus(500);
    })
});


router.post('/', (req, res) => {
    let newGame = req.body.data;
    const sqlText = `INSERT INTO games (user_id, game_name, game_image) VALUES($1, $2, $3);`;
    pool.query(sqlText, [req.user.id, newGame.name, newGame.image_url])
    .then(() => {
        res.sendStatus(200);
    })
    .catch(() => {
        res.sendStatus(500);
    })
});

module.exports = router;