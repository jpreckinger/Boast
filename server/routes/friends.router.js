const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/:name', (req, res) => {
    console.log(req.user.id);
    const nameToSearch =  req.params.name ;
    console.log( nameToSearch );
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

});

module.exports = router;