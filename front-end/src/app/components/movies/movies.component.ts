import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  movies = [];

  constructor(private _moviesServ: MoviesService, private _router: Router) { }

  ngOnInit() {
    console.log(this._moviesServ.movies.length);
    if (this._moviesServ.movies.length == 0) {
      this._moviesServ.getMoviesDB().subscribe((datos) => {
        this.movies = datos;
      });
    }else{
      this.movies = this._moviesServ.getMovies();
    }
  }

}
