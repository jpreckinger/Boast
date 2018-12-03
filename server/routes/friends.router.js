const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

//this gets friend requests for a specific user
router.get('/requests', rejectUnauthenticated, (req,res) => {
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

//this gets a user from the friends list based on closeness of the incoming string
//to the friends username
router.get('/instance/:name', rejectUnauthenticated, (req,res) => {
    const nameToSearch =  req.params.name ;
    const sqlText = `SELECT users.username, users.id FROM users 
                    JOIN friends ON friends.connected_user_id = users.id
                    WHERE friends.user_id = ($1) AND lower(users.username) SIMILAR TO ($2)`;
    pool.query(sqlText, [req.user.id, nameToSearch + '%'])
    .then((result) => {
        res.send(result.rows)
    })
    .catch((error) => {
        console.log('error live searching friends', error);
        res.sendStatus(500);
    })
});

//this gets a user based on the incoming string
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

//this adds a friend request into the DB
router.post('/', rejectUnauthenticated, (req, res) => {
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

//this adds a friend request into the DB, the route above is possibly
//an artifact, needs testing
router.post('/requests', rejectUnauthenticated, (req, res) => {
    console.log('in friend add post');
    const requestedFriend = req.body.data;
    const sqlText = `INSERT INTO friends (user_id, connected_user_id, connected) VALUES ($1, $2, true);`;
    pool.query(sqlText, [req.user.id, requestedFriend])
    .then(() => {
        res.sendStatus(201);
    })
    .catch(()=> {
        res.sendStatus(500);
    })
});

//this confirms an accepted request
router.put('/:id', rejectUnauthenticated, (req,res) => {
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

//this deletes a rejected request
router.delete('/:id', rejectUnauthenticated, (req, res) => {
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
});

module.exports = router;