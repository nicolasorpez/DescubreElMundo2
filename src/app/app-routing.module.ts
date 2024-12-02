import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PuntosInteresComponent } from './components/puntos-interes/puntos-interes.component';
import { LoginComponent } from './components/login/login.component';
const routes: Routes = [
  { path: '',      component: LoginComponent },
  { path: 'puntos-interes',      component: PuntosInteresComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
