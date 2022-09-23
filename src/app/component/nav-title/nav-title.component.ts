import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-title',
  templateUrl: './nav-title.component.html',
  styleUrls: ['./nav-title.component.css']
})
export class NavTitleComponent implements OnInit {
  @Input()
  public navTitle:any
  constructor() { }

  ngOnInit(): void {

  }

}
