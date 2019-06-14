import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../interfaces/user.interfaces';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class LogService {

  apiroute = "http://localhost:3000/api";
  logObservable: BehaviorSubject<boolean>;

  constructor(private http: HttpClient) {
    this.logObservable = new BehaviorSubject<boolean>(true);
  }

  //Función para añadir un usuario
  addUser(user: User): any {
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

  updateUser(user:User):any{
    let url = `${this.apiroute}/updateuser`;
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

  login(user: User): any {
    let body = JSON.stringify(user);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let url = `${this.apiroute}/login`;

    return this.http.post(url, body, { headers, observe: 'response' })
      .pipe(
        map(resp => {
          if (resp.ok) {
            console.log(resp.body);
          }
          return resp;
        })
      )
  }

  //Función que crea la sesión del usuario en el navegador
  crearSesion(user:User): void {
    //Almacenamos la información en el almacenamiento local
    localStorage.setItem("name", user.name);
    localStorage.setItem("email", user.email);
    localStorage.setItem("password", user.password);
  }

  //Función que borra la información del usuario del almacenamiento local
  cerrarSesion(): void {
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("password");
  }

  //Función que comprueba si el token no ha expirado
  sesionValida(): boolean {
    return localStorage.getItem("name") != null; 
  }
}
