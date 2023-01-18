import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Usuario } from 'src/app/usuarios/usuario';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  titulo: string = 'Please Sign In!';
  usuario: Usuario;

  constructor(private authService: AuthService, private router: Router) {
    this.usuario = new Usuario();
  }

  ngOnInit() {
    if(this.authService.isAuthenticated()) {
      Swal.fire('Login', `Hola ${this.authService.usuario.email}, ya estas autenticado!`,'info');
      this.router.navigate(['/tipo-cambio']);
    }
  }

  login(): void {
    if(!this.usuario.email || !this.usuario.password) {
      Swal.fire('Error Login', 'Email o password vacios!', 'error');
      return;
    }
    this.authService.login(this.usuario).subscribe((resp)=>{
      this.authService.guardarUsuario(resp.Authorization);
      this.authService.guardarToken(resp.Authorization);
      this.router.navigate(['/tipo-cambio']);
      Swal.fire('Login',`Hola ${this.authService.usuario.email}, has iniciado sesion con exito!`,'success');
    }, err => {
      if(err.status == 403) {
        Swal.fire('Error Login', 'Email o password incorrectas!', 'error');
      }
    })
  }


}
