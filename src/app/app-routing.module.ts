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
import { ExtracurricularIndexComponent } from './component/extracurricular/extracurricular-index/extracurricular-index.component';
import { ExtracurricularCreateComponent } from './component/extracurricular/extracurricular-create/extracurricular-create.component';
import { PensionIndexComponent } from './component/pension/pension-index/pension-index.component';
import { PensionCreateComponent } from './component/pension/pension-create/pension-create.component';
import { ServicesIndexComponent } from './component/services-index/services-index.component';
import { CoursesExtraordinarioComponent } from './component/curses/courses-extraordinario/courses-extraordinario.component';
import { CoursesCreateComponent } from './component/curses/courses-create/courses-create.component';
import { CoursesCreateExtraordinariaComponent } from './component/curses/courses-create-extraordinaria/courses-create-extraordinaria.component';
import { CoursesCreateHabilitacionComponent } from './component/curses/courses-create-habilitacion/courses-create-habilitacion.component';
import { CoursesUpdateVeranoComponent } from './component/curses/courses-update-verano/courses-update-verano.component';
import { CoursesUpdateExtraordinariaComponent } from './component/curses/courses-update-extraordinaria/courses-update-extraordinaria.component';
import { CoursesUpdateHabilitacionComponent } from './component/curses/courses-update-habilitacion/courses-update-habilitacion.component';

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
  {path: 'extracurriculares', component: ExtracurricularIndexComponent },
  {path: 'extracurriculares-crear', component: ExtracurricularCreateComponent },
  {path: 'pension', component: PensionIndexComponent },
  {path: 'pension-crear', component: PensionCreateComponent },
  {path: 'servicios', component: ServicesIndexComponent },
  {path: 'cursos-extraordinaria', component: CoursesExtraordinarioComponent },
  {path: 'cursos-crear-verano', component: CoursesCreateComponent },
  {path: 'cursos-crear-habilitacion', component: CoursesCreateHabilitacionComponent },
  {path: 'cursos-crear-extraordinaria', component: CoursesCreateExtraordinariaComponent },
  {path: 'curso-editar-verano/:id',component: CoursesUpdateVeranoComponent},
  {path: 'curso-editar-extraordinaria/:id',component: CoursesUpdateExtraordinariaComponent},
  {path: 'curso-editar-habilitacion/:id',component: CoursesUpdateHabilitacionComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
