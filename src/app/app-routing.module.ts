import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { CreateUserComponent } from './component/user-manager/create-user/create-user.component';
import { IndexUserComponent } from './component/user-manager/index-user/index-user.component';
import { NavTitleComponent } from './component/nav-title/nav-title.component';
import { HomepageComponent } from './component/homepage/homepage.component';
import { PeriodIndexComponent } from './component/period/period-index/period-index.component';
import { PeriodCreateComponent } from './component/period/period-create/period-create.component';
import { InscriptionIndexComponent } from './component/incription/inscription-index/inscription-index.component';
import { InscriptionCreateComponent } from './component/incription/inscription-create/inscription-create.component';
import { TuitionIndexComponent } from './component/tuition/tuition-index/tuition-index.component';
import { TuitionCreateComponent } from './component/tuition/tuition-create/tuition-create.component';


const routes: Routes = [
  {path: '', component: LoginComponent },
  {path: 'dashboard', component: DashboardComponent },
  {path: 'crear-usuario', component: CreateUserComponent },
  {path: 'sidebar', component: SidebarComponent },
  {path: 'listar-usuarios', component: IndexUserComponent },
  {path: 'inicio', component: HomepageComponent },
  {path: 'inscripcion', component: InscriptionIndexComponent },
  {path: 'periodo', component: PeriodIndexComponent },
  {path: 'periodo-crear', component: PeriodCreateComponent },
  {path: 'inscripcion-crear', component: InscriptionCreateComponent },
  {path: 'matriculas-crear', component: TuitionCreateComponent },
  {path: 'matriculas', component: TuitionIndexComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
