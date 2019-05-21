import { Pipe, PipeTransform } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Observable, BehaviorSubject } from 'rxjs';

@Pipe({
  name: 'urlinvalid'
})
export class UrlInvalidPipe implements PipeTransform {

  resultado:BehaviorSubject<Boolean>;

  constructor(private movServ:MoviesService){
    this.resultado = new BehaviorSubject<Boolean>(false);
  }

  transform(url: any): string {
    
    let noimage = "assets/noposter.jpg";
    this.movServ.checkPoster(url).subscribe(resp =>{

    },
    error => {
      if(error.status == 200){
        return url;
      }else{
        this.resultado.next(false);
      }
    })
    console.log("mismo"+this.resultado.value)
    
    return (this.resultado) ? url : noimage;
  }

}