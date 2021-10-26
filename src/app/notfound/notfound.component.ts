import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
Router
@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.css']
})
export class NotfoundComponent implements OnInit {

  constructor(private _Router:Router) { }

  ngOnInit(): void {

  }
  back()
  {
    this._Router.navigate(["home"])
  }
}
