const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */

router.get('/current', (req, res) => {
    const sqlText = `SELECT games.game_name, games.game_image, games.id,
                    instances.id as instance FROM games
                    JOIN instances ON instances.game_id = games.id
                    JOIN users ON users.id = instances.primary_user_id
                    WHERE users.id=$1 ORDER BY instances.id DESC LIMIT 1;`;
    pool.query(sqlText, [req.user.id])
    .then((result) => {
        res.send(result.rows)
    })
    .catch(() => {
        console.log('error getting current game');
    })
})

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