import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from '../interfaces/user.interfaces';
import { forEach } from '@angular/router/src/utils/collection';

@Injectable()
export class MoviesService {

    apiroute = "http://localhost:3000/api";
    movies = [];
    genres = [];
    actors = [];
    years = [];
    imdbRatings = [];

    constructor(private http: HttpClient) {
    }

    //Función para obtener toda la lista de películas 
    getMoviesDB(): any {
        let url = `${this.apiroute}/movies`;
        let body: any;
        this.movies = [];
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

    //Función para obtener la lista filtrada
    getMoviesSearched(title:String, genre:String, year:String, actor:String, imdb:String): any {
        console.log("getMoviesSearched");
        let datos = {
            title:title,
            genre:genre,
            year:year,
            actor:actor,
            imdb:imdb,
        };
        console.log(datos);
        let url = `${this.apiroute}/searchMovies`;
        let respMovies : any;
        let body = JSON.stringify(datos);
        this.movies = [];
        let headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        console.log("Empezando");
        return this.http.post(url, body, {headers, observe: 'response' }).pipe(
            map(resp => {
                console.log("Log Resp");
                console.log(resp);
                if (resp.ok) {
                    respMovies = resp.body;
                    for (let movie of respMovies) {
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

    getGenres(): any {
        let url = `${this.apiroute}/genres`;
        let body: any;
        this.movies = [];
        return this.http.get(url, { observe: 'response' }).pipe(
            map(resp => {
                console.log(resp);
                if (resp.ok) {
                    body = resp.body;
                    for (let genre of body) {
                        this.genres.push(genre);
                    }
                    return this.genres;
                }
            })
        )
    }
    getActors(): any {
        let url = `${this.apiroute}/actors`;
        let body: any;
        this.movies = [];
        return this.http.get(url, { observe: 'response' }).pipe(
            map(resp => {
                console.log(resp);
                if (resp.ok) {
                    body = resp.body;
                    for (let actor of body) {
                        this.actors.push(actor);
                    }
                    return this.actors;
                }
            })
        )
    }
    getYears(): any {
        let url = `${this.apiroute}/years`;
        let body: any;
        this.movies = [];
        return this.http.get(url, { observe: 'response' }).pipe(
            map(resp => {
                console.log(resp);
                if (resp.ok) {
                    body = resp.body;
                    for (let year of body) {
                        this.years.push(year);
                    }
                    return this.years;
                }
            })
        )
    }
    getImdbRatings(): any {
        let url = `${this.apiroute}/imdbRatings`;
        let body: any;
        this.movies = [];
        return this.http.get(url, { observe: 'response' }).pipe(
            map(resp => {
                console.log(resp);
                if (resp.ok) {
                    body = resp.body;
                    for (let imdbRating of body) {
                        this.imdbRatings.push(imdbRating);
                    }
                    return this.imdbRatings;
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