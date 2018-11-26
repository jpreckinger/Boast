const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/all/:id', (req, res) => {
    console.log('in cat router /all/', req.params.id);
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

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;