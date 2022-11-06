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
import { TransportationIndexComponent } from './component/transportation/transportation-index/transportation-index.component';
import { TransportationCreateComponent } from './component/transportation/transportation-create/transportation-create.component';
import { TransportationUpdateComponent } from './component/transportation/transportation-update/transportation-update.component';
import { CafereriaIndexComponent } from './component/cafeteria/cafereria-index/cafereria-index.component';
import { CafereriaCreateComponent } from './component/cafeteria/cafereria-create/cafereria-create.component';
import { CafereriaUpdateComponent } from './component/cafeteria/cafereria-update/cafereria-update.component';
import { DiscountIndexComponent } from './component/discount/discount-index/discount-index.component';
import { DiscountCreateComponent } from './component/discount/discount-create/discount-create.component';
import { DiscountUpdateComponent } from './component/discount/discount-update/discount-update.component';
import { CertificateCreateComponent } from './component/certificate/certificate-create/certificate-create.component';
import { CertificateIndexComponent } from './component/certificate/certificate-index/certificate-index.component';
import { CertificateUpdateComponent } from './component/certificate/certificate-update/certificate-update.component';
import { TechnicalIndexComponent } from './component/technical/technical-index/technical-index.component';
import { TechnicalCreateComponent } from './component/technical/technical-create/technical-create.component';
import { TechnicalUpdateComponent } from './component/technical/technical-update/technical-update.component';
import { DocumentosMatriculaIndexComponent } from './component/documentos-matricula/documentos-matricula-index/documentos-matricula-index.component';
import { DocumentosMatriculaCreateComponent } from './component/documentos-matricula/documentos-matricula-create/documentos-matricula-create.component';
import { DocumentosMatriculaUpdateComponent } from './component/documentos-matricula/documentos-matricula-update/documentos-matricula-update.component';
import { SchoolYearIndexComponent } from './component/schoolYear/school-year-index/school-year-index.component';
import { SchoolYearCreateComponent } from './component/schoolYear/school-year-create/school-year-create.component';
import { SchoolYearUpdateComponent } from './component/schoolYear/school-year-update/school-year-update.component';
import { RecoveryPasswordComponent } from './component/user-manager/recovery-password/recovery-password.component';

const routes: Routes = [
  {path: '', component: LoginComponent },
  {path: 'dashboard', component: DashboardComponent },
  {path: 'home', component: HomepageComponent },
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
  {path: 'transporte',component: TransportationIndexComponent},
  {path: 'transporte-crear',component: TransportationCreateComponent},
  {path: 'transporte-editar/:id',component: TransportationUpdateComponent},
  {path: 'cafeteria',component: CafereriaIndexComponent},
  {path: 'cafeteria-crear',component: CafereriaCreateComponent},
  {path: 'cafeteria-editar/:id',component: CafereriaUpdateComponent},
  {path: 'discount',component: DiscountIndexComponent},
  {path: 'discount-crear',component: DiscountCreateComponent},
  {path: 'discount-editar/:id',component: DiscountUpdateComponent},
  {path: 'certificate',component: CertificateIndexComponent},
  {path: 'certificate-crear',component: CertificateCreateComponent},
  {path: 'certificate-editar/:id',component: CertificateUpdateComponent},
  {path: 'medias-tecnica',component: TechnicalIndexComponent},
  {path: 'medias-tecnica-crear',component: TechnicalCreateComponent},
  {path: 'medias-tecnica-editar/:id',component: TechnicalUpdateComponent},
  {path: 'documentos-matricula',component: DocumentosMatriculaIndexComponent},
  {path: 'documentos-matricula-editar/:id',component: DocumentosMatriculaUpdateComponent},
  {path: 'documentos-matricula-crear',component: DocumentosMatriculaCreateComponent},
  {path: 'año-lectivo',component: SchoolYearIndexComponent},
  {path: 'año-lectivo-crear',component: SchoolYearCreateComponent},
  {path: 'año-lectivo-editar/:id',component: SchoolYearUpdateComponent},
  {path: 'recuperar-contrasena',component: RecoveryPasswordComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
