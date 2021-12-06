import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { CreateMaeComponent } from './create-mae/create-mae.component';
import { ListMaeComponent } from './list-mae/list-mae.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  //{path: 'create', component: CreatePostComponent} // dependiendo de la ruta (path) renderiza un componente
  { path: '', component: ListMaeComponent}, // renderiza la ruta principal
  //{ path: 'create', component: CreateMaeComponent, canActivate:[AuthGuard] }, // renderiza la ruta de crear post
  { path: 'edit/:maeId', component: CreateMaeComponent, canActivate:[AuthGuard] },
  { path: 'add', component: CreateMaeComponent, canActivate:[AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
