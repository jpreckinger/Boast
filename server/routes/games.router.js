const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

//this gets the game with the most recent instance created
router.get('/current', rejectUnauthenticated, (req, res) => {
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
        res.sendStatus(500);
    })
});

//this gets games based on an incoming string, for targetted search purposes
router.get('/search/:name', rejectUnauthenticated, (req,res) => {
    const sqlText = `SELECT * FROM games
                    WHERE user_id = $1 AND lower(game_name) SIMILAR TO ($2) LIMIT 5;`;
    const gameToSearch = req.params.name;
    const user = req.user.id;
    pool.query(sqlText, [user, gameToSearch + '%'])
    .then((result) => {
        res.send(result.rows);
    })
    .catch(() => {
        res.sendStatus(500);
    })
});

//this gets a game's information to set as the current game to display
router.get('/:name', rejectUnauthenticated, (req, res) => {
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

//this adds a new game into the DB from being selected after the API search
router.post('/', rejectUnauthenticated, (req, res) => {
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