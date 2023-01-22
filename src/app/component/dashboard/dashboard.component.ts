import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import Swal from'sweetalert2';
import * as $ from 'jquery'
import { BolsilloService } from 'src/app/services/bolsillo.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  public navTitle:any
  public token:any
  public name: any;
  public role: any;
  public bolsillo: any;

  constructor(
    private loginService:LoginService,
    private userService:UserService,
    private bolsilloService:BolsilloService,
    private router:Router)
   {
    this.token= this.loginService.getToken();
    this.name= this.userService.getName();
    this.role= this.userService.getRol();  
    this.bolsillo= localStorage.getItem('bolsillo');
   }
   
  ngOnInit(): void {
    this.jquery();
    this.sessionValidation();
    this.navTitle="Estoy en dash " + this.name
    this.bolsillo= localStorage.getItem('bolsillo');
    
    setInterval(()=>{let val= this.checkBolsillo();this.bolsillo = ((val!=undefined)?val:localStorage.getItem('bolsillo'))},500);

  }

  sessionValidation(){
    if(this.token){

    }
    else{
      this.router.navigate([''])
    }
  }
  checkBolsillo(){
     this.bolsilloService.getCant(localStorage.getItem('idAcudiente')).subscribe(response=>{
      this.bolsillo = response.resp
      localStorage.setItem('bolsillo',this.bolsillo)
    },error=>{

    });
  }
  SignOff(){

    localStorage.removeItem('token');
    localStorage.removeItem('idRole');
    localStorage.removeItem('usuario');
    localStorage.removeItem('id');
    localStorage.removeItem('bolsillo');

    Swal.fire(
      'Has cerrado sesión correctamente!',
     )

    this.router.navigate([''])

  }

  jquery() {

    (function($) {
      "use strict"; // Start of use strict
      // Toggle the side navigation
      $("#sidebarToggle, #sidebarToggleTop").on('click', function(e) {
        $("body").toggleClass("sidebar-toggled");
        $(".sidebar").toggleClass("toggled");
        if ($(".sidebar").hasClass("toggled")) {
          ($('.sidebar .collapse')as any).collapse('hide');
        };
      });

      // Close any open menu accordions when window is resized below 768px
      $(window).resize(function() {
        if (($(window)as any).width() < 768) {
          ($('.sidebar .collapse')as any).collapse('hide');
        };

        // Toggle the side navigation when window is resized below 480px
        if (($(window)as any).width() < 480 && !$(".sidebar").hasClass("toggled")) {
          $("body").addClass("sidebar-toggled");
          $(".sidebar").addClass("toggled");
          ($('.sidebar .collapse')as any).collapse('hide');
        };
      });

      // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
      $('body.fixed-nav .sidebar').on('mousewheel DOMMouseScroll wheel', function(e) {
        if (($(window)as any).width() > 768) {
          var e0 = (e.originalEvent) as any,
          delta = e0.wheelDelta || -e0.detail;
          this.scrollTop += (delta < 0 ? 1 : -1) * 30;
          e.preventDefault();
        }
      });

      // Scroll to top button appear
      $(document).on('scroll', function() {
        var scrollDistance = ($(this)as any).scrollTop();
        if (scrollDistance > 100) {
          $('.scroll-to-top').fadeIn();
        } else {
          $('.scroll-to-top').fadeOut();
        }
      });

      // Smooth scrolling using jQuery easing
      $(document).on('click', 'a.scroll-to-top', function(e) {
        var $anchor = $(this);
        $('html, body').stop().animate({
          scrollTop: ((<any>$($anchor).attr('href')).offset().top)
        }, 1000, 'easeInOutExpo');
        e.preventDefault();
      });

    })(jQuery); // End of use strict
 }

}
