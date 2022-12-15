import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { StudentDatabase } from 'src/app/models/studentDatabase.model';
import { StudentDatabaseService } from 'src/app/services/student-database.service';
import { HistorialAcademico } from 'src/app/models/studentDatabase.model';
import { Aptitudes } from 'src/app/models/studentDatabase.model';
import { Padres } from 'src/app/models/studentDatabase.model';
import { Router } from '@angular/router';
import Swal from'sweetalert2';


@Component({
  selector: 'app-solicitud-estudiantes',
  templateUrl: './solicitud-estudiantes.component.html',
  styleUrls: ['./solicitud-estudiantes.component.css'],
})
export class SolicitudEstudiantesComponent implements OnInit {

  isOptional = false;
  dataEstudiantes:any
  formValueEstudiantes!: FormGroup;
  formValueHistorialAcademico!: FormGroup;
  formValueAptitudes!: FormGroup;
  formValuePadre!: FormGroup;
  formValueMadre!: FormGroup;
  studentDatabaseModel:StudentDatabase= new StudentDatabase();
  historialAcademicoModel:HistorialAcademico= new HistorialAcademico();
  aptitudModel:Aptitudes= new Aptitudes();
  padreModel:Padres= new Padres();
  madreModel:Padres= new Padres();
  mensaje_ok:any;
  mensaje_error:any;
  gradosCursadoPreescolar=[
    {
    id:1,
    label: "Preescolar",
    value: false,
 
    },
    {
    id:2,
    label: "Jardin",
    value: false,
    },
    {
    id:3,
    label: "Transicion",
    value: false,
    },
    ]
  

  constructor(
    private formBuilder:FormBuilder,
    private studentDatabaseService:StudentDatabaseService,
    private router:Router
  ) {
   
  }


  ngOnInit(): void {
    this.fieldCaptureEstudiantes()
    this.fieldCaptureHistorialAcademico()
    this.fieldCaptureAptitudes()
    this.fieldCapturePadre()
    this.fieldCaptureMadre()
    
  }


