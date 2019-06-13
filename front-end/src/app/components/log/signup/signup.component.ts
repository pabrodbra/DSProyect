import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AsyncValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../../interfaces/user.interfaces';
import { LogService } from '../../../services/log.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  styles: [`
    .ng-invalid.ng-touched:not(form){
      color: red;
    }
  `]
})
export class SignupComponent implements OnInit {

  //Variables
  forma: FormGroup;

  user:User = {
    email: null,
    name: null,
    password: null
  }


  ngOnInit() {
    // if (this._logService.sesionValida()) {
    //   this._router.navigate(['/home']);
    // }
  }

  //Constructor
  constructor( private _router: Router, private _logService:LogService) {

    this.forma = new FormGroup({ //Pueden anidarse FormGroups dentro de otros FormGroups en caso de disponer de campos compuestos
      'nombre': new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        this.noVacio
      ]),

      'email': new FormControl('', [
        Validators.required,
        Validators.email,
        this.noVacio
      ],
        // [
        //   this.existeEmail.bind(this)
        // ]),
      ),

      'password': new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{5,}$"),
        this.noVacio
      ]),
      'repassReg': new FormControl()
    });

    /*
    Validación de las passwords
    -----------------------------------
    Se utiliza esta forma para comprender el contexto en el que se puede utilizar o no this.
    Al utilizar coinciden.bind(this) lo que se consigue es que dentro del contexto de la función cuando se haga referencia
    a this en realidad se está haciendo referencia al this del contexto actual y general.
    Se podría realizar al igual que el resto de validaciones pero esta es una forma alternativa e igual de válida.
    */
    this.forma.controls['repassReg'].setValidators([
      Validators.required,
      this.noVacio,
      this.coinciden.bind(this) //Se utiliza para vincular "this" en el contexto de la función y poder acceder a "this.forma" desde coinciden
    ])

    //this.forma.setValue(this.usuario); De esta forma se pueden dar valores por defecto a cada campo.
  }

  //Función a la que se llama una vez el formulario ha sido validado
  registrar() {
    this.user = {
      name: this.forma.controls['nombre'].value.trim(),
      email: this.forma.controls['email'].value.trim(),
      //password: this.forma.controls['password'].value.trim()
      
    }
    console.log(this.user);

    this._logService.addUser(this.user)
      .subscribe((resp) => {
        if (resp.ok) {
          this._router.navigate(['/login']);
        }else{
          console.log("Error al añadir al usuario");
        }
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

  coinciden(control: FormControl): { [s: string]: boolean } {
    if (control.value !== this.forma.controls['password'].value) { 
      //Es válido porque antes de llamar a la función vinculamos this con this usando bind
      return {                    //En caso contrario no funcionaría al no detectar el contexto adecuado
        nocoindicen: true
      }
    }
    return null;
  }

  existeEmail(control: FormControl): Promise<ValidationErrors | null > {
    return null;
    // return new Promise((resolve, reject) => {
    //
    //   setTimeout(() => {
    //
    //     this._logService.existeEmail(control.value).subscribe( respuesta => {
    //       console.log(control);
    //       if(respuesta == 0){
    //         resolve(null);
    //       }else{
    //         resolve({existeEmail: true});
    //       }
    //     }, error => {
    //       console.log(error);
    //       reject();
    //     });
    //
    //   }, 1000);
    //
    // });
  }
}
