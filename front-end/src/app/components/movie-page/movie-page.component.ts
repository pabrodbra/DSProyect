import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-movie-page',
  templateUrl: './movie-page.component.html',
  styleUrls: ['./movie-page.component.scss']
})
export class MoviePageComponent implements OnInit {

  movie:any;

  constructor(private _activatedRoute:ActivatedRoute, private _movServ:MoviesService, private _router:Router) { }

  ngOnInit() {
    this._activatedRoute.params.subscribe( resp => {
      for(let movie of this._movServ.movies){
        if(movie._id == resp['id']){
          this.movie = movie;
          break;
        }
      }
    });
    console.log(this.movie);
  }

}
