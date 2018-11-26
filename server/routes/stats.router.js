const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/all', (req, res) => {
    const sqlText = `SELECT SUM(victory::int) as wins, 
                    (COUNT(victory)) - (SUM(victory::int)) as losses 
                    FROM stats
                    WHERE user_id = $1;`;
    const user = req.user.id;
    pool.query(sqlText, [user]) 
    .then((result) => {
        res.send(result.rows)
    })  
    .catch(() => {
        res.sendStatus(500);
    })
});

router.get('/category/:id', (req,res) => {
    console.log(req.params.id);
    const sqlText = `SELECT SUM(victory::int) as wins, 
                    (COUNT(victory)) - (SUM(victory::int)) as losses 
                    FROM stats
                    JOIN instances ON instances.id = stats.instance_id
                    JOIN games ON instances.game_id = games.id
                    WHERE stats.user_id = $1 AND games.category_id = $2;`;
    const user = req.user.id;
    const category = req.params.id;
    pool.query(sqlText, [user, category])
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