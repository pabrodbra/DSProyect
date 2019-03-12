// Importing modules
const express = require('express');
const router = express.Router();

const Movie = require('../models/movies');

router.get('/movies', (req, res)=>{
    //res.send('Retrieving movie list');
    Movie.find((err, movies)=>{
        res.json(movies);
    })
});

// Add movie
router.post('/movie', (req, res, next)=>{
    let newMovie = new Movie({
        title: req.body.title,
        year: req.body.year,
        genres: req.body.genres,
        ratings: req.body.ratings,
        duration: req.body.duration,
        releaseDate: req.body.releaseDate,
        storyline: req.body.storyline,
        actors: req.body.actors,
        imdbRating: req.body.imdbRating,
        posterurl: req.body.posterurl
    });

    newMovie.save((err, movie)=>{
        if(err) res.json({msg: 'Failed to add movie'});
        else res.json({msg: 'Movie added succesfully'});
    });
});

// Delete movie
router.delete('/movie/:id', (req, res, next)=>{
    Movie.remove({_id: req.params.id}, (err, result)=>{
        if(err) res.json(err);
        else res.json(result);
    })
});

// Update movie
router.post('/movie', (req, res, next)=>{

});

module.exports = router;