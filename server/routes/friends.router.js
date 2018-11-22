const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/requests', (req,res) => {
    const user = req.user.id;
    const sqlText = `SELECT users.username, users.id FROM friends 
                    JOIN users ON users.id = friends.user_id
                    WHERE connected_user_id=$1 AND connected = false;`;
    pool.query(sqlText, [user])
    .then((result) => {
        res.send(result.rows);
    })
    .catch((error) => {
        res.sendStatus(500);
    })
});

router.get('/:name', (req, res) => {
    const nameToSearch =  req.params.name ;
    const sqlText = `SELECT username, id FROM users
                    WHERE lower(users.username) SIMILAR TO ($1);`;
    pool.query(sqlText, [nameToSearch + '%'])
    .then((result) => {
        res.send(result.rows)
    })
    .catch((error) => {
        console.log('error live searching friends', error);
        res.sendStatus(500);
    })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
    const requestedFriend = req.body.data;
    const sqlText = `INSERT INTO friends (user_id, connected_user_id) VALUES ($1, $2);`;
    pool.query(sqlText, [req.user.id, requestedFriend])
    .then(() => {
        res.sendStatus(201);
    })
    .catch(()=> {
        res.sendStatus(500);
    })
});

router.put('/:id', (req,res) => {
    const friendId = req.params.id;
    const userId = req.user.id;
    const sqlText = `UPDATE friends SET connected = true
                    WHERE user_id = $1 AND connected_user_id = $2;`;
    pool.query(sqlText, [friendId, userId])
    .then(() => {
        res.sendStatus(200);
    })
    .catch(() => {
        res.sendStatus(500);
    })
});

router.delete('/:id', (req, res) => {
    const friendId = req.params.id;
    const userId = req.user.id;
    const sqlText = `DELETE FROM friends
                    WHERE user_id = $1 AND connected_user_id = $2;`;
    pool.query(sqlText, [friendId, userId])
    .then(() => {
        res.sendStatus(200);
    })
    .catch(() => {
        res.sendStatus(500);
    })
})

module.exports = router;