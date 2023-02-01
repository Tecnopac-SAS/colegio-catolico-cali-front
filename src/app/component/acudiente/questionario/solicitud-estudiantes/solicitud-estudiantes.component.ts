import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder,FormControl,FormGroup,Validators } from '@angular/forms';
import { Hermano2, StudentDatabase } from 'src/app/models/studentDatabase.model';
import { StudentDatabaseService } from 'src/app/services/student-database.service';
import { HistorialAcademico } from 'src/app/models/studentDatabase.model';
import { Aptitudes } from 'src/app/models/studentDatabase.model';
import { Padres } from 'src/app/models/studentDatabase.model';
import { Hermano } from 'src/app/models/studentDatabase.model';
import { Acudiente } from 'src/app/models/studentDatabase.model';
import { Responsable } from 'src/app/models/studentDatabase.model';
import { CanalReferencia } from 'src/app/models/canalReferencia.model';
import { CanalReferenciaService } from 'src/app/services/canal-referencia.service';
import { HermanosComponent } from '../../hermanos/hermanos.component';
import { Router } from '@angular/router';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import Swal from'sweetalert2';


@Component({
  selector: 'app-solicitud-estudiantes',
  templateUrl: './solicitud-estudiantes.component.html',
  styleUrls: ['./solicitud-estudiantes.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    },
  ],
})
export class SolicitudEstudiantesComponent implements OnInit {
  isEditable = false;
  idEstudiante !: any;
  parentesco !: any;
  validadorCheckSi !: false;
  validadorCheckNo !: false;
  validadorCheckHermano!: boolean;
  validadorBotonHermano!: boolean;
  validadorAgregarOtroHermano!: boolean;
  habilitarCampoPadre!: boolean;
  habilitarCampoMadre!: boolean;
  isOptional = false;
  dataEstudiantes:any
  formValueEstudiantes!: FormGroup;
  formValueHistorialAcademico!: FormGroup;
  formValueAptitudes!: FormGroup;
  formValuePadre!: FormGroup;
  formValueMadre!: FormGroup;
  formValueDatosAdicionales!: FormGroup;
  formValueDatosAdicionalesHermanos!: FormGroup;
  formValueDatosAdicionalesHermanos2!: FormGroup;
  formValueDatosAdicionalesResponsable!: FormGroup;
  formValueCanalReferencia!: FormGroup;
  studentDatabaseModel:StudentDatabase= new StudentDatabase();
  historialAcademicoModel:HistorialAcademico= new HistorialAcademico();
  aptitudModel:Aptitudes= new Aptitudes();
  padreModel:Padres= new Padres();
  madreModel:Padres= new Padres();
  acudienteModel:Acudiente= new Acudiente();
  responsableModel:Responsable= new Responsable();
  hermanoModel:Hermano= new Hermano();
  hermanoModel2:Hermano2= new Hermano2();
  canalReferenciaModel:CanalReferencia= new CanalReferencia();
  checkSi:any
  validadorTerminos:any
  validadorResponsable !: any;
  validadorResponsableFacturacion !: any;
  mensaje_ok:any;
  mensaje_error:any;
  @Input()
  idHermano:any;
  newFormHermano: any;


  constructor(
    private formBuilder:FormBuilder,
    private studentDatabaseService:StudentDatabaseService,
    private canalReferenciaService:CanalReferenciaService,
    private router:Router
  ) {
   
  }


