#!/bin/bash

mongoimport --db entertainmentminer --collection imdbmovies --drop --file top-rated-movies-full.json --jsonArray