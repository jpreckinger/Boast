const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

//this route gets all the games of a certain category ID
router.get('/all/:id', rejectUnauthenticated, (req, res) => {
    const sqlText = `SELECT games.id, games.game_image as image_url,
                    games.game_name as name FROM games
                    JOIN users ON users.id = games.user_id
                    JOIN categories ON categories.id = games.category_id
                    WHERE games.user_id = $1 AND games.category_id = $2;`;
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

//this route checks to see if a category already exists
router.get('/check/:category', (req,res) => {
    const sqlText = `SELECT * FROM categories WHERE category_name = $1;`;
    const name = req.params.category;
    pool.query(sqlText, [name])
    .then((result) => {
        res.send(result.rows)
    })
    .catch(() => {
        res.sendStatus(500);
    })
});

//this route gets all existing categories
router.get('/list', (req,res) => {
    console.log('in category list');
    pool.query( `SELECT * FROM categories;`)
    .then((result) => {
        res.send(result.rows);
    })
    .catch(() => {
        res.sendStatus(500);
    })
})

//this adds new categories if they are not found in the GET above
router.post('/', (req, res) => {
    const sqlText = `INSERT INTO categories (category_name)
                    VALUES ($1);`;
    const category = req.body.data;
    pool.query(sqlText, [category])
    .then(() => {
        res.sendStatus(200);
    })
    .catch(() => {
        res.sendStatus(500);
    })
});

//this changes the category ID of a game
router.put('/', (req, res) => {
    const sqlText = `UPDATE games 
                    SET category_id = categories.id
                    FROM categories
                    WHERE games.id = $1 
                    AND categories.category_name = $2;`
    const category = req.body.category;
    const game = req.body.game;
    pool.query(sqlText, [game, category])
    .then(() => {
        res.sendStatus(200);
    })
    .catch(() => {
        res.sendStatus(500);
    })
})

module.exports = router;