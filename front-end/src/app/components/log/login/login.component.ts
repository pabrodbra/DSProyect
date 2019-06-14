import { Component, OnInit, NgZone, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LogService } from '../../../services/log.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { User } from '../../../interfaces/user.interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  styles: [`
    .ng-invalid.ng-touched:not(form){
      color: red;
    }
  `]
})
export class LoginComponent implements OnInit {

  //Variables
  form: FormGroup;
  correcto: boolean;
  subscription: Subscription;

  user: User = {
    name: null,
    email: null,
    password: null
  }

  ngOnInit() {
    // if (this._logService.sesionValida()) {
    //   this._router.navigate(['/home']);
    // }
    this.subscription = this.logService.logObservable.subscribe(valor => {
      this.correcto = valor;
    });
  }

  ngOnDestroy() {
    //this._logService.logObservable.next(true);
    //this.subscription.unsubscribe();
  }

  constructor(private _router: Router, private ref: ChangeDetectorRef, private logService: LogService) {

    this.form = new FormGroup({
      'email': new FormControl('', [
        Validators.required,
        Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"),
        this.noVacio
      ]),

      'password': new FormControl('', [
        Validators.required,
        this.noVacio
      ])
    });
  }

  logearse() {
    this.user = {
      name: null,
      email: this.form.controls['email'].value,
      password: this.form.controls['password'].value
    }

    console.log(this.user);

    this.logService.login(this.user)
      .subscribe(resp => {
        console.log(resp.body);
        if (resp.body != null && resp.body.password == this.user.password) {
          this.logService.crearSesion(resp.body);
          this._router.navigate(['/profile']);
        } else {
          this.logService.logObservable.next(false);
        }
      },
        error => {
          this.logService.logObservable.next(false);
          console.log(error);
        }
      );
  }

  //Validaciones
  noVacio(control: FormControl): { [s: string]: boolean } { //Devuelve un string que es de tipo booleano
    if (typeof control.value === 'string' && !control.value.trim()) {
      return {
        novacio: true
      }
    }
    return null;
  }
}