  fieldCaptureEstudiantes(){
    this.formValueEstudiantes = this.formBuilder.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      tipoDocumento: ['', Validators.required],
      identificacion: ['', Validators.required],
      expedicion: ['', Validators.required],
      lugarNacimiento: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      edad: ['', Validators.required],
      direccion: ['', Validators.required],
      tipoDireccion: ['', Validators.required],
      barrio: ['', Validators.required],
      estrato: ['', Validators.required],
      telefono: ['', Validators.required],
      correo: ['', Validators.required],
      tipoCupo: ['', Validators.required],
      // codigo: ['', Validators.required],
      // estadoEstudiante: ['', Validators.required],
    })
  }

  fieldCaptureHistorialAcademico(){
    this.formValueHistorialAcademico = this.formBuilder.group({
    preescolar: ['', Validators.required],
    gradoCursadoPreescolar: [false, Validators.required],
    gradoCursadoJardin: [false, Validators.required],
    gradoCursadoTransicion: [false, Validators.required],
    checkPreescolar: [''],
    checkJardin: [''],
    checkTransicion: [''],
    primaria: ['', Validators.required],
    gradoCursadoPrimaria1: [false, Validators.required],
    gradoCursadoPrimaria2: [false, Validators.required],
    gradoCursadoPrimaria3: [false, Validators.required],
    gradoCursadoPrimaria4: [false, Validators.required],
    gradoCursadoPrimaria5: [false, Validators.required],
    bachillerato: ['', Validators.required],
    gradoCursadoBachillerato6: [false, Validators.required],
    gradoCursadoBachillerato7: [false, Validators.required],
    gradoCursadoBachillerato8: [false, Validators.required],
    anioAnterior: ['', Validators.required],
    motivoRetiro: ['', Validators.required],
    repeticionAnio: ['', Validators.required],
    distincionAcademica: ['', Validators.required],
    })
  }
  
  fieldCaptureAptitudes(){
    this.formValueAptitudes= this.formBuilder.group({
      deporteGusto: ['', Validators.required],
      arteGusto: ['', Validators.required],
      distincionDeporte: ['', Validators.required],
      distincionArtistica: ['', Validators.required],
      pasatiempos: ['', Validators.required],
      coleccion: ['', Validators.required],
      estadoSalud: ['', Validators.required],
      enfermedades: ['', Validators.required],
      medicamentos: ['', Validators.required],
      limitacionEducacionFisica: ['', Validators.required],
      tipoSangre: ['', Validators.required],
    })
  }

  
  fieldCapturePadre(){
    this.formValuePadre= this.formBuilder.group({
       estado: ['', Validators.required],
       vive: ['', Validators.required],
       tipoDocumento: ['', Validators.required],
       identificacion: ['', Validators.required],
       nombres: ['', Validators.required],
       apellidos: ['', Validators.required],
       profesion: ['', Validators.required],
       dondeTrabaja: ['', Validators.required],
       cargo: ['', Validators.required],
       ingresoMensual: ['', Validators.required],
       correoElectronico: ['', Validators.required],
       direccion: ['', Validators.required],
       telefono: ['', Validators.required],
       celular: ['', Validators.required],
    })
  }

  fieldCaptureMadre(){
    this.formValueMadre= this.formBuilder.group({
       estado: ['', Validators.required],
       vive: ['', Validators.required],
       tipoDocumento: ['', Validators.required],
       identificacion: ['', Validators.required],
       nombres: ['', Validators.required],
       apellidos: ['', Validators.required],
       profesion: ['', Validators.required],
       dondeTrabaja: ['', Validators.required],
       cargo: ['', Validators.required],
       ingresoMensual: ['', Validators.required],
       correoElectronico: ['', Validators.required],
       direccion: ['', Validators.required],
       telefono: ['', Validators.required],
       celular: ['', Validators.required],
    })
  }




  secondFormGroup = this.formBuilder.group({
    secondCtrl: '',
  });
  
  CrearEstudiante(){
    this.studentDatabaseModel.nombres = this.formValueEstudiantes.value.nombres;
    this.studentDatabaseModel.apellidos = this.formValueEstudiantes.value.apellidos;
    this.studentDatabaseModel.tipoDocumento = this.formValueEstudiantes.value.tipoDocumento;
    this.studentDatabaseModel.identificacion = this.formValueEstudiantes.value.identificacion;
    this.studentDatabaseModel.expedicion = this.formValueEstudiantes.value.expedicion;
    this.studentDatabaseModel.lugarNacimiento = this.formValueEstudiantes.value.lugarNacimiento;
    this.studentDatabaseModel.fechaNacimiento = this.formValueEstudiantes.value.fechaNacimiento;
    this.studentDatabaseModel.edad = this.formValueEstudiantes.value.edad;
    this.studentDatabaseModel.direccion = this.formValueEstudiantes.value.direccion;
    this.studentDatabaseModel.tipoDireccion = this.formValueEstudiantes.value.tipoDireccion;
    this.studentDatabaseModel.barrio = this.formValueEstudiantes.value.barrio;
    this.studentDatabaseModel.estrato = this.formValueEstudiantes.value.estrato;
    this.studentDatabaseModel.telefono = this.formValueEstudiantes.value.telefono;
    this.studentDatabaseModel.correo = this.formValueEstudiantes.value.correo;
    this.studentDatabaseModel.tipoCupo = this.formValueEstudiantes.value.tipoCupo;

    if(this.studentDatabaseModel.nombres =="" ){
      this.mensaje_error="El campo nombres no puede estar vacio"
    }

    else if(this.studentDatabaseModel.apellidos =="" ){
      this.mensaje_error="El campo apellidos no puede estar vacio"
    }
    else{
      this.studentDatabaseService.createStudentDatabase(this.studentDatabaseModel)
      .subscribe(res=>{
      console.log(res);
        if (res.mensaje=="el dato ya existe") {
          this.mensaje_error=res.mensaje;
        }
        else{
          this.mensaje_ok="Se registro correctamente"
          this.formValueEstudiantes = this.formBuilder.group({
            firstCtrl: ['', Validators.required],
      
          })
        }
      },
      err=>{
        console.log(err)
      })
    }
  }

  CrearHistorialAcademico(){
    this.historialAcademicoModel.preescolar = this.formValueHistorialAcademico.value.preescolar;
    this.historialAcademicoModel.gradoCursadoPreescolar= this.formValueHistorialAcademico.value.gradoCursadoPreescolar
    this.historialAcademicoModel.gradoCursadoJardin= this.formValueHistorialAcademico.value.gradoCursadoJardin
    this.historialAcademicoModel.gradoCursadoTransicion= this.formValueHistorialAcademico.value.gradoCursadoTransicion
    this.historialAcademicoModel.primaria = this.formValueHistorialAcademico.value.primaria;
    this.historialAcademicoModel.gradoCursadoPrimaria1 =this.formValueHistorialAcademico.value.gradoCursadoPrimaria1
    this.historialAcademicoModel.gradoCursadoPrimaria2 =this.formValueHistorialAcademico.value.gradoCursadoPrimaria2
    this.historialAcademicoModel.gradoCursadoPrimaria3 =this.formValueHistorialAcademico.value.gradoCursadoPrimaria3
    this.historialAcademicoModel.gradoCursadoPrimaria4 =this.formValueHistorialAcademico.value.gradoCursadoPrimaria4
    this.historialAcademicoModel.gradoCursadoPrimaria5 =this.formValueHistorialAcademico.value.gradoCursadoPrimaria5
    this.historialAcademicoModel.bachillerato = this.formValueHistorialAcademico.value.bachillerato
    this.historialAcademicoModel.gradoCursadoBachillerato6 =this.formValueHistorialAcademico.value.gradoCursadoBachillerato6
    this.historialAcademicoModel.gradoCursadoBachillerato7 =this.formValueHistorialAcademico.value.gradoCursadoBachillerato7
    this.historialAcademicoModel.gradoCursadoBachillerato8 =this.formValueHistorialAcademico.value.gradoCursadoBachillerato8
    this.historialAcademicoModel.anioAnterior = this.formValueHistorialAcademico.value.anioAnterior;
    this.historialAcademicoModel.motivoRetiro = this.formValueHistorialAcademico.value.motivoRetiro;
    this.historialAcademicoModel.repeticionAnio = this.formValueHistorialAcademico.value.repeticionAnio;
    this.historialAcademicoModel.distincionAcademica = this.formValueHistorialAcademico.value.distincionAcademica;
  

    if(this.historialAcademicoModel.preescolar =="" ){
      this.mensaje_error="El campo preescolar no puede estar vacio"
    }

    else if(this.historialAcademicoModel.preescolar=="" ){
      this.mensaje_error="El campo donde curso preescolar no puede estar vacio"
    }
    else{
      this.studentDatabaseService.createHistorialAcademico(this.historialAcademicoModel)
      .subscribe(res=>{
      console.log(res);
        if (res.mensaje=="el dato ya existe") {
          this.mensaje_error=res.mensaje;
        }
        else{
          this.mensaje_ok="Se registro correctamente"
          this.formValueHistorialAcademico = this.formBuilder.group({
            preescolar: ['', Validators.required],
            gradoCursadoPreescolar: [false, Validators.required],
            gradoCursadoJardin: [false, Validators.required],
            gradoCursadoTransicion: [false, Validators.required],
            checkPreescolar: [''],
            checkJardin: [''],
            checkTransicion: [''],
            primaria: ['', Validators.required],
            gradoCursadoPrimaria1: [false, Validators.required],
            gradoCursadoPrimaria2: [false, Validators.required],
            gradoCursadoPrimaria3: [false, Validators.required],
            gradoCursadoPrimaria4: [false, Validators.required],
            gradoCursadoPrimaria5: [false, Validators.required],
            bachillerato: ['', Validators.required],
            gradoCursadoBachillerato6: [false, Validators.required],
            gradoCursadoBachillerato7: [false, Validators.required],
            gradoCursadoBachillerato8: [false, Validators.required],
            anioAnterior: ['', Validators.required],
            motivoRetiro: ['', Validators.required],
            repeticionAnio: ['', Validators.required],
            distincionAcademica: ['', Validators.required],
            })
        }
      },
      err=>{
        console.log(err)
      })
    }
  }

  CrearAptitudes(){
    this.aptitudModel.deporteGusto = this.formValueAptitudes.value.deporteGusto;
    this.aptitudModel.arteGusto = this.formValueAptitudes.value.arteGusto;
    this.aptitudModel.distincionDeporte = this.formValueAptitudes.value.distincionDeporte;
    this.aptitudModel.distincionArtistica = this.formValueAptitudes.value.distincionArtistica;
    this.aptitudModel.pasatiempos = this.formValueAptitudes.value.pasatiempos;
    this.aptitudModel.coleccion = this.formValueAptitudes.value.coleccion;
    this.aptitudModel.estadoSalud = this.formValueAptitudes.value.estadoSalud;
    this.aptitudModel.enfermedades = this.formValueAptitudes.value.enfermedades;
    this.aptitudModel.medicamentos = this.formValueAptitudes.value.medicamentos;
    this.aptitudModel.limitacionEducacionFisica = this.formValueAptitudes.value.limitacionEducacionFisica;
    this.aptitudModel.tipoSangre = this.formValueAptitudes.value.tipoSangre;
    
  
    if(this.aptitudModel.deporteGusto=="" ){
      this.mensaje_error="El campo el deporte que le gusta no puede estar vacio"
    }

    else if( this.aptitudModel.arteGusto=="" ){
      this.mensaje_error="El campo donde arte que le gusta no puede estar vacio"
    }
    else{
      this.studentDatabaseService.createAptitudes(this.aptitudModel)
      .subscribe(res=>{
      console.log(res);
        if (res.mensaje=="el dato ya existe") {
          this.mensaje_error=res.mensaje;
        }
        else{
          this.mensaje_ok="Se registro correctamente"
          this.formValueAptitudes= this.formBuilder.group({
            deporteGusto: ['', Validators.required],
            arteGusto: ['', Validators.required],
            distincionDeporte: ['', Validators.required],
            distincionArtistica: ['', Validators.required],
            pasatiempos: ['', Validators.required],
            coleccion: ['', Validators.required],
            estadoSalud: ['', Validators.required],
            enfermedades: ['', Validators.required],
            medicamentos: ['', Validators.required],
            limitacionEducacionFisica: ['', Validators.required],
            tipoSangre: ['', Validators.required],
          })
        }
      },
      err=>{
        console.log(err)
      })
    }
  }

  CrearPadre(){
    this.padreModel.estado = this.formValuePadre.value.estado;
    this.padreModel.vive = this.formValuePadre.value.vive;
    this.padreModel.tipoDocumento = this.formValuePadre.value.tipoDocumento;
    this.padreModel.identificacion = this.formValuePadre.value.identificacion;
    this.padreModel.nombres = this.formValuePadre.value.nombres;
    this.padreModel.apellidos = this.formValuePadre.value.apellidos;
    this.padreModel.profesion = this.formValuePadre.value.profesion;
    this.padreModel.dondeTrabaja = this.formValuePadre.value.dondeTrabaja;
    this.padreModel.cargo = this.formValuePadre.value.cargo;
    this.padreModel.ingresoMensual = this.formValuePadre.value.ingresoMensual;
    this.padreModel.correoElectronico = this.formValuePadre.value.correoElectronico;
    this.padreModel.direccion = this.formValuePadre.value.direccion;
    this.padreModel.telefono = this.formValuePadre.value.telefono;
    this.padreModel.celular = this.formValuePadre.value.celular;


    this.madreModel.estado = this.formValueMadre.value.estado;
    this.madreModel.vive = this.formValueMadre.value.vive;
    this.madreModel.tipoDocumento = this.formValueMadre.value.tipoDocumento;
    this.madreModel.identificacion = this.formValueMadre.value.identificacion;
    this.madreModel.nombres = this.formValueMadre.value.nombres;
    this.madreModel.apellidos = this.formValueMadre.value.apellidos;
    this.madreModel.profesion = this.formValueMadre.value.profesion;
    this.madreModel.dondeTrabaja = this.formValueMadre.value.dondeTrabaja;
    this.madreModel.cargo = this.formValueMadre.value.cargo;
    this.madreModel.ingresoMensual = this.formValueMadre.value.ingresoMensual;
    this.madreModel.correoElectronico = this.formValueMadre.value.correoElectronico;
    this.madreModel.direccion = this.formValueMadre.value.direccion;
    this.madreModel.telefono = this.formValueMadre.value.telefono;
    this.madreModel.celular = this.formValueMadre.value.celular;

  
    if(this.padreModel.estado=="" ){
      this.mensaje_error="El campo estado no puede estar vacio"
    }

    else if(this.padreModel.vive=="" ){
      this.mensaje_error="El campo vive no puede estar vacio"
    }
    else{
      this.studentDatabaseService.createPadre(this.padreModel)
      .subscribe(res=>{
      console.log(res);
        if (res.mensaje=="el dato ya existe") {
          this.mensaje_error=res.mensaje;
        }
        else{
          this.mensaje_ok="Se registro correctamente"
          this.formValuePadre= this.formBuilder.group({
            estado: ['', Validators.required],
            vive: ['', Validators.required],
            tipoDocumento: ['', Validators.required],
            identificacion: ['', Validators.required],
            nombres: ['', Validators.required],
            apellidos: ['', Validators.required],
            profesion: ['', Validators.required],
            dondeTrabaja: ['', Validators.required],
            cargo: ['', Validators.required],
            ingresoMensual: ['', Validators.required],
            correoElectronico: ['', Validators.required],
            direccion: ['', Validators.required],
            telefono: ['', Validators.required],
            celular: ['', Validators.required],
         })
        }
      },
      err=>{
        console.log(err)
      })

      
      this.studentDatabaseService.createMadre(this.madreModel)
      .subscribe(res=>{
      console.log(res);
        if (res.mensaje=="el dato ya existe") {
          this.mensaje_error=res.mensaje;
        }
        else{
          this.mensaje_ok="Se registro correctamente"
          this.formValueMadre= this.formBuilder.group({
            estado: ['', Validators.required],
            vive: ['', Validators.required],
            tipoDocumento: ['', Validators.required],
            identificacion: ['', Validators.required],
            nombres: ['', Validators.required],
            apellidos: ['', Validators.required],
            profesion: ['', Validators.required],
            dondeTrabaja: ['', Validators.required],
            cargo: ['', Validators.required],
            ingresoMensual: ['', Validators.required],
            correoElectronico: ['', Validators.required],
            direccion: ['', Validators.required],
            telefono: ['', Validators.required],
            celular: ['', Validators.required],
         })
        }
      },
      err=>{
        console.log(err)
      })
    }
  }

  cerrarAlerta(){
    this.mensaje_error=""
  }

}


