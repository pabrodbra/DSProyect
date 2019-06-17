import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-actor',
  templateUrl: './actor.component.html',
  styleUrls: ['./actor.component.scss']
})
export class ActorComponent implements OnInit {

  directedActors:any;
  coactors:any;
  actor:String;

  constructor(private _activatedRoute:ActivatedRoute, private _movServ:MoviesService, private _router:Router) { }

  ngOnInit() {
    this._activatedRoute.params.subscribe( resp => {
      this.actor = resp['name']
    });
    this._movServ.getCoactors(this.actor).subscribe(resp =>{
      this.coactors = resp.body;
      console.log(this.coactors);
    });
    this._movServ.getDirectedActor(this.actor).subscribe(resp =>{
      this.directedActors = resp.body;
      console.log(this.directedActors);
    })
  }

}
