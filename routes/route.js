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

// Get all genres
router.get('/actors', (req, res)=>{
    //res.send('Retrieving movie list');
    Movie.distinct("actors", (err, movies)=>{
        res.json(movies);
    })
});


// Get all year
router.get('/genres', (req, res)=>{
    //res.send('Retrieving movie list');
    Movie.distinct("genres", (err, movies)=>{
        res.json(movies);
    })
});

/*
Buscador de:
    title
Filtrar por:
    genres
    actors
    year
    imdbrating
*/
router.get('/searchMovies', (req, res, next)=>{
    let query = {
        /*
        title: req.body.title,
        year: req.body.year,
        genres: req.body.genres,
        actors: req.body.actors,
        imdbRating: req.body.imdbRating
        */
    };

    let match_query = []
    // Check query inputs
    /*
    if(query.title != undefined){
        match_query.push( { "title": { $gte: 7 } } )
    }
    if(query.year != undefined){
        match_query.push( { "year": { $gte: 7 } } )
    }
    if(query.genres != undefined){
        match_query.push( { "genres": { $gte: 7 } } )
    }
    if(query.actors != undefined){
        match_query.push( { "actors": { $gte: 7 } } )
    }
    if(query.imdbRating != undefined){
        match_query.push( { "imdbRating": { $gte: 7 } } )
    }
    */
    match_query.push( { "imdbRating": { $gte: 7 } } )
    
    let pipeline = [
        { $match : 
            { $and : match_query }
        }
    ];


    Movie.aggregate(pipeline).exec((err, movies) => {
        if (err) throw err;
        res.json(movies);
    })
});

// http://excellencenodejsblog.com/mongoose-aggregation-count-group-match-project/

var match_pipeline = [
	{  $match : 
		{ $and : [
			{ "imdb.rating": { $gte: 7 } }, 
			{ "genres": { $nin: ["Crime", "Horror"] } },
			{ "rated" : { $in : [ "PG", "G" ] } },
			{ "languages" : { $all : [ "English", "Japanese"] } }
		]}
	},
	{ $count : "movies"}
];

var project_pipeline = [
	{  $match : 
		{ $and : [
			{ "imdb.rating": { $gte: 7 } }, 
			{ "genres": { $nin: ["Crime", "Horror"] } },
			{ "rated" : { $in : [ "PG", "G" ] } },
			{ "languages" : { $all : [ "English", "Japanese"] } }
		]}
	},
    { $project : {
        "_id": 0, "title": 1, "rated": 1
        }
    }
];

var split_pipeline = [
    { $project : {
        "_id" : 0,
        "titleWords" : { 
            $size: { 
                $split : [ "$title", " "]
            }
        },
        "title": 1
    }},
    { $match : { "titleWords": 1 }}
];

var favorites = ["Sandra Bullock", "Tom Hanks", "Julia Roberts", "Kevin Spacey", "George Clooney"]
var array_pipeline = [
    {  $match : 
        {
            "tomatoes.viewer.rating": { $gte : 3 },
            "cast" : { $exists: true }
		}
	},
    { $addFields : 
        { "num_favs" : {  $size: { $setIntersection : ["$cast", favorites] } } }
    },
    { $sort: {
        "num_favs" : -1,
        "tomatoes.viewer.rating" : -1,
        "title" : -1
        }
    },
    { $skip : 25 }
];

module.exports = router;