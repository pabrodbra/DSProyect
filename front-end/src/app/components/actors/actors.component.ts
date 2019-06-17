import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-actors',
  templateUrl: './actors.component.html',
  styleUrls: ['./actors.component.scss']
})
export class ActorsComponent implements OnInit {

  actors:any[];

  constructor( private movieServ:MoviesService ) { }

  ngOnInit() {
    this.movieServ.getNeoActors().subscribe( (resp) => {
      this.actors = resp.body;
    })
  }

}
