import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import Data from 'src/assets/json/home.json';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  data: any = Data;
  public navTitle:any
  public name: any;
  public role: any;

  constructor(private userService:UserService,) {
    this.name= this.userService.getName(); 
    this.role= this.userService.getRol();}

  ngOnInit(): void {
    this.navTitle="Estoy en inicio"
  }

}
