import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( public _AuthService:AuthService , public _Router :Router) { }




  ngOnInit(): void {
  }


  error: string = ''

  logInForm: FormGroup = new FormGroup({

    email: new FormControl(null, [Validators.required, Validators.email]),

    password: new FormControl(null, [Validators.required, Validators.pattern(`^[A-z][0-9]{4,8}$`)]),

  })

  submitlogInForm(logInForm:FormGroup) {
    if (logInForm.valid)
    {
      this._AuthService.login(logInForm.value).subscribe((response) => {
        if (response.message == 'success')
        {
          sessionStorage.setItem('userToken', response.token)
          this._AuthService.saveUserData()
          this._Router.navigate(['home'])
        }
        else
        {
          this.error = response.message;
        }
      })
    }

  }

}
