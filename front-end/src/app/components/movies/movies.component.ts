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
    let genreSelectedElement = document.getElementById("genresID") as HTMLSelectElement;
    let yearSelectedElement = document.getElementById("yearsID") as HTMLSelectElement;
    let actorSelectedElement = document.getElementById("actorsID") as HTMLSelectElement;
    let imdbSelectedElement = document.getElementById("imdbratingID") as HTMLSelectElement;
    
    let genreSelected = genreSelectedElement.options[genreSelectedElement.selectedIndex].value;
    let yearSelected = yearSelectedElement.options[yearSelectedElement.selectedIndex].value;
    let actorSelected = actorSelectedElement.options[actorSelectedElement.selectedIndex].value;
    let imdbRatingSelected = imdbSelectedElement.options[imdbSelectedElement.selectedIndex].value;
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
