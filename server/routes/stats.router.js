const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


/**
 * GET route template
 */
router.get('/all', rejectUnauthenticated, (req, res) => {
    const sqlText = `SELECT users.username, SUM(stats.victory::int) as wins
                    FROM stats
                    JOIN users ON users.id = stats.user_id
                    WHERE stats.instance_id IN (
                    SELECT stats.instance_id FROM stats WHERE stats.user_id = $1)
                    GROUP BY users.username;`;
    const user = req.user.id;
    pool.query(sqlText, [user]) 
    .then((result) => {
        res.send(result.rows)
    })  
    .catch(() => {
        res.sendStatus(500);
    })
});

router.get('/category/:id', rejectUnauthenticated, (req,res) => {
    console.log(req.params.id);
    const sqlText = `SELECT users.username, SUM(stats.victory::int) as wins
                    FROM stats JOIN users ON users.id = stats.user_id
                    WHERE stats.instance_id 
                    IN ( SELECT stats.instance_id FROM stats
                    JOIN instances ON instances.id = stats.instance_id
                    JOIN games ON games.id = instances.game_id
                    WHERE games.category_id = $1 AND stats.user_id = $2) 
                    GROUP BY users.username;`;
    const user = req.user.id;
    const category = req.params.id;
    pool.query(sqlText, [category, user])
    .then((result) => {
        res.send(result.rows);
    })
    .catch(() => {
        res.sendStatus(500);
    })
});

router.get('/game/:id', rejectUnauthenticated, (req,res) => {
    console.log('in stats game');
    const sqlText = `SELECT users.username, users.id, SUM(stats.victory::int) as wins
                    FROM stats JOIN users ON users.id = stats.user_id
                    WHERE stats.instance_id 
                    IN ( SELECT stats.instance_id FROM stats
                    JOIN instances ON instances.id = stats.instance_id
                    JOIN games ON games.id = instances.game_id
                    WHERE games.id = $1 AND stats.user_id = $2) 
                    GROUP BY users.username, users.id ORDER BY users.id;`;
    const game = req.params.id;
    const user = req.user.id;
    pool.query(sqlText, [ game, user])
    .then((result) => {
        res.send(result.rows);
    })
    .catch(() => {
        res.sendStatus(500);
    })
})

/**
 * POST route template
 */
router.post('/', (req, res) => {
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

router.put('/:id', (req,res) => {
    const sqlText = `UPDATE stats SET (score, victory) = ($1, $2)
                    WHERE instance_id = $3 AND user_id = $4;`;
    const instance_id = req.params.id;
    const user = req.body;
    pool.query(sqlText, [user.score, user.winner, instance_id, user.user.id])
    .then(() => {
        res.sendStatus(200);
    })
    .catch(()=> {
        res.sendStatus(500);
    })
})

module.exports = router;