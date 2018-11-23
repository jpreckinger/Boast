const express = require('express');
const bgg = require('bgg-axios');
const router = express.Router();


router.post('/', (req,res) => {
    let query = '';
    let newGame = [];
    const incomingGame = req.body.data;
    bgg.search(incomingGame)
    .then( (result) => {
        result.items.map( game => (
            query += `${game.objectid},`
        ))
        bgg.apiRequest('thing',{ id: query})
        .then(function (returnImage) {
            
                returnImage.items.item.map( (gameData, i) => (
                    newGame = [...newGame, { ...result.items[i], image_url: gameData.image}]
                ))      
        })
        .catch(() => {
            console.log('error');
        })
        .then(function () {
            res.send({
                newGame    
            })
        })
        .catch(()=> {
            console.log('error');
        })
    })
    .catch( (error) => {
        res.sendStatus(500);
    })
})

module.exports = router;