import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import Data from 'src/assets/json/services.json';

@Component({
  selector: 'app-services-index',
  templateUrl: './services-index.component.html',
  styleUrls: ['./services-index.component.css']
})
export class ServicesIndexComponent implements OnInit {

  data: any = Data;
  public navTitle:any
  public name: any;
  constructor(private userService:UserService,) {this.name= this.userService.getName(); }

  ngOnInit(): void {
    this.navTitle="Estoy en inicio"
  }

}
