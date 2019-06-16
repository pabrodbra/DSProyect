import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  movies = [];
  genres = [];
  actors = [];
  years = [];
  imdbRatings = [];

  @ViewChild('genreValue') selectedGenre: ElementRef;

  constructor(private _moviesServ: MoviesService, private _router: Router) { }

  ngOnInit() {
    console.log(this.movies.length);
    this._moviesServ.getGenres().subscribe((datos) => {
      this.genres = datos.sort();
    });
    this._moviesServ.getYears().subscribe((datos) => {
      this.years = datos.sort();
    });
    this._moviesServ.getActors().subscribe((datos) => {
      this.actors = datos.sort();
    });
    this._moviesServ.getImdbRatings().subscribe((datos) => {
      this.imdbRatings = datos.sort();
    });
    if (this._moviesServ.movies.length == 0) {
      this._moviesServ.getMoviesDB().subscribe((datos) => {
        this.movies = datos;
      });
    }else{
      this.movies = this._moviesServ.getMovies();
    }
  }

  addLike(id:String,movie:String){
    let chain = id + ":" + movie;
    console.log(chain);
    this._moviesServ.addLike(chain).subscribe((resp) => {
      console.log(resp);
    });
  }

  applyFilter(textToFilter:String){
    //console.log(textToFilter);
    let genreSelected = document.getElementById("genresID").options[document.getElementById("genresID").selectedIndex].value);
    let yearSelected = document.getElementById("yearsID").options[document.getElementById("yearsID").selectedIndex].value);
    let actorSelected = document.getElementById("actorsID").options[document.getElementById("actorsID").selectedIndex].value);
    let imdbRatingSelected = document.getElementById("imdbratingID").options[document.getElementById("imdbratingID").selectedIndex].value);
    if(textToFilter != ""  || yearSelected != "Select" || genreSelected != "Select" || actorSelected != "Select" || imdbRatingSelected != "Select"){
      console.log("Entrando");
      this._moviesServ.getMoviesSearched(textToFilter, genreSelected, yearSelected, actorSelected, imdbRatingSelected).subscribe((datos) => {
        this.movies = datos;
        console.log(this.movies);
        console.log(textToFilter);
        console.log(genreSelected);
        console.log(yearSelected);
        console.log(actorSelected);
        console.log(imdbRatingSelected);
      });
    }else{
      this._moviesServ.getMoviesDB().subscribe((datos) => {
        this.movies = datos;
      });
      console.log("texto vacio");
    }

  }


}
