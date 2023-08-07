import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gestion-documentos',
  templateUrl: './gestion-documentos.component.html',
  styleUrls: ['./gestion-documentos.component.css']
})
export class GestionDocumentosComponent implements OnInit {

  navTitle="Gestión de Documentos";
  content = '';
  
  constructor() { }

  ngOnInit(): void {
    
  }

}




