import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatStepperModule} from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatGridListModule} from '@angular/material/grid-list';



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
import { NewPasswordComponent } from './component/user-manager/new-password/new-password.component';
import { AttendingManagementsIndexComponent } from './component/attendingManagements/attending-managements-index/attending-managements-index.component';
import { AttendingManagementsCreateComponent } from './component/attendingManagements/attending-managements-create/attending-managements-create.component';
import { AttendingManagementsUpdateComponent } from './component/attendingManagements/attending-managements-update/attending-managements-update.component';
import { TeacherIndexComponent } from './component/teacher/teacher-index/teacher-index.component';
import { TeacherCreateComponent } from './component/teacher/teacher-create/teacher-create.component';
import { TeacherUpdateComponent } from './component/teacher/teacher-update/teacher-update.component';
import { StudentDatabaseIndexComponent } from './component/studentDatabase/student-database-index/student-database-index.component';
import { StudentDatabaseMatriculadosComponent } from './component/studentDatabase/student-database-matriculados/student-database-matriculados.component';
import { StudentDatabaseInscritosComponent } from './component/studentDatabase/student-database-inscritos/student-database-inscritos.component';
import { StudentDatabaseSinInscribirComponent } from './component/studentDatabase/student-database-sin-inscribir/student-database-sin-inscribir.component';
import { StudentDatabaseRetiradosComponent } from './component/studentDatabase/student-database-retirados/student-database-retirados.component';
import { StudentDatabaseDesertadosComponent } from './component/studentDatabase/student-database-desertados/student-database-desertados.component';
import { StudentDatabaseGraduadosComponent } from './component/studentDatabase/student-database-graduados/student-database-graduados.component';
import { StatisticsComponent } from './component/studentDatabase/statistics/statistics.component';
import { LevelingIndexComponent } from './component/leveling/leveling-index/leveling-index.component';
import { LevelingCreateComponent } from './component/leveling/leveling-create/leveling-create.component';
import { LevelingUpdateComponent } from './component/leveling/leveling-update/leveling-update.component';
import { TuitionUpdateComponent } from './component/tuition/tuition-update/tuition-update.component';
import { PensionUpdateComponent } from './component/pension/pension-update/pension-update.component';
import { ExtracurricularUpdateComponent } from './component/extracurricular/extracurricular-update/extracurricular-update.component';
import { BackupIndexComponent } from './component/backup/backup-index/backup-index.component';
import { SolicitudEstudiantesComponent } from './component/acudiente/questionario/solicitud-estudiantes/solicitud-estudiantes.component';
import { HermanosComponent } from './component/acudiente/hermanos/hermanos.component';
import { AdmisionIndexComponent } from './component/admision/admision-index/admision-index.component';
import { LoginAcudienteComponent } from './component/login/login-acudiente/login-acudiente.component';
import { BolsilloComponent } from './component/bolsillo/bolsillo.component';
import { MatriculaComponent } from './component/matricula/matricula.component';
import { PagoMatriculaComponent } from './component/pago-matricula/pago-matricula.component';
import { PensionPagoComponent } from './component/pension/pension-pago/pension-pago.component';
import { DescargaDocumentoMatriculaComponent } from './component/documentos-matricula/documentos-matricula-descarga/descarga-documento-matricula.component';
import { CoursesInscripcionComponent } from './component/curses/courses-inscripcion/courses-inscripcion.component';
import { OtrosServiciosComponent } from './component/otros-servicios/otros-servicios.component';
import { MediasTecnicasComponent } from './component/medias-tecnicas/medias-tecnicas.component';
import { ExtracurricularInscripcionComponent } from './component/extracurricular/extracurricular-inscripcion/extracurricular-inscripcion.component';
import { ExtracurricularListComponent } from './component/extracurricular/extracurricular-list/extracurricular-list.component';
import { CafeteriaPagoComponent } from './component/cafeteria/cafeteria-pago/cafeteria-pago.component';
import { SoportesPagoComponent } from './component/soportes-pago/soportes-pago.component';
import { CertificadosComponent } from './component/certificados/certificados.component';
import { SolicitudCertificadoComponent } from './component/solicitud-certificado/solicitud-certificado.component';
import { EstadoCertificadoComponent } from './component/estado-certificado/estado-certificado.component';
import { CertificateIndexInscriptionComponent } from './component/certificate/certificate-index-inscription/certificate-index-inscription.component';
import { CertificateAddDocumentComponent } from './component/certificate/certificate-add-document/certificate-add-document.component';
import { HistoricoDeCarteraComponent } from './component/historico-de-cartera/historico-de-cartera.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginAcudienteComponent,
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
    NewPasswordComponent,
    AttendingManagementsIndexComponent,
    AttendingManagementsCreateComponent,
    AttendingManagementsUpdateComponent,
    TeacherIndexComponent,
    TeacherCreateComponent,
    TeacherUpdateComponent,
    StudentDatabaseIndexComponent,
    StudentDatabaseMatriculadosComponent,
    StudentDatabaseInscritosComponent,
    StudentDatabaseSinInscribirComponent,
    StudentDatabaseRetiradosComponent,
    StudentDatabaseDesertadosComponent,
    StudentDatabaseGraduadosComponent,
    StatisticsComponent,
    LevelingIndexComponent,
    LevelingCreateComponent,
    LevelingUpdateComponent,
    TuitionUpdateComponent,
    PensionUpdateComponent,
    ExtracurricularUpdateComponent,
    BackupIndexComponent,
    SolicitudEstudiantesComponent,
    HermanosComponent,
    AdmisionIndexComponent,
    BolsilloComponent,
    MatriculaComponent,
    PagoMatriculaComponent,
    PensionPagoComponent,
    DescargaDocumentoMatriculaComponent,
    CoursesInscripcionComponent,
    OtrosServiciosComponent,
    MediasTecnicasComponent,
    ExtracurricularInscripcionComponent,
    ExtracurricularListComponent,
    CafeteriaPagoComponent,
    SoportesPagoComponent,
    CertificadosComponent,
    SolicitudCertificadoComponent,
    EstadoCertificadoComponent,
    CertificateIndexInscriptionComponent,
    CertificateAddDocumentComponent,
    HistoricoDeCarteraComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule
  

  
   

   
  

    

  
   

   
  
  ],
  providers: [],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
