import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { CreateUserComponent } from './component/user-manager/create-user/create-user.component';
import { IndexUserComponent } from './component/user-manager/index-user/index-user.component';

const routes: Routes = [
  {path: '', component: LoginComponent },
  {path: 'dashboard', component: DashboardComponent },
  {path: 'crear-usuario', component: CreateUserComponent },
  {path: 'sidebar', component: SidebarComponent },
  {path: 'listar-usuarios', component: IndexUserComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
