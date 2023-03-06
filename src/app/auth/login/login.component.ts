import { Component, AfterViewInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import {  Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

import { UsuarioService } from '../../services/usuario.service';


declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit {

  @ViewChild('googleBtn') googleBtn!: ElementRef;

   public formSubmited = false;

   public loginForm:FormGroup = this.fb.group({
    email: [localStorage.getItem('email') || '',[Validators.required, Validators.email]],
    password: ['',Validators.required],
    remember: [false]
   });

  constructor( private router: Router,
               private fb: FormBuilder,
               private _usuarioService: UsuarioService,
               private ngZone: NgZone) {
    
  }
  ngAfterViewInit(): void {
    this.googleInit();
  }

  login(){

    //const this.loginForm.value);    
    this._usuarioService.login( this.loginForm.value )
        .subscribe({
          next: ( resp: any ) => {

            if(this.loginForm.get('remember')?.value){
              localStorage.setItem('email', this.loginForm.get('email')?.value);
            }else{
              localStorage.removeItem('email');
            }
            // Navegar al Dashboar
            this.ngZone.run( () => {
              this.router.navigateByUrl('/dashboard');
            });    

          },
          error: err => {
            console.log('Err', err);
            Swal.fire('Error',
                    err.error.msg,
                    'error'
                   );
          }
        } );


  }

  googleInit(){
    google.accounts.id.initialize({
      client_id: "14725285314-sjtueidoev71ie5htanqb4kp4143gdf2.apps.googleusercontent.com",
      callback: (response: any) =>  this.handleCredentialResponse(response)
    });
    google.accounts.id.renderButton(
      this.googleBtn.nativeElement,
      { theme: "outline", size: "large" }  // customization attributes
    );
  }

  handleCredentialResponse(response: any){    
    console.log('token-google', response.credential);
    this._usuarioService.loginGoogle(response.credential)
        .subscribe({
          next: (resp: any) => {
            if(resp.ok){
              // Navegar al Dashboar
              this.ngZone.run( () => {
                this.router.navigateByUrl('/dashboard');
              });    
            }
          }, 
          error: (err) => {
            Swal.fire('Error',
                      err.error.msg,
                      'error'
                     );
          }
        });

  }



}
