const mongoose = require('mongoose');

const MovieSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    year:{
        type: String,
        required: true
    },
    genres:{
        type: [String],
        required: true
    },
    ratings:{
        type: [String],
        required: true
    },
    duration:{
        type: String,
        required: true
    },
    releaseDate:{
        type: String,
        required: true
    },
    storyline:{
        type: String,
        required: true
    },
    actors:{
        type: [String],
        required: true
    },
    imdbRating:{
        type: String,
        required: true
    },
    posterurl:{
        type: String,
        required: true
    }
})

const Movie = module.exports = mongoose.model('Movie', MovieSchema, 'imdbmovies')