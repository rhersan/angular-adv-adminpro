import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public formSubmitted = false;

  public registerForm: FormGroup = this.fb.group({
    nombre: ['ricardo', [Validators.required, Validators.minLength(3)]],
    email: ['test@dev.com', [Validators.required, Validators.email]],
    password: ['1234', Validators.required],
    password2: ['1234', Validators.required],
    terminos: [true, Validators.requiredTrue],

  },
  {
    validators: this.passwordsIguales('password','password2')
  });

  constructor(private fb: FormBuilder,
              private _usuarioService: UsuarioService,
              private router: Router) {
  }
  crearUsuario(){
    this.formSubmitted = true;

    if( this.registerForm.invalid){
      console.log('Formulario no es correcto...');
      return;
    }


    this._usuarioService.crearUsuario(this.registerForm.value)
      .subscribe({
        next: resp => {
          console.log('usuario creado');
          console.log(resp);
          this.router.navigateByUrl('/dashboard');
        },
        error: (err) => {
          Swal.fire('Error',
            err.error.msg,
            'error'
          );
        }
      });

  }

  campoNoValido(campo: string): boolean {

    if (this.registerForm.get(campo)?.invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
    
  }

  aceptaTerminos(){
    return !this.registerForm.get('terminos')?.value && this.formSubmitted;
  }
  constrasenaNoValidas(){
    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('password2')?.value;

    if( (pass1 !== pass2) && this.formSubmitted){
      return true;
    }else{
      return false;
    }
  }

  passwordsIguales(password1: string, password2: string){
    return ( formGrup: FormGroup) => {
      const pass1Control = formGrup.get(password1);
      const pass2Control = formGrup.get(password2);

      if(pass1Control?.value === pass2Control?.value){
        pass2Control?.setErrors(null);
      }else{
        pass2Control?.setErrors({noEsIgual: true});  
      }

    }
  }
}
