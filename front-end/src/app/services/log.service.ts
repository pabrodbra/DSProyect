import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../interfaces/user.interfaces';
import { map } from 'rxjs/operators';

@Injectable()
export class LogService {

  apiroute = "http://localhost:3000/api";

  constructor(private http: HttpClient) { }

  //Función para añadir un usuario
  addUser(user: User) {
    let url = `${this.apiroute}/adduser`;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let body = JSON.stringify(user);
    console.log(body);
    return this.http.post(url, body, { headers, observe: 'response' }).pipe(
      map(resp => {
        console.log(resp);
        return resp;
      })
    )
  }
}