  ngOnInit(): void {
    this.validadorResponsable= true
    this.validadorResponsableFacturacion= true
    this.validadorTerminos=true
    this.validadorCheckHermano=true
    this.validadorBotonHermano=true
    this.validadorAgregarOtroHermano=false
    this.fieldCaptureEstudiantes()
    this.fieldCaptureHistorialAcademico()
    this.fieldCaptureAptitudes()
    this.fieldCapturePadre()
    this.fieldCaptureMadre()
    this.fieldCaptureDatosAdicionales()
    this.fieldCaptureDatosAdicionalesHermanos()
    this.fieldCaptureDatosAdicionalesHermanos2()
    this.fieldCaptureDatosAdicionalesResponsable()
    this.fieldCaptureCanalReferencia()
    this.hermanosForm();

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
  addPrescolar(){
    this.formValueHistorialAcademico.value.preescolar.push({nombre:'',gradoCursadoPreescolar:'',gradoCursadoJardin:'',gradoCursadoTransicion:''})
  }
  removePrescolar(id:any){
    if (this.formValueHistorialAcademico.value.preescolar.length>1) {
      let newArray = this.formValueHistorialAcademico.value.preescolar.filter((o:any,i:any) => i !== id)
      this.formValueHistorialAcademico.value.preescolar=newArray
    }
  }
  addPrimaria(){
    this.formValueHistorialAcademico.value.primaria.push({nombre:'',gradoCursadoPrimaria1:'',gradoCursadoPrimaria2:'',gradoCursadoPrimaria3:'',gradoCursadoPrimaria4:'',gradoCursadoPrimaria5:''})
  }
  removePrimaria(id:any){
    if (this.formValueHistorialAcademico.value.primaria.length>1) {
      let newArray = this.formValueHistorialAcademico.value.primaria.filter((o:any,i:any) => i !== id)
      this.formValueHistorialAcademico.value.primaria=newArray
    }
  }
  addBachillerato(){
    this.formValueHistorialAcademico.value.bachillerato.push({nombre:'',gradoCursadoBachillerato6:'',gradoCursadoBachillerato7:'',gradoCursadoBachillerato8:''})
  }
  removeBachillerato(id:any){
    if (this.formValueHistorialAcademico.value.bachillerato.length>1) {
      let newArray = this.formValueHistorialAcademico.value.bachillerato.filter((o:any,i:any) => i !== id)
      this.formValueHistorialAcademico.value.bachillerato=newArray
    }
  }
  fieldCaptureHistorialAcademico(){
    this.formValueHistorialAcademico = this.formBuilder.group({
    preescolar: this.formBuilder.array([
      {nombre:'',gradoCursadoPreescolar:'',gradoCursadoJardin:'',gradoCursadoTransicion:''},
  ]),
    // gradoCursadoPreescolar: [false],
    // gradoCursadoJardin: [false],
    // gradoCursadoTransicion: [false],
    checkPreescolar: [''],
    checkJardin: [''],
    checkTransicion: [''],
    primaria: this.formBuilder.array([
      {nombre:'',gradoCursadoPrimaria1:'',gradoCursadoPrimaria2:'',gradoCursadoPrimaria3:'',gradoCursadoPrimaria4:'',gradoCursadoPrimaria5:''},
  ]),
    // gradoCursadoPrimaria1: [false],
    // gradoCursadoPrimaria2: [false],
    // gradoCursadoPrimaria3: [false ],
    // gradoCursadoPrimaria4: [false],
    // gradoCursadoPrimaria5: [false],
    bachillerato: this.formBuilder.array([
      {nombre:'',gradoCursadoBachillerato6:'',gradoCursadoBachillerato7:'',gradoCursadoBachillerato8:''},
  ]),
    // gradoCursadoBachillerato6: [false],
    // gradoCursadoBachillerato7: [false],
    // gradoCursadoBachillerato8: [false,],
    anioAnterior: ['', Validators.required],
    motivoRetiro: [''],
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
       continuar: ['', Validators.required],
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

  fieldCaptureDatosAdicionales(){
    this.formValueDatosAdicionales= this.formBuilder.group({
      parentesco: ['', Validators.required],
      checkSi:[true],
      checkNo:[true],
      responsable: ['', Validators.required],
      //estado: ['', Validators.required],
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

  fieldCaptureDatosAdicionalesHermanos(){
    this.formValueDatosAdicionalesHermanos= this.formBuilder.group({
      nombres: new FormControl('',[Validators.required]),
      apellidos: new FormControl('',[Validators.required]),
      nivelEstudio: new FormControl('',[Validators.required]),
      institucion: new FormControl('',[Validators.required])
    })
  }

  fieldCaptureDatosAdicionalesHermanos2(){
    this.formValueDatosAdicionalesHermanos2= this.formBuilder.group({
      nombres: new FormControl('',[Validators.required]),
      apellidos: new FormControl('',[Validators.required]),
      nivelEstudio: new FormControl('',[Validators.required]),
      institucion: new FormControl('',[Validators.required])
    })
  }

  fieldCaptureDatosAdicionalesResponsable(){
    this.formValueDatosAdicionalesResponsable= this.formBuilder.group({
      responsable: ['', Validators.required],
      tipoPersona: ['', Validators.required],
      razonSocial: ['', Validators.required],
      tipoDocumento: ['', Validators.required],
      identificacion: ['', Validators.required],
      pais: ['', Validators.required],
      ciudad: ['', Validators.required],
      departamento: ['', Validators.required],
      correoElectronico: ['', Validators.required],
      direccion: ['', Validators.required],
      celular: ['', Validators.required]
    })
  }

  fieldCaptureCanalReferencia(){
    this.formValueCanalReferencia= this.formBuilder.group({
      aceptaCompromisos: ['', Validators.required],
      comoSabe: ['', Validators.required],
      comoSeEntero: ['', Validators.required],
      estadoPago: ['', Validators.required],
      nombreAcudiente: ['', Validators.required],
      porqueIngresar: ['', Validators.required],

    })
  }

  formularioHermanos(){
    return new FormGroup({
      nombres: new FormControl('',[Validators.required]),
      apellidos: new FormControl('',[Validators.required]),
      nivelEstudio: new FormControl('',[Validators.required]),
      institucion: new FormControl('',[Validators.required])
    })
  }

 
  get datosFormArray():FormArray{
    return this.newFormHermano.get('Contenido') as FormArray;
  }

  hermanosForm(){
    this.newFormHermano = new FormGroup({  
      Contenido: new FormArray([
        HermanosComponent.formulario()
      ])

    })
  }

  addHermano(){
    this.datosFormArray.push( HermanosComponent.formulario());
  }

  removeHermano(index:number){
    this.datosFormArray.removeAt(index)
  }


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

    if(this.formValueCanalReferencia.value.aceptaCompromisos =="" ){
      this.mensaje_error="El campo acepta los compromisos no puede estar vacio"
    }

    
    else{
      this.studentDatabaseService.createStudentDatabase(this.studentDatabaseModel)
      .subscribe(res=>{
      this.idEstudiante=res.idEstudiante
      console.log(res);
        if (res.mensaje=="el dato ya existe") {
          this.mensaje_error=res.mensaje;
        }
        else{
          this.mensaje_ok="Se registro correctamente"
          console.log(this.idEstudiante)
          // this.formValueEstudiantes = this.formBuilder.group({
          // })
          this.CrearHistorialAcademico()
          this.CrearAptitudes()
          this.CrearPadre()
          this.CrearHermano()
          this.CrearAcudiente()
          this.CrearCanalReferencia()
        }
      },
      err=>{
        console.log(err)
      })
    }
  }

  CrearHistorialAcademico(){
    this.historialAcademicoModel.idEstudiante=this.idEstudiante
    this.historialAcademicoModel.preescolar = this.formValueHistorialAcademico.value.preescolar;
    // this.historialAcademicoModel.gradoCursadoPreescolar= this.formValueHistorialAcademico.value.gradoCursadoPreescolar
    // this.historialAcademicoModel.gradoCursadoJardin= this.formValueHistorialAcademico.value.gradoCursadoJardin
    // this.historialAcademicoModel.gradoCursadoTransicion= this.formValueHistorialAcademico.value.gradoCursadoTransicion
    this.historialAcademicoModel.primaria = this.formValueHistorialAcademico.value.primaria;
    // this.historialAcademicoModel.gradoCursadoPrimaria1 =this.formValueHistorialAcademico.value.gradoCursadoPrimaria1
    // this.historialAcademicoModel.gradoCursadoPrimaria2 =this.formValueHistorialAcademico.value.gradoCursadoPrimaria2
    // this.historialAcademicoModel.gradoCursadoPrimaria3 =this.formValueHistorialAcademico.value.gradoCursadoPrimaria3
    // this.historialAcademicoModel.gradoCursadoPrimaria4 =this.formValueHistorialAcademico.value.gradoCursadoPrimaria4
    // this.historialAcademicoModel.gradoCursadoPrimaria5 =this.formValueHistorialAcademico.value.gradoCursadoPrimaria5
    this.historialAcademicoModel.bachillerato = this.formValueHistorialAcademico.value.bachillerato
    // this.historialAcademicoModel.gradoCursadoBachillerato6 =this.formValueHistorialAcademico.value.gradoCursadoBachillerato6
    // this.historialAcademicoModel.gradoCursadoBachillerato7 =this.formValueHistorialAcademico.value.gradoCursadoBachillerato7
    // this.historialAcademicoModel.gradoCursadoBachillerato8 =this.formValueHistorialAcademico.value.gradoCursadoBachillerato8
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
          /*this.formValueHistorialAcademico = this.formBuilder.group({
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
            })*/
        }
      },
      err=>{
        console.log(err)
      })
    }
  }

  CrearAptitudes(){
    this.aptitudModel.idEstudiante=this.idEstudiante
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
     
        }
      },
      err=>{
        console.log(err)
      })
    }
  }

  CrearPadre(){
    this.padreModel.idEstudiante=this.idEstudiante
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

    this.madreModel.idEstudiante=this.idEstudiante
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
         /* this.formValuePadre= this.formBuilder.group({
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
         })*/
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
          /*this.formValueMadre= this.formBuilder.group({
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
         })*/
        }
      },
      err=>{
        console.log(err)
      })
    }
  }


  CrearAcudiente(){
    this.acudienteModel.idEstudiante=this.idEstudiante
    this.acudienteModel.responsable = this.formValueDatosAdicionalesResponsable.value.responsable;
    this.acudienteModel.parentesco = this.formValueDatosAdicionales.value.parentesco;
    this.acudienteModel.parentesco = this.parentesco;
    this.acudienteModel.nombres = this.formValueDatosAdicionales.value.nombres;
    this.acudienteModel.apellidos = this.formValueDatosAdicionales.value.apellidos;
    //this.acudienteModel.estado = this.formValueDatosAdicionales.value.estado;
    this.acudienteModel.vive = this.formValueDatosAdicionales.value.vive;
    this.acudienteModel.tipoDocumento = this.formValueDatosAdicionales.value.tipoDocumento;
    this.acudienteModel.identificacion = this.formValueDatosAdicionales.value.identificacion;
    this.acudienteModel.profesion = this.formValueDatosAdicionales.value.profesion;
    this.acudienteModel.dondeTrabaja = this.formValueDatosAdicionales.value.dondeTrabaja;
    this.acudienteModel.cargo = this.formValueDatosAdicionales.value.cargo;
    this.acudienteModel.ingresoMensual = this.formValueDatosAdicionales.value.ingresoMensual;
    this.acudienteModel.correoElectronico = this.formValueDatosAdicionales.value.correoElectronico;
    this.acudienteModel.direccion = this.formValueDatosAdicionales.value.direccion;
    this.acudienteModel.telefono = this.formValueDatosAdicionales.value.telefono;
    this.acudienteModel.celular = this.formValueDatosAdicionales.value.celular;

    this.responsableModel.idEstudiante=this.idEstudiante
    this.responsableModel.responsable = this.formValueDatosAdicionalesResponsable.value.responsable;
    this.responsableModel.tipoPersona = this.formValueDatosAdicionalesResponsable.value.tipoPersona;
    this.responsableModel.razonSocial = this.formValueDatosAdicionalesResponsable.value.razonSocial;
    this.responsableModel.tipoDocumento = this.formValueDatosAdicionalesResponsable.value.tipoDocumento;
    this.responsableModel.identificacion = this.formValueDatosAdicionalesResponsable.value.identificacion;
    this.responsableModel.pais = this.formValueDatosAdicionalesResponsable.value.pais;
    this.responsableModel.ciudad = this.formValueDatosAdicionalesResponsable.value.ciudad;
    this.responsableModel.departamento = this.formValueDatosAdicionalesResponsable.value.departamento;
    this.responsableModel.correoElectronico = this.formValueDatosAdicionalesResponsable.value.correoElectronico;
    this.responsableModel.direccion = this.formValueDatosAdicionalesResponsable.value.direccion;
    this.responsableModel.celular = this.formValueDatosAdicionalesResponsable.value.celular;

    console.log(this.acudienteModel)

    if(this.acudienteModel.parentesco=="" ){
      this.mensaje_error="El campo parentesco no puede estar vacio"
    }

    else if( this.acudienteModel.nombres=="" ){
      this.mensaje_error="El campo nombres no puede estar vacio"
    }
    else{
      this.studentDatabaseService.createAcudiente(this.acudienteModel)
      .subscribe(res=>{
      console.log(res);
        if (res.mensaje=="el dato ya existe") {
          this.mensaje_error=res.mensaje;
        }
        else{
          this.mensaje_ok="Se registro correctamente"
        }
      },
      err=>{
        console.log(err)
      })

      
      this.studentDatabaseService.createResponsable(this.responsableModel)
      .subscribe(res=>{
      console.log(res);
        if (res.mensaje=="el dato ya existe") {
          this.mensaje_error=res.mensaje;
        }
        else{
          this.mensaje_ok="Se registro correctamente"
        }
      },
      err=>{
        console.log(err)
      })
    }
  }


  CrearHermano(){
    this.hermanoModel.idEstudiante=this.idEstudiante
    this.hermanoModel2.idEstudiante=this.idEstudiante
    //this.newFormHermano.value.nombres
    this.hermanoModel.nombres = this.formValueDatosAdicionalesHermanos.value.nombres
    this.hermanoModel.apellidos= this.formValueDatosAdicionalesHermanos.value.apellidos
    this.hermanoModel.institucion= this.formValueDatosAdicionalesHermanos.value.institucion
    this.hermanoModel.nivelEstudio= this.formValueDatosAdicionalesHermanos.value.nivelEstudio

    this.hermanoModel2.nombres = this.formValueDatosAdicionalesHermanos2.value.nombres
    this.hermanoModel2.apellidos= this.formValueDatosAdicionalesHermanos2.value.apellidos
    this.hermanoModel2.institucion= this.formValueDatosAdicionalesHermanos2.value.institucion
    this.hermanoModel2.nivelEstudio= this.formValueDatosAdicionalesHermanos2.value.nivelEstudio


    console.log(this.hermanoModel)
    if(this.hermanoModel.nombres =="" ){
      this.mensaje_error="El campo nombre no puede estar vacio"
    }

    else if(this.hermanoModel.apellidos ="" ){
      this.mensaje_error="El campo apellido no puede estar vacio"
    }
    else{
      this.studentDatabaseService.createHermanos(this.hermanoModel)
      .subscribe(res=>{
      console.log(res);
        if (res.mensaje=="el dato ya existe") {
          this.mensaje_error=res.mensaje;
        }
        else{
          this.mensaje_ok="Se registro correctamente"
  
        }
      },

      err=>{
        console.log(err)
      })

      this.studentDatabaseService.createHermanos(this.hermanoModel2)
      .subscribe(res=>{
      console.log(res);
        if (res.mensaje=="el dato ya existe") {
          this.mensaje_error=res.mensaje;
        }
        else{
          this.mensaje_ok="Se registro correctamente"
  
        }
      },

      
      
      err=>{
        console.log(err)
      })
    }

    
  }

  CrearCanalReferencia(){
  
    this.canalReferenciaModel.idEstudiante=this.idEstudiante
    this.canalReferenciaModel.aceptaCompromisos = this.formValueCanalReferencia.value.aceptaCompromisos;
    this.canalReferenciaModel.comoSabe = this.formValueCanalReferencia.value.comoSabe;
    this.canalReferenciaModel.comoSeEntero = this.formValueCanalReferencia.value.comoSeEntero;
    this.canalReferenciaModel.estadoPago = 0;
    this.canalReferenciaModel.nombreAcudiente = this.formValueCanalReferencia.value.nombreAcudiente;
    this.canalReferenciaModel.porqueIngresar = this.formValueCanalReferencia.value.porqueIngresar;
    console.log(this.canalReferenciaModel)

    if(this.formValueCanalReferencia.value.aceptaCompromisos =="" ){
      this.mensaje_error="El campo acepta los compromisos no puede estar vacio"
    }

    else{
      this.canalReferenciaService.createCanalReferencia(this.canalReferenciaModel)
      .subscribe(res=>{
      console.log(res);
        if (res.mensaje=="el dato ya existe") {
          this.mensaje_error=res.mensaje;
        }
        else{
          this.mensaje_ok="Se registro correctamente"
      
        }
      },
      err=>{
        console.log(err)
      })

    
   
    }
  }

  validarCamposEstudiante(){
    if(this.formValueEstudiantes.value.nombres =="" ){
      this.mensaje_error="El campo nombres no puede estar vacio"
    }

    else if(this.formValueEstudiantes.value.apellidos =="" ){
      this.mensaje_error="El campo apellidos no puede estar vacio"
    }

    else if(this.formValueEstudiantes.value.tipoDocumento =="" ){
      this.mensaje_error="El campo tipo de documento no puede estar vacio"
    }

    else if(this.formValueEstudiantes.value.identificacion =="" ){
      this.mensaje_error="El campo tipo de identificacion no puede estar vacio"
    }

    else if(this.formValueEstudiantes.value.expedicion =="" ){
      this.mensaje_error="El campo expedición no puede estar vacio"
    }

    else if(this.formValueEstudiantes.value.lugarNacimiento =="" ){
      this.mensaje_error="El campo lugar de nacimiento no puede estar vacio"
    }

    else if(this.formValueEstudiantes.value.fechaNacimiento =="" ){
      this.mensaje_error="El campo fecha de nacimiento no puede estar vacio"
    }

    else if(this.formValueEstudiantes.value.edad <=0 ){
      this.mensaje_error="El campo edad no puede estar vacio"
    }

    else if(this.formValueEstudiantes.value.direccion =="" ){
      this.mensaje_error="El campo dirección no puede estar vacio"
    }


    else if(this.formValueEstudiantes.value.tipoDireccion =="" ){
      this.mensaje_error="El campo tipo de dirección no puede estar vacio"
    }

    else if(this.formValueEstudiantes.value.barrio =="" ){
      this.mensaje_error="El campo barrio no puede estar vacio"
    }

    else if(this.formValueEstudiantes.value.estrato <=0 ){
      this.mensaje_error="El campo estrato no puede estar vacio"
    }
    else if(this.formValueEstudiantes.value.telefono =="" ){
      this.mensaje_error="El campo telefono no puede estar vacio"
    }else if(!this.validateCelPhoneNumber(this.formValueEstudiantes.value.telefono)){
      this.mensaje_error="El campo telefono no es un numero de 10 digitos"
    }
    else if(this.formValueEstudiantes.value.correo =="" ){
      this.mensaje_error="El campo correo no puede estar vacio"
    }else if(!this.isEmailValid(this.formValueEstudiantes.value.correo)){
      this.mensaje_error="El campo correo no es valido"
    }

    else if(this.formValueEstudiantes.value.tipoCupo =="" ){
      this.mensaje_error="El campo tipo de cupo no puede estar vacio"
    }

  }

  validarCamposHistorialAcademico(){
   
     if(this.formValueEstudiantes.value.tipoCupo =="" ){
      this.mensaje_error="El campo tipo de cupo no puede estar vacio"
    }

    else if(this.formValueHistorialAcademico.value.preescolar =="" ){
      this.mensaje_error="El campo preescolar de cupo no puede estar vacio"
    }

    else if(this.formValueHistorialAcademico.value.primaria =="" ){
      this.mensaje_error="El campo primaria no puede estar vacio"
    }

    else if(this.formValueHistorialAcademico.value.bachillerato =="" ){
      this.mensaje_error="El campo bachillerato no puede estar vacio"
    }

    else if(this.formValueHistorialAcademico.value.anioAnterior =="" ){
      this.mensaje_error="El campo año anterior no puede estar vacio"
    }

    else if(this.formValueHistorialAcademico.value.motivoRetiro =="" ){
      this.mensaje_error="El campo motivo de retiro no puede estar vacio"
    }

    else if(this.formValueHistorialAcademico.value.repeticionAnio =="" ){
      this.mensaje_error="El campo si ha repetido año no puede estar vacio"
    }

    else if(this.formValueHistorialAcademico.value.distincionAcademica =="" ){
      this.mensaje_error="El campo distinción académica no puede estar vacio"
    }

  
  }
  validarCamposHistorialEstadoFisico(){
   
    if(this.formValueAptitudes.value.deporteGusto =="" ){
     this.mensaje_error="El campo deporte que le gusta no puede estar vacio"
   }

   else if(this.formValueAptitudes.value.arteGusto =="" ){
     this.mensaje_error="El campo arte que le gusta no puede estar vacio"
   }

   else if(this.formValueAptitudes.value.distincionDeporte =="" ){
     this.mensaje_error="El campo distinción de algún deporte puede estar vacio"
   }

   else if(this.formValueAptitudes.value.distincionArtistica=="" ){
     this.mensaje_error="El campo distinción artística no puede estar vacio"
   }

   else if(this.formValueAptitudes.value.pasatiempos=="" ){
     this.mensaje_error="El campo año pasatiempos no puede estar vacio"
   }

   else if(this.formValueAptitudes.value.coleccion =="" ){
     this.mensaje_error="El campo colección no puede estar vacio"
   }

   else if(this.formValueAptitudes.value.estadoSalud =="" ){
     this.mensaje_error="El campo estado de salud no puede estar vacio"
   }

   else if(this.formValueAptitudes.value.enfermedades=="" ){
     this.mensaje_error="El campo si tiene alguna enfermedad no puede estar vacio"
   }

   else if(this.formValueAptitudes.value.medicamentos=="" ){
    this.mensaje_error="El campo medicamentos no puede estar vacio"
  }

  else if(this.formValueAptitudes.value.limitacionEducacionFisica=="" ){
    this.mensaje_error="El campo limitación física no puede estar vacio"
  }

  else if(this.formValueAptitudes.value.tipoSangre=="" ){
    this.mensaje_error="El campo tipo de sangre no puede estar vacio"
  }

 
  }

  validarCamposPadres(){
   
  if(this.formValuePadre.value.estado =="" ){
     this.mensaje_error="El campo estado no puede estar vacio"
   }

   else if(this.formValuePadre.value.vive =="" ){
     this.mensaje_error="El campo vive no puede estar vacio"
   }
   
   else if(this.formValuePadre.value.tipoDocumento =="" ){
    this.mensaje_error="El campo tipo documento no puede estar vacio"
  }

  else if(this.formValuePadre.value.identificacion =="" ){
    this.mensaje_error="El campo identificación no puede estar vacio"
  }

  else if(this.formValuePadre.value.nombres =="" ){
    this.mensaje_error="El campo nombres no puede estar vacio"
  }

  else if(this.formValuePadre.value.apellidos =="" ){
    this.mensaje_error="El campo apellidos no puede estar vacio"
  }

  else if(this.formValuePadre.value.profesion =="" ){
    this.mensaje_error="El campo profesión no puede estar vacio"
  }

  else if(this.formValuePadre.value.dondeTrabaja =="" ){
    this.mensaje_error="El campo donde trabaja no puede estar vacio"
  }

  else if(this.formValuePadre.value.cargo =="" ){
    this.mensaje_error="El campo cargo no puede estar vacio"
  }

  else if(this.formValuePadre.value.ingresoMensual <=0 ){
    this.mensaje_error="El campo ingreso mensual no puede estar vacio"
  }

  else if(this.formValuePadre.value.correoElectronico =="" ){
    this.mensaje_error="El campo correo electronico no puede estar vacio"
  }else if(!this.isEmailValid(this.formValuePadre.value.correoElectronico) && this.formValuePadre.value.correoElectronico != 'N/A'){
    this.mensaje_error="El campo correo no es valido"
  }

  else if(this.formValuePadre.value.direccion =="" ){
    this.mensaje_error="El campo dirección no puede estar vacio"
  }

  else if(this.formValuePadre.value.telefono ==""){
    this.mensaje_error="El campo telefono no puede estar vacio"
  }else if(!this.validateCelPhoneNumber(this.formValuePadre.value.telefono) && this.formValuePadre.value.telefono != '1'){
    this.mensaje_error="El campo telefono no es un numero de 10 digitos"
  }

  else if(this.formValuePadre.value.celular =="" ){
    this.mensaje_error="El campo celular no puede estar vacio"
  }else if(!this.validateCelPhoneNumber(this.formValuePadre.value.celular) && this.formValuePadre.value.celular != '1'){
    this.mensaje_error="El campo celular no es un numero de 10 digitos"
  }
  else if(this.formValueMadre.value.estado =="" ){
    this.mensaje_error="El campo estado no puede estar vacio"
  }

  else if(this.formValueMadre.value.vive =="" ){
    this.mensaje_error="El campo vive no puede estar vacio"
  }
  
  else if(this.formValueMadre.value.tipoDocumento =="" ){
   this.mensaje_error="El campo tipo documento no puede estar vacio"
 }

 else if(this.formValueMadre.value.identificacion =="" ){
   this.mensaje_error="El campo identificación no puede estar vacio"
 }

 else if(this.formValueMadre.value.nombres =="" ){
   this.mensaje_error="El campo nombres no puede estar vacio"
 }

 else if(this.formValueMadre.value.apellidos =="" ){
   this.mensaje_error="El campo apellidos no puede estar vacio"
 }

 else if(this.formValueMadre.value.profesion =="" ){
   this.mensaje_error="El campo profesión no puede estar vacio"
 }

 else if(this.formValueMadre.value.dondeTrabaja =="" ){
   this.mensaje_error="El campo donde trabaja no puede estar vacio"
 }

 else if(this.formValueMadre.value.cargo =="" ){
   this.mensaje_error="El campo cargo no puede estar vacio"
 }

 else if(this.formValueMadre.value.ingresoMensual <=0 ){
   this.mensaje_error="El campo ingreso mensual no puede estar vacio"
 }

 else if(this.formValueMadre.value.correoElectronico =="" ){
   this.mensaje_error="El campo correo electronico no puede estar vacio"
 }else if(!this.isEmailValid(this.formValueMadre.value.correoElectronico) && this.formValueMadre.value.correoElectronico != 'N/A'){
  this.mensaje_error="El campo correo no es valido"
}

 else if(this.formValueMadre.value.direccion =="" ){
   this.mensaje_error="El campo dirección no puede estar vacio"
 }

 else if(this.formValueMadre.value.telefono ==""){
   this.mensaje_error="El campo telefono no puede estar vacio"
 }else if(!this.validateCelPhoneNumber(this.formValueMadre.value.telefono) && this.formValueMadre.value.telefono != '1'){
  this.mensaje_error="El campo telefono no es un numero de 10 digitos"
}

 else if(this.formValueMadre.value.celular =="" ){
   this.mensaje_error="El campo celular no puede estar vacio"
 }else if(!this.validateCelPhoneNumber(this.formValueMadre.value.celular) && this.formValueMadre.value.telefono != '1'){
  this.mensaje_error="El campo celular no es un numero de 10 digitos"
}

 else{
  this.formValuePadre.value.continuar="ok"
  this.formValuePadre.controls['continuar'].setValue("ok")

 }
  
  }

  validarCamposMadre(){
   
    if(this.formValueMadre.value.estado =="" ){
      this.mensaje_error="El campo estado no puede estar vacio"
    }
  
    else if(this.formValueMadre.value.vive =="" ){
      this.mensaje_error="El campo vive no puede estar vacio"
    }
    
    else if(this.formValueMadre.value.tipoDocumento =="" ){
     this.mensaje_error="El campo tipo documento no puede estar vacio"
   }
  
   else if(this.formValueMadre.value.identificacion =="" ){
     this.mensaje_error="El campo identificación no puede estar vacio"
   }
  
   else if(this.formValueMadre.value.nombres =="" ){
     this.mensaje_error="El campo nombres no puede estar vacio"
   }
  
   else if(this.formValueMadre.value.apellidos =="" ){
     this.mensaje_error="El campo apellidos no puede estar vacio"
   }
  
   else if(this.formValueMadre.value.profesion =="" ){
     this.mensaje_error="El campo profesión no puede estar vacio"
   }
  
   else if(this.formValueMadre.value.dondeTrabaja =="" ){
     this.mensaje_error="El campo donde trabaja no puede estar vacio"
   }
  
   else if(this.formValueMadre.value.cargo =="" ){
     this.mensaje_error="El campo cargo no puede estar vacio"
   }
  
   else if(this.formValueMadre.value.ingresoMensual <=0 ){
     this.mensaje_error="El campo ingreso mensual no puede estar vacio"
   }
  
   else if(this.formValueMadre.value.correoElectronico =="" ){
     this.mensaje_error="El campo correo electronico no puede estar vacio"
   }else if(!this.isEmailValid(this.formValueMadre.value.correoElectronico) && this.formValueMadre.value.correoElectronico != 'N/A'){
    this.mensaje_error="El campo correo no es valido"
  }
  
   else if(this.formValueMadre.value.direccion =="" ){
     this.mensaje_error="El campo dirección no puede estar vacio"
   }
  
   else if(this.formValueMadre.value.telefono ==""){
     this.mensaje_error="El campo telefono no puede estar vacio"
   }else if(!this.validateCelPhoneNumber(this.formValueMadre.value.telefono) && this.formValueMadre.value.telefono != '1'){
    this.mensaje_error="El campo telefono no es un numero de 10 digitos"
  }
  
   else if(this.formValueMadre.value.celular =="" ){
     this.mensaje_error="El campo celular no puede estar vacio"
   }else if(!this.validateCelPhoneNumber(this.formValueMadre.value.celular) && this.formValueMadre.value.celular != '1'){
    this.mensaje_error="El campo celular no es un numero de 10 digitos"
  }
  
   else{
    this.formValueMadre.value.continuar="ok"
    this.formValuePadre.controls['continuar'].setValue("ok")
  
   }
  
  
    }
  bloquedarCamposPadre(){

    if(this.formValuePadre.value.estado==0) {
      this.habilitarCampoPadre=true;
      this.formValuePadre.controls['vive'].setValue("2")
      this.formValuePadre.controls['tipoDocumento'].setValue("NO")
      this.formValuePadre.controls['identificacion'].setValue("N/A")
      this.formValuePadre.controls['nombres'].setValue("N/A")
      this.formValuePadre.controls['apellidos'].setValue("N/A")
      this.formValuePadre.controls['profesion'].setValue("N/A")
      this.formValuePadre.controls['dondeTrabaja'].setValue("N/A")
      this.formValuePadre.controls['cargo'].setValue("N/A")
      this.formValuePadre.controls['ingresoMensual'].setValue(1)
      this.formValuePadre.controls['correoElectronico'].setValue("N/A")
      this.formValuePadre.controls['direccion'].setValue("N/A")
      this.formValuePadre.controls['telefono'].setValue(1)
      this.formValuePadre.controls['celular'].setValue(1)
    }
     else if(this.formValuePadre.value.estado==1) {
      this.habilitarCampoPadre=false;
      this.formValuePadre.controls['vive'].setValue("")
      this.formValuePadre.controls['tipoDocumento'].setValue("")
      this.formValuePadre.controls['identificacion'].setValue("")
      this.formValuePadre.controls['nombres'].setValue("")
      this.formValuePadre.controls['apellidos'].setValue("")
      this.formValuePadre.controls['profesion'].setValue("")
      this.formValuePadre.controls['dondeTrabaja'].setValue("")
      this.formValuePadre.controls['cargo'].setValue("")
      this.formValuePadre.controls['ingresoMensual'].setValue(0)
      this.formValuePadre.controls['correoElectronico'].setValue("")
      this.formValuePadre.controls['direccion'].setValue("")
      this.formValuePadre.controls['telefono'].setValue(0)
      this.formValuePadre.controls['celular'].setValue(0)
    }
    console.log(this.formValuePadre.value.estado)
    console.log(this.formValueMadre.value.estado)
  }

  bloquedarCamposMadre(){

     if(this.formValueMadre.value.estado==0) {
      this.habilitarCampoMadre=true;
      this.formValueMadre.controls['vive'].setValue("2")
      this.formValueMadre.controls['tipoDocumento'].setValue("NO")
      this.formValueMadre.controls['identificacion'].setValue("N/A")
      this.formValueMadre.controls['nombres'].setValue("N/A")
      this.formValueMadre.controls['apellidos'].setValue("N/A")
      this.formValueMadre.controls['profesion'].setValue("N/A")
      this.formValueMadre.controls['dondeTrabaja'].setValue("N/A")
      this.formValueMadre.controls['cargo'].setValue("N/A")
      this.formValueMadre.controls['ingresoMensual'].setValue(1)
      this.formValueMadre.controls['correoElectronico'].setValue("N/A")
      this.formValueMadre.controls['direccion'].setValue("N/A")
      this.formValueMadre.controls['telefono'].setValue(1)
      this.formValueMadre.controls['celular'].setValue(1)
 
    }

     else if(this.formValueMadre.value.estado==1) {
      this.habilitarCampoMadre=false;
      this.formValueMadre.controls['vive'].setValue("")
      this.formValueMadre.controls['tipoDocumento'].setValue("")
      this.formValueMadre.controls['identificacion'].setValue("")
      this.formValueMadre.controls['nombres'].setValue("")
      this.formValueMadre.controls['apellidos'].setValue("")
      this.formValueMadre.controls['profesion'].setValue("")
      this.formValueMadre.controls['dondeTrabaja'].setValue("")
      this.formValueMadre.controls['cargo'].setValue("")
      this.formValueMadre.controls['ingresoMensual'].setValue(0)
      this.formValueMadre.controls['correoElectronico'].setValue("")
      this.formValueMadre.controls['direccion'].setValue("")
      this.formValueMadre.controls['telefono'].setValue(0)
      this.formValueMadre.controls['celular'].setValue(0)
    }

  
    console.log(this.formValuePadre.value.estado)
    console.log(this.formValueMadre.value.estado)
  }

  guardarFormularios(){
    if(this.formValueCanalReferencia.value.aceptaCompromisos =="" ){
      this.mensaje_error="El campo acepta los compromisos no puede estar vacio"
    }

    else if(this.formValueCanalReferencia.value.comoSabe =="" ){
      this.mensaje_error="El campo como sabe del colegio no puede estar vacio"
    }

    else if(this.formValueCanalReferencia.value.comoSeEntero =="" ){
      this.mensaje_error="El campo como se entero del colegio puede estar vacio"
    }

    else if(this.formValueCanalReferencia.value.porqueIngresar =="" ){
      this.mensaje_error="El campo por que desa ingresar no puede estar vacio"
    }

    else if(this.formValueCanalReferencia.value.nombreAcudiente =="" ){
      this.mensaje_error="El campo nombre de acudiente no puede estar vacio"
    }

    else{
      this.CrearEstudiante()
      Swal.fire(
        'Información enviada',
        '',
        'success'
       )
       setTimeout(() => {
          this.router.navigate(['/login-acudiente']);
        }, 1000);
    }
  }
  validarCanalReferencia(){
    if(this.formValueCanalReferencia.value.aceptaCompromisos==true){
      this.validadorTerminos=false
    }

    else if(this.formValueCanalReferencia.value.aceptaCompromisos==false){
      this.validadorTerminos=true
    }

    console.log(this.formValueCanalReferencia.value.aceptaCompromisos)
  }

  isEmailValid = (email:string) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
  };
  validateCelPhoneNumber(input_str:string) {
    var re = /^[0-9]{10}$/;
    return re.test(input_str);
  }

  validarCheckSi(){
  this.formValueDatosAdicionales.value.checkSi=false
  this.checkSi=this.formValueDatosAdicionales.value.checkSi
  this.validadorCheckNo= false
  this.validadorCheckHermano= false
  this.validadorBotonHermano= false
  }

  validarCheckNo(){
    this.formValueDatosAdicionales.value.checkNo=true
    this.checkSi=this.formValueDatosAdicionales.value.checkNo
    this.validadorCheckSi=false
    this.validadorCheckHermano= true
    this.validadorBotonHermano= true
    }

  AgregarOtroHermano(){
      this.validadorAgregarOtroHermano=!this.validadorAgregarOtroHermano
      console.log(this.validadorAgregarOtroHermano)
    }

  responsable(){

    if(this.formValueDatosAdicionales.value.responsable==1) {
      this.validadorResponsable= true
      this.formValueDatosAdicionales.controls['responsable'].setValue(1)
      this.formValueDatosAdicionales.controls['parentesco'].setValue("Padre")
      this.formValueDatosAdicionales.controls['nombres'].setValue(this.formValuePadre.value.nombres)
      this.formValueDatosAdicionales.controls['apellidos'].setValue(this.formValuePadre.value.apellidos)
      this.formValueDatosAdicionales.controls['vive'].setValue(this.formValuePadre.value.vive)
      this.formValueDatosAdicionales.controls['tipoDocumento'].setValue(this.formValuePadre.value.tipoDocumento)
      this.formValueDatosAdicionales.controls['identificacion'].setValue(this.formValuePadre.value.identificacion)
      this.formValueDatosAdicionales.controls['profesion'].setValue(this.formValuePadre.value.profesion)
      this.formValueDatosAdicionales.controls['dondeTrabaja'].setValue(this.formValuePadre.value.dondeTrabaja)
      this.formValueDatosAdicionales.controls['cargo'].setValue(this.formValuePadre.value.cargo)
      this.formValueDatosAdicionales.controls['ingresoMensual'].setValue(this.formValuePadre.value.ingresoMensual)
      this.formValueDatosAdicionales.controls['correoElectronico'].setValue(this.formValuePadre.value.correoElectronico)
      this.formValueDatosAdicionales.controls['direccion'].setValue(this.formValuePadre.value.direccion)
      this.formValueDatosAdicionales.controls['telefono'].setValue(this.formValuePadre.value.telefono)
      this.formValueDatosAdicionales.controls['celular'].setValue(this.formValuePadre.value.celular)
    }

    if (this.formValueDatosAdicionales.value.responsable==2) {
      this.validadorResponsable= true
      this.formValueDatosAdicionales.controls['responsable'].setValue(2)
      this.formValueDatosAdicionales.controls['parentesco'].setValue("Madre")
      this.formValueDatosAdicionales.controls['nombres'].setValue(this.formValueMadre.value.nombres)
      this.formValueDatosAdicionales.controls['apellidos'].setValue(this.formValueMadre.value.apellidos)
      //this.formValueDatosAdicionales.controls['estado'].setValue(this.formValueMadre.value.estado)
      this.formValueDatosAdicionales.controls['vive'].setValue(this.formValueMadre.value.vive)
      this.formValueDatosAdicionales.controls['tipoDocumento'].setValue(this.formValueMadre.value.tipoDocumento)
      this.formValueDatosAdicionales.controls['identificacion'].setValue(this.formValueMadre.value.identificacion)
      this.formValueDatosAdicionales.controls['profesion'].setValue(this.formValueMadre.value.profesion)
      this.formValueDatosAdicionales.controls['dondeTrabaja'].setValue(this.formValueMadre.value.dondeTrabaja)
      this.formValueDatosAdicionales.controls['cargo'].setValue(this.formValueMadre.value.cargo)
      this.formValueDatosAdicionales.controls['ingresoMensual'].setValue(this.formValueMadre.value.ingresoMensual)
      this.formValueDatosAdicionales.controls['correoElectronico'].setValue(this.formValueMadre.value.correoElectronico)
      this.formValueDatosAdicionales.controls['direccion'].setValue(this.formValueMadre.value.direccion)
      this.formValueDatosAdicionales.controls['telefono'].setValue(this.formValueMadre.value.telefono)
      this.formValueDatosAdicionales.controls['celular'].setValue(this.formValueMadre.value.celular)
    }

    if (this.formValueDatosAdicionales.value.responsable==3) {

      this.validadorResponsable= false
      this.formValueDatosAdicionales.controls['responsable'].setValue(3)
      this.formValueDatosAdicionales.controls['parentesco'].setValue("Acudiente")
      this.formValueDatosAdicionales.controls['nombres'].setValue("")
      this.formValueDatosAdicionales.controls['apellidos'].setValue("")
      //this.formValueDatosAdicionales.controls['estado'].setValue("")
      this.formValueDatosAdicionales.controls['vive'].setValue("")
      this.formValueDatosAdicionales.controls['tipoDocumento'].setValue("")
      this.formValueDatosAdicionales.controls['identificacion'].setValue("")
      this.formValueDatosAdicionales.controls['profesion'].setValue("")
      this.formValueDatosAdicionales.controls['dondeTrabaja'].setValue("")
      this.formValueDatosAdicionales.controls['cargo'].setValue("")
      this.formValueDatosAdicionales.controls['ingresoMensual'].setValue("")
      this.formValueDatosAdicionales.controls['correoElectronico'].setValue("")
      this.formValueDatosAdicionales.controls['direccion'].setValue("")
      this.formValueDatosAdicionales.controls['telefono'].setValue("")
      this.formValueDatosAdicionales.controls['celular'].setValue("")
    }
   
    console.log(this.formValueDatosAdicionales.value.responsable)
  }
  
  responsableFacturacion(){

    if(this.formValueDatosAdicionalesResponsable.value.responsable==1) {
      this.validadorResponsableFacturacion= true
      this.parentesco= "Padre"
      this.formValueDatosAdicionalesResponsable.controls['responsable'].setValue(1)
      this.formValueDatosAdicionalesResponsable.controls['tipoDocumento'].setValue(this.formValuePadre.value.tipoDocumento)
      this.formValueDatosAdicionalesResponsable.controls['identificacion'].setValue(this.formValuePadre.value.identificacion)
      this.formValueDatosAdicionalesResponsable.controls['pais'].setValue(this.formValuePadre.value.pais)
      this.formValueDatosAdicionalesResponsable.controls['departamento'].setValue(this.formValuePadre.value.departamento)
      this.formValueDatosAdicionalesResponsable.controls['correoElectronico'].setValue(this.formValuePadre.value.correoElectronico)
      this.formValueDatosAdicionalesResponsable.controls['direccion'].setValue(this.formValuePadre.value.direccion)
      this.formValueDatosAdicionalesResponsable.controls['celular'].setValue(this.formValuePadre.value.celular)
    }

    if (this.formValueDatosAdicionalesResponsable.value.responsable==2) {
      this.validadorResponsableFacturacion= true
      this.parentesco= "Madre"
      this.formValueDatosAdicionalesResponsable.controls['responsable'].setValue(2)
      this.formValueDatosAdicionalesResponsable.controls['tipoDocumento'].setValue(this.formValueMadre.value.tipoDocumento)
      this.formValueDatosAdicionalesResponsable.controls['identificacion'].setValue(this.formValueMadre.value.identificacion)
      this.formValueDatosAdicionalesResponsable.controls['pais'].setValue(this.formValueMadre.value.pais)
      this.formValueDatosAdicionalesResponsable.controls['departamento'].setValue(this.formValueMadre.value.departamento)
      this.formValueDatosAdicionalesResponsable.controls['correoElectronico'].setValue(this.formValueMadre.value.correoElectronico)
      this.formValueDatosAdicionalesResponsable.controls['direccion'].setValue(this.formValueMadre.value.direccion)
      this.formValueDatosAdicionalesResponsable.controls['celular'].setValue(this.formValueMadre.value.celular)
    }

    if (this.formValueDatosAdicionalesResponsable.value.responsable==3) {
      this.validadorResponsableFacturacion= false
      this.parentesco= "Acudiente"
      this.formValueDatosAdicionalesResponsable.controls['responsable'].setValue(3)
      this.formValueDatosAdicionalesResponsable.controls['tipoDocumento'].setValue("")
      this.formValueDatosAdicionalesResponsable.controls['identificacion'].setValue("")
      this.formValueDatosAdicionalesResponsable.controls['pais'].setValue("")
      this.formValueDatosAdicionalesResponsable.controls['departamento'].setValue("")
      this.formValueDatosAdicionalesResponsable.controls['correoElectronico'].setValue("")
      this.formValueDatosAdicionalesResponsable.controls['direccion'].setValue("")
      this.formValueDatosAdicionalesResponsable.controls['celular'].setValue("")
    }
   
  }

  cerrarAlerta(){
    this.mensaje_error=""
  }

}


