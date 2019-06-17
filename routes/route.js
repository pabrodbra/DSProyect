// Importing modules
var bodyParser = require('body-parser');

const express = require('express');
const router = express.Router();
router.use(bodyParser.json());

const Movie = require('../models/movies');

router.get('/movies', (req, res) => {
    //res.send('Retrieving movie list');
    Movie.find((err, movies) => {
        res.json(movies);
    })
});

// Add movie
router.post('/movie', (req, res, next) => {
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

    newMovie.save((err, movie) => {
        if (err) res.json({ msg: 'Failed to add movie' });
        else res.json({ msg: 'Movie added succesfully' });
    });
});

// Delete movie
router.delete('/movie/:id', (req, res, next) => {
    Movie.remove({ _id: req.params.id }, (err, result) => {
        if (err) res.json(err);
        else res.json(result);
    })
});

// Update movie
router.post('/movie', (req, res, next) => {

});

// Get all actors
router.get('/actors', (req, res) => {
    //res.send('Retrieving movie list');
    Movie.distinct("actors", (err, movies) => {
        res.json(movies);
    })
});


// Get all genres
router.get('/genres', (req, res) => {
    //res.send('Retrieving movie list');
    Movie.distinct("genres", (err, movies) => {
        res.json(movies);
    })
});

