import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../usuarios/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _usuario: Usuario = new Usuario();
  private _token: string = '';

  constructor(private http: HttpClient) { }

  public get usuario(): Usuario {
    const lUsuario = localStorage.getItem('usuario');
    if (this._usuario.email) {
      return this._usuario;
    } else if (!this._usuario.email && lUsuario) {
      this._usuario = JSON.parse(lUsuario) as Usuario;
      return this._usuario;
    }
    return new Usuario();
  }

  public get token(): string {
    const lToken = localStorage.getItem('token');
    if (this._token) {
      return this._token;
    } else if (!this._token && lToken) {
      this._token = lToken;
      return this._token;
    }
    return '';
  }

  login(usuario: Usuario):Observable<any>{
    const bParams = {
      "email": usuario.email,
      "password": usuario.password
    }
    return this.http.post<any>(`${environment.url_service}/login`, bParams);
  }

  guardarUsuario(accessToken: string): void {
    let payload = this.obtenerDatosToken(accessToken);
    this._usuario = new Usuario();
    this._usuario.email = payload.sub;
    this._usuario.nombre = payload.nombre;
    localStorage.setItem('usuario', JSON.stringify(this._usuario));
  }

  guardarToken(accessToken: string): void {
    this._token = accessToken;
    localStorage.setItem('token', accessToken);
  }

  obtenerDatosToken(accessToken: string): any {
    if (accessToken) {
      return JSON.parse(atob(accessToken.split(".")[1]));
    }
    return null;
  }

  isAuthenticated(): boolean {
    let payload = this.obtenerDatosToken(this.token);
    if (payload && payload.sub && payload.sub.length > 0) {
      return true;
    }
    return false;
  }

  logout(): void {
    this._token = '';
    this._usuario = new Usuario;
    localStorage.clear();
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
  }
}
