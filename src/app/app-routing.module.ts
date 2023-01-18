import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActualizarComponent } from './components/actualizar/actualizar.component';
import { LoginComponent } from './components/login/login.component';
import { TipoCambioComponent } from './components/tipo-cambio/tipo-cambio.component';

const routes: Routes = [
  { path: 'tipo-cambio', component: TipoCambioComponent },
  { path: 'actualizar', component: ActualizarComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
