// Importing modules
const express = require('express');
const router = express.Router();

const Movie = require('../models/movies');

router.get('/movies', (req, res)=>{
    //res.send('Retrieving contact list');
    Movie.find((err, contacts)=>{
        res.json(contacts);
    })
});

// Add contact
router.post('/contact', (req, res, next)=>{
    let newMovie = new Movie({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone: req.body.phone
    });

    newMovie.save((err, contact)=>{
        if(err) res.json({msg: 'Failed to add movie'});
        else res.json({msg: 'Movie added succesfully'});
    });
});

// Delete contact
router.delete('/contact/:id', (req, res, next)=>{
    Movie.remove({_id: req.params.id}, (err, result)=>{
        if(err) res.json(err);
        else res.json(result);
    })
});

// Update contact
router.post('/contact', (req, res, next)=>{

});

module.exports = router;