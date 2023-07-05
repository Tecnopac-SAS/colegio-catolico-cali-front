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
import { TuitionUpdateComponent } from './component/tuition/tuition-update/tuition-update.component';
import { ExtracurricularIndexComponent } from './component/extracurricular/extracurricular-index/extracurricular-index.component';
import { ExtracurricularCreateComponent } from './component/extracurricular/extracurricular-create/extracurricular-create.component';
import { ExtracurricularUpdateComponent } from './component/extracurricular/extracurricular-update/extracurricular-update.component';
import { PensionIndexComponent } from './component/pension/pension-index/pension-index.component';
import { PensionCreateComponent } from './component/pension/pension-create/pension-create.component';
import { PensionUpdateComponent } from './component/pension/pension-update/pension-update.component';
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
import { NewPasswordComponent } from './component/user-manager/new-password/new-password.component';
import { AttendingManagementsIndexComponent } from './component/attendingManagements/attending-managements-index/attending-managements-index.component';
import { AttendingManagementsUpdateComponent } from './component/attendingManagements/attending-managements-update/attending-managements-update.component';
import { AttendingManagementsCreateComponent } from './component/attendingManagements/attending-managements-create/attending-managements-create.component';
import { TeacherIndexComponent } from './component/teacher/teacher-index/teacher-index.component';
import { TeacherCreateComponent } from './component/teacher/teacher-create/teacher-create.component';
import { TeacherUpdateComponent } from './component/teacher/teacher-update/teacher-update.component';
import { StudentDatabaseIndexComponent } from './component/studentDatabase/student-database-index/student-database-index.component';
import { StudentDatabaseDesertadosComponent } from './component/studentDatabase/student-database-desertados/student-database-desertados.component';
import { StudentDatabaseGraduadosComponent } from './component/studentDatabase/student-database-graduados/student-database-graduados.component';
import { StudentDatabaseInscritosComponent } from './component/studentDatabase/student-database-inscritos/student-database-inscritos.component';
import { StudentDatabaseMatriculadosComponent } from './component/studentDatabase/student-database-matriculados/student-database-matriculados.component';
import { StudentDatabaseRetiradosComponent } from './component/studentDatabase/student-database-retirados/student-database-retirados.component';
import { StudentDatabaseSinInscribirComponent } from './component/studentDatabase/student-database-sin-inscribir/student-database-sin-inscribir.component';
import { StatisticsComponent } from './component/studentDatabase/statistics/statistics.component';
import { LevelingIndexComponent } from './component/leveling/leveling-index/leveling-index.component';
import { LevelingCreateComponent } from './component/leveling/leveling-create/leveling-create.component';
import { LevelingUpdateComponent } from './component/leveling/leveling-update/leveling-update.component';
import { BackupIndexComponent } from './component/backup/backup-index/backup-index.component';
import { AdmisionIndexComponent } from './component/admision/admision-index/admision-index.component';
import { LoginAcudienteComponent } from './component/login/login-acudiente/login-acudiente.component';
import { BolsilloComponent } from './component/bolsillo/bolsillo.component';

//gestion acudiente
import { SolicitudEstudiantesComponent } from './component/acudiente/questionario/solicitud-estudiantes/solicitud-estudiantes.component';
import { MatriculaComponent } from './component/matricula/matricula.component';
import { PagoMatriculaComponent } from './component/pago-matricula/pago-matricula.component';
import { PensionPagoComponent } from './component/pension/pension-pago/pension-pago.component';
import { DescargaDocumentoMatriculaComponent } from './component/documentos-matricula/documentos-matricula-descarga/descarga-documento-matricula.component';
import { OtrosServiciosComponent } from './component/otros-servicios/otros-servicios.component';
import { CoursesInscripcionComponent } from './component/curses/courses-inscripcion/courses-inscripcion.component';
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
import { AjustesPerfilIndexComponent } from './component/perfil/ajustes-perfil-index/ajustes-perfil-index.component';
import { AjustesPerfilPassComponent } from './component/perfil/ajustes-perfil-pass/ajustes-perfil-pass.component';
import { AjustesPerfilEstudianteComponent } from './component/perfil/ajustes-perfil-estudiante/ajustes-perfil-estudiante.component';
import { AjustesPerfilAcudienteComponent } from './component/perfil/ajustes-perfil-acudiente/ajustes-perfil-acudiente.component';
import { PazysalvocuatrosellosComponent } from './component/pazysalvocuatrosellos/pazysalvocuatrosellos.component';
import { EstadoCarteraComponent } from './component/estado-cartera/estado-cartera.component';

