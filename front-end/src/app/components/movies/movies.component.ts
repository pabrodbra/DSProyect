import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  movies = [];

  constructor(private _moviesServ:MoviesService) { }

  ngOnInit() {
    this._moviesServ.getMovies().subscribe( (datos) => {
      this.movies = datos;
      console.log(datos);
    });
  }

}
