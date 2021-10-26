import { HomeComponent } from './home/home.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [

  { path: "", redirectTo: "home", pathMatch: 'full' },
  {
    path :"home" ,canActivate:[AuthGuard] , component:HomeComponent
  },
  {
    path :"login" , component:LoginComponent
  },
  {
    path :"register" , component:RegisterComponent
  },
  {
    path :"**" , component:NotfoundComponent
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes , {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