const routes: Routes = [
  {path: '', component: LoginAcudienteComponent },
  {path: 'admin', component: LoginComponent },
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
  {path: 'matriculas-editar/:id',component: TuitionUpdateComponent},
  {path: 'extracurriculares', component: ExtracurricularIndexComponent },
  {path: 'extracurriculares-crear', component: ExtracurricularCreateComponent },
  {path: 'extracurriculares-editar/:id', component: ExtracurricularUpdateComponent },
  {path: 'pension', component: PensionIndexComponent },
  {path: 'pension-crear', component: PensionCreateComponent },
  {path: 'pension-editar/:id', component: PensionUpdateComponent },
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
  {path: 'nueva-contrasena/:id',component: NewPasswordComponent},
  {path: 'gestion-acudiente',component: AttendingManagementsIndexComponent},
  {path: 'gestion-acudiente-editar/:id',component: AttendingManagementsUpdateComponent},
  {path: 'gestion-acudiente-crear',component: AttendingManagementsCreateComponent},
  {path: 'docente',component: TeacherIndexComponent},
  {path: 'docente-editar/:id',component: TeacherUpdateComponent},
  {path: 'docente-crear',component: TeacherCreateComponent},
  {path: 'base-estudiantes',component: StudentDatabaseIndexComponent},
  {path: 'estudiantes-desertados',component: StudentDatabaseDesertadosComponent},
  {path: 'estudiantes-graduados',component: StudentDatabaseGraduadosComponent},
  {path: 'estudiantes-inscritos',component: StudentDatabaseInscritosComponent},
  {path: 'estudiantes-matriculados',component: StudentDatabaseMatriculadosComponent},
  {path: 'estudiantes-retirados',component: StudentDatabaseRetiradosComponent},
  {path: 'estudiantes-sin-inscribir',component: StudentDatabaseSinInscribirComponent},
  {path: 'estudiantes-estadisticas',component: StatisticsComponent},
  {path: 'nivelaciones',component: LevelingIndexComponent},
  {path: 'nivelaciones-crear',component: LevelingCreateComponent},
  {path: 'nivelaciones-editar/:id',component: LevelingUpdateComponent},
  {path: 'copias-seguridad',component: BackupIndexComponent},
  {path: 'admision',component: AdmisionIndexComponent},
  {path: 'pazysalvocuatrosellos',component: PazysalvocuatrosellosComponent},
  {path: 'estado-cartera',component: EstadoCarteraComponent},
  //gestion acudientes
  {path: 'solicitud-estudiante',component: SolicitudEstudiantesComponent},
  {path: 'bolsillo',component: BolsilloComponent},
  {path: 'matricula',component: MatriculaComponent},
  {path: 'pago-matricula',component: PagoMatriculaComponent},
  {path: 'pago-pension',component: PensionPagoComponent},
  {path: 'descarga-documento-matricula',component: DescargaDocumentoMatriculaComponent},
  {path: 'otros-servicios',component: OtrosServiciosComponent},
  {path: 'inscripcion-cursos',component: CoursesInscripcionComponent},
  {path: 'medias-tecnicas',component: MediasTecnicasComponent},
  {path: 'extracurricular-inscripcion',component: ExtracurricularInscripcionComponent},
  {path: 'mis-extracurriculares',component: ExtracurricularListComponent},
  {path: 'cafeteria-pago',component: CafeteriaPagoComponent},
  {path: 'soportes-pago',component: SoportesPagoComponent},
  {path: 'certificados',component: CertificadosComponent},
  {path: 'solicitud-certificado',component: SolicitudCertificadoComponent},
  {path: 'estado-certificado',component: EstadoCertificadoComponent},
  {path: 'certificados-solicitud',component: CertificateIndexInscriptionComponent},
  {path: 'certificate/:id',component: CertificateAddDocumentComponent},
  {path: 'historico-cartera',component: HistoricoDeCarteraComponent},
  {path: 'ajuste-perfil',component: AjustesPerfilIndexComponent},
  {path: 'cambio-pass',component: AjustesPerfilPassComponent},
  {path: 'datos-estudiante',component: AjustesPerfilEstudianteComponent},
  {path: 'datos-acudiente',component: AjustesPerfilAcudienteComponent},

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
