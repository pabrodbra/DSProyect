import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from '../interfaces/user.interfaces';
import { forEach } from '@angular/router/src/utils/collection';

@Injectable()
export class MoviesService {

    apiroute = "http://localhost:3000/api";
    movies = [];

    constructor(private http: HttpClient) {
    }

    //Función para obtener toda la lista de películas 
    getMoviesDB(): any {
        let url = `${this.apiroute}/movies`;
        let body: any;
        return this.http.get(url, { observe: 'response' }).pipe(
            map(resp => {
                console.log(resp);
                if (resp.ok) {
                    body = resp.body;
                    for (let movie of body) {
                        this.checkPoster(movie.posterurl).subscribe((resp) => {
                        }, error => {
                            if (error.status != 200) {
                                movie.posterurl = 'assets/noposter.jpg';
                            }
                            this.movies.push(movie);
                        })
                    }
                    return this.movies;
                }
            })
        )
    }

    getMovies(): any {
        return this.movies;
    }

    getMovie(id: String): any {
        let url = `${this.apiroute}/movies`;
        let body = JSON.stringify(id);
        return this.http.post(url, body, { observe: 'response' }).pipe(
            map(resp => {
                console.log(resp);
                if (resp.ok) {
                    return resp.body;
                }
            })
        )
    }

    checkPoster(url: any): any {
        //console.log("Url: " + url );
        return this.http.get(url, { observe: 'response' }).pipe(
            map(resp => {
                return resp; //Will fail, but we handle the error on the component
            })
        )
    }

    getLikes(user:User): any {
        let body = JSON.stringify(user);
        let headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        let url = `${this.apiroute}/getlikes`;

        return this.http.post(url, body, { headers, observe: 'response' })
            .pipe(
                map(resp => {
                    if (resp.ok) {
                        console.log(resp.body);
                        return resp.body;
                    }
                })
            )
    }

    addLike(movie:String){
        let datos = {
            email:localStorage.getItem('email'),
            movie:movie
        };
        console.log(datos);
        let body = JSON.stringify(datos);
        let headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        let url = `${this.apiroute}/updatelike`;

        return this.http.post(url, body, { headers, observe: 'response' })
            .pipe(
                map(resp => {
                    console.log(resp);
                    if (resp.ok) {
                        console.log(resp.body);
                    }
                    return resp;
                })
            )
    }
}