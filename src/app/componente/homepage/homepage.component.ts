import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  public navTitle:any
  public name: any;
  constructor(private userService:UserService,) {this.name= this.userService.getName(); }

  ngOnInit(): void {
    this.navTitle="Estoy en inicio"
  }

}
