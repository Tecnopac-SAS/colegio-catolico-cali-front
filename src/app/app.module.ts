import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { CreateUserComponent } from './component/user-manager/create-user/create-user.component';
import { IndexUserComponent } from './component/user-manager/index-user/index-user.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { NavTitleComponent } from './component/nav-title/nav-title.component';
import { HomepageComponent } from './component/homepage/homepage.component';
import { PeriodIndexComponent } from './component/period/period-index/period-index.component';
import { PeriodCreateComponent } from './component/period/period-create/period-create.component';
import { PeriodChangeComponent } from './component/period/period-change/period-change.component';
import { InscriptionIndexComponent } from './component/incription/inscription-index/inscription-index.component';
import { InscriptionCreateComponent } from './component/incription/inscription-create/inscription-create.component';
import { TuitionIndexComponent } from './component/tuition/tuition-index/tuition-index.component';
import { TuitionCreateComponent } from './component/tuition/tuition-create/tuition-create.component';
import { TuitioExtraCreateComponent } from './component/tuition/tuitio-extra-create/tuitio-extra-create.component';
import { ExtracurricularIndexComponent } from './component/extracurricular/extracurricular-index/extracurricular-index.component';
import { ExtracurricularCreateComponent } from './component/extracurricular/extracurricular-create/extracurricular-create.component';
import { PensionIndexComponent } from './component/pension/pension-index/pension-index.component';
import { PensionCreateComponent } from './component/pension/pension-create/pension-create.component';
import { ServicesIndexComponent } from './component/services-index/services-index.component';
import { CoursesCreateComponent } from './component/curses/courses-create/courses-create.component';
import { CoursesIndexComponent } from './component/curses/courses-verano/courses-index.component';
import { CoursesExtraordinarioComponent } from './component/curses/courses-extraordinario/courses-extraordinario.component';
import { CoursesHabilitacionComponent } from './component/curses/courses-habilitacion/courses-habilitacion.component';
import { CoursesCreateHabilitacionComponent } from './component/curses/courses-create-habilitacion/courses-create-habilitacion.component';
import { CoursesCreateExtraordinariaComponent } from './component/curses/courses-create-extraordinaria/courses-create-extraordinaria.component';
import { CoursesUpdateHabilitacionComponent } from './component/curses/courses-update-habilitacion/courses-update-habilitacion.component';
import { CoursesUpdateExtraordinariaComponent } from './component/curses/courses-update-extraordinaria/courses-update-extraordinaria.component';
import { CoursesUpdateVeranoComponent } from './component/curses/courses-update-verano/courses-update-verano.component';
import { TransportationIndexComponent } from './component/transportation/transportation-index/transportation-index.component';
import { TransportationCreateComponent } from './component/transportation/transportation-create/transportation-create.component';
import { TransportationUpdateComponent } from './component/transportation/transportation-update/transportation-update.component';
import { CafereriaIndexComponent } from './component/cafeteria/cafereria-index/cafereria-index.component';
import { CafereriaCreateComponent } from './component/cafeteria/cafereria-create/cafereria-create.component';
import { CafereriaUpdateComponent } from './component/cafeteria/cafereria-update/cafereria-update.component';
import { DiscountIndexComponent } from './component/discount/discount-index/discount-index.component';
import { DiscountCreateComponent } from './component/discount/discount-create/discount-create.component';
import { DiscountUpdateComponent } from './component/discount/discount-update/discount-update.component';
import { CertificateIndexComponent } from './component/certificate/certificate-index/certificate-index.component';
import { CertificateCreateComponent } from './component/certificate/certificate-create/certificate-create.component';
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


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    CreateUserComponent,
    IndexUserComponent,
    SidebarComponent,
    NavTitleComponent,
    HomepageComponent,
    PeriodIndexComponent,
    PeriodCreateComponent,
    PeriodChangeComponent,
    InscriptionIndexComponent,
    InscriptionCreateComponent,
    TuitionIndexComponent,
    TuitionCreateComponent,
    TuitioExtraCreateComponent,
    ExtracurricularIndexComponent,
    ExtracurricularCreateComponent,
    PensionIndexComponent,
    PensionCreateComponent,
    ServicesIndexComponent,
    CoursesCreateComponent,
    CoursesIndexComponent,
    CoursesExtraordinarioComponent,
    CoursesHabilitacionComponent,
    CoursesCreateHabilitacionComponent,
    CoursesCreateExtraordinariaComponent,
    CoursesUpdateHabilitacionComponent,
    CoursesUpdateExtraordinariaComponent,
    CoursesUpdateVeranoComponent,
    TransportationIndexComponent,
    TransportationCreateComponent,
    TransportationUpdateComponent,
    CafereriaIndexComponent,
    CafereriaCreateComponent,
    CafereriaUpdateComponent,
    DiscountIndexComponent,
    DiscountCreateComponent,
    DiscountUpdateComponent,
    CertificateIndexComponent,
    CertificateCreateComponent,
    CertificateUpdateComponent,
    TechnicalIndexComponent,
    TechnicalCreateComponent,
    TechnicalUpdateComponent,
    DocumentosMatriculaIndexComponent,
    DocumentosMatriculaCreateComponent,
    DocumentosMatriculaUpdateComponent,
    SchoolYearIndexComponent,
    SchoolYearCreateComponent,
    SchoolYearUpdateComponent,
    RecoveryPasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
