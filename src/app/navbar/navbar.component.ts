import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  islogin: boolean = false;
  constructor(private _AuthService: AuthService, public _Router: Router) { }
  myStyle: object = {};
  myParams: object = {};
  width: number = 100;
  height: number = 100;
  userDate: any = {}
  ngOnInit(): void {
    this._AuthService.userData.subscribe(() => {
      if (this._AuthService.userData.getValue() != null) {
        this.islogin = true;
       this.userDate = this._AuthService.userData.value

      }
      else {
        this.islogin = false;
      }
    });


    this.myStyle = {
      'position': 'fixed',
      'width': '100%',
      'height': '100%',
      'z-index': -1,
      'top': 0,
      'left': 0,
      'right': 0,
      'bottom': 0,
    };

    this.myParams = {
      particles: {
        number: {
          value: 80,
        },
        color: {
          value: '#ff0005'
        },
        shape: {
          type: 'circle',
        },
        size: {
          value: 5,
        },
      }
    };
  }
  logOut() {
    sessionStorage.removeItem('userToken');
    this._AuthService.userData.next(null);
    this._Router.navigate(['/login']);

  }
}
