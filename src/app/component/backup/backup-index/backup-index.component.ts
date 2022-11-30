import { Component, OnInit } from '@angular/core';
import { StudentDatabase } from 'src/app/models/studentDatabase.model';
import { StudentDatabaseService } from 'src/app/services/student-database.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import * as XLSX from 'xlsx';
import Swal from'sweetalert2';

@Component({
  selector: 'app-backup-index',
  templateUrl: './backup-index.component.html',
  styleUrls: ['./backup-index.component.css']
})
export class BackupIndexComponent implements OnInit {

  name = 'ExcelSheet.xlsx';
  navTitle="Copias de seguridad"
  grade !: any;
  formValue !:FormGroup
  public dataStudentDatabase:any
  public filter:any;
  public filterText:any;
  studentDatabaseModel:StudentDatabase = new StudentDatabase();
  id !: any;
  constructor(
    private formBuilder:FormBuilder,
    private StudentDatabaseService:StudentDatabaseService,
    private loginService:LoginService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.listarCriterio()
  }

  listarCriterio(){
    this.StudentDatabaseService.listStudentDatabaseTipo("Desertor")
    .subscribe(res=>{
      this.dataStudentDatabase=res.result
      console.log(res.result)
    })
  }

  exportToExcel(): void {
    let element = document.getElementById('season-tble');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'Sheet1');

    XLSX.writeFile(book, this.name);
  }

}