// Get all years
router.get('/years', (req, res) => {
    //res.send('Retrieving movie list');
    Movie.distinct("year", (err, movies) => {
        res.json(movies);
    })
});
router.get('/imdbRatings', (req, res) => {
    //res.send('Retrieving movie list');
    Movie.distinct("imdbRating", (err, movies) => {
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
router.post('/searchMovies', (req, res) => {
    console.log("POST");
    let imdbRatingNumber = "IMDBRating";
    if(req.body.imdb != "IMDBRating"){
        imdbRatingNumber = parseFloat(req.body.imdb)
    }
    let query = {
        
        title: req.body.title,
        genre: req.body.genre,
        year: req.body.year,
        actor: req.body.actor,
        imdbRating: imdbRatingNumber
    };

    let match_query = []
    // Check query inputs
    
    if(query.title != ''){
        console.log("Title: " + query.title);
        match_query.push( { "title":{ "$regex": query.title, $options: '-i' }  } )
    }
    if(query.genre != 'Genre'){
        console.log("Genre: " + query.genre);
        match_query.push( { "genres":{ $in :[ query.genre ]}} )
    }
    
    if(query.year != "Year"){
        console.log("Year: " + query.year);
        match_query.push( { "year": query.year } )
    }
    
    if(query.actor != "Actor"){
        match_query.push( { "actors": query.actor } )
    }
    
    if(query.imdbRating != "IMDBRating"){
        console.log("Imbd: " + query.imdbRating);
        match_query.push({ "imdbRating": { $gte: query.imdbRating } })
    }
    console.log("Query");
    console.log(match_query);

    let pipeline = [
        {
            $match:
                { $and: match_query }
        }
    ];


    Movie.aggregate(pipeline).exec((err, movies) => {
        if (err) throw err;
        res.json(movies);
    })
});

/*#########################
########## CASSANDRA ######
#########################*/
const cassandra = require('cassandra-driver');
const client = new cassandra.Client({ contactPoints: ['127.0.0.1:9042'], localDataCenter: 'datacenter1', keyspace: 'users' });

router.post('/adduser', (req, res) => {
    const query = 'INSERT INTO user(email,name,password) VALUES(?,?,?)';
    console.log(req.body);
    const params = [req.body.email, req.body.name, req.body.password];
    // Set the prepare flag in the query options
    client.execute(query, params, { prepare: true })
        .then(result => {
            console.log('Row added to cluster');
            res.json(result);
        });
})

router.post('/updateuser', (req, res) => {
    const query = 'UPDATE user SET name = ?, password = ? WHERE email = ?';
    console.log(req.body);
    const params = [req.body.name, req.body.password, req.body.email];
    // Set the prepare flag in the query options
    client.execute(query, params, { prepare: true })
        .then(result => {
            console.log('Row updated in cluster');
            res.json(result);
        });
})

router.get('/users', (req, res) => {
    const query = 'SELECT * FROM users.user';
    // Set the prepare flag in the query options
    client.execute(query, { prepare: true })
        .then(result => res.json(result));
})

router.post('/login', (req,res) => {
    const query = "SELECT * FROM users.user WHERE email = ?";
    const params = [req.body.email];
    client.execute(query, params, { prepare:true })
        .then(result => {
            console.log(result.rows[0]);
            res.json(result.rows[0]);
        })
})

router.post('/getlikes', (req,res) => {
    const query = "SELECT likes FROM users.user WHERE email = ?";
    const params = [req.body.email];
    client.execute(query, params, { prepare:true })
        .then(result => {
            console.log(result.rows[0]);
            res.json(result.rows[0]);
        })
})

router.post('/updatelike', (req,res) => {
    const query = "UPDATE user SET likes = likes + ? WHERE email = ?";
    const params = [ [req.body.movie], req.body.email];
    client.execute(query, params, { prepare:true })
        .then(result => {
            console.log(result);
            res.json(result);
        })
})
/*#########################
########## NEO4J ##########
#########################*/

const neo4j = require('neo4j-driver').v1;
const driver = new neo4j.driver("bolt://localhost:7687", neo4j.auth.basic("neo4j", "123"))
const session = driver.session(neo4j.session.READ);

// Get all actors
router.get('/neo4j/actors', (req, res) => {
    var cypher = "MATCH (people:Person) RETURN people.name AS name"

    session.run(cypher)
        .then(result => {
            console.log(result.records.length);

            res.json(result.records.map(record => record.get("name")))
        })
        .then(() => session.close());
    //res.send('Retrieving movie list');

});

// Get coactors
router.get('/neo4j/coactors/:name', (req, res) => {

    let name = req.params.name
    var cypher = "MATCH (p:Person {name:'" + name + "'})-[:ACTED_IN]->(m)<-[:ACTED_IN]-(coActors) RETURN coActors.name AS name, m.title AS title"

    session.run(cypher)
        .then(result => {
            console.log(result.records.length);

            res.json(result.records.map(record => { return ({ "name": record.get("name"), "movie": record.get("title") }) }))
        })
        .then(() => session.close());
    //res.send('Retrieving movie list');

});

// Get coactors
router.get('/neo4j/directedactor/:name', (req, res) => {

    let name = req.params.name
    var cypher = "MATCH (tom:Person {name:'" + name + "'})-[:ACTED_IN]->(m)<-[:DIRECTED]-(director) RETURN director.name AS name, m.title AS title"

    session.run(cypher)
        .then(result => {
            console.log(result.records.length);

            res.json(result.records.map(record => { return ({ "name": record.get("name"), "movie": record.get("title") }) }))
        })
        .then(() => session.close());
    //res.send('Retrieving movie list');

});

// Get shortest path between two actors
router.get('/neo4j/actors_path/:name1/:name2', (req, res) => {
    let name1 = req.params.name1;
    let name2 = req.params.name2;
    var cypher = "MATCH p=shortestPath( (p1:Person {name:'" + name1 + "'})-[*]-(p2:Person {name:'" + name2 + "'}) ) RETURN p";

    session.run(cypher)
        .then(result => {
            console.log(result.records);

            res.json(result.records.map(record => record.get("p")))
        })
        .then(() => session.close());
    //res.send('Retrieving movie list');

});

// http://excellencenodejsblog.com/mongoose-aggregation-count-group-match-project/

var match_pipeline = [
    {
        $match:
        {
            $and: [
                { "imdb.rating": { $gte: 7 } },
                { "genres": { $nin: ["Crime", "Horror"] } },
                { "rated": { $in: ["PG", "G"] } },
                { "languages": { $all: ["English", "Japanese"] } }
            ]
        }
    },
    { $count: "movies" }
];

var project_pipeline = [
    {
        $match:
        {
            $and: [
                { "imdb.rating": { $gte: 7 } },
                { "genres": { $nin: ["Crime", "Horror"] } },
                { "rated": { $in: ["PG", "G"] } },
                { "languages": { $all: ["English", "Japanese"] } }
            ]
        }
    },
    {
        $project: {
            "_id": 0, "title": 1, "rated": 1
        }
    }
];

var split_pipeline = [
    {
        $project: {
            "_id": 0,
            "titleWords": {
                $size: {
                    $split: ["$title", " "]
                }
            },
            "title": 1
        }
    },
    { $match: { "titleWords": 1 } }
];

var favorites = ["Sandra Bullock", "Tom Hanks", "Julia Roberts", "Kevin Spacey", "George Clooney"]
var array_pipeline = [
    {
        $match:
        {
            "tomatoes.viewer.rating": { $gte: 3 },
            "cast": { $exists: true }
        }
    },
    {
        $addFields:
            { "num_favs": { $size: { $setIntersection: ["$cast", favorites] } } }
    },
    {
        $sort: {
            "num_favs": -1,
            "tomatoes.viewer.rating": -1,
            "title": -1
        }
    },
    { $skip: 25 }
];


module.exports = router;