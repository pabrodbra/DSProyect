db = db.getSiblingDB('entertainmentminer')

db.imdbmovies.createIndex({genres: "text"})
db.imdbmovies.createIndex({imdbRating: -1})
