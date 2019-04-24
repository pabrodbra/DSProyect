import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class MoviesService{
    
    apiroute = "http://localhost:3000/api";

    constructor(private http: HttpClient){
    }

    //Función para obtener toda la lista de películas 
    getMovies():any{
        let url = `${this.apiroute}/movies`;
        let body = [];
        return this.http.get(url, {observe:'response'}).pipe(
            map(resp => {
                console.log(resp);
                if(resp.ok){
                    return resp.body;
                }
            })
        )
    }
}