import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData = new BehaviorSubject(null)


  saveUserData() {
    let encodedData = JSON.stringify(sessionStorage.getItem('userToken'))
    this.userData.next(jwtDecode(encodedData))
    console.log(this.userData);

  }
  constructor(public _HttpClient: HttpClient, public _Router: Router) {
    if (sessionStorage.getItem('userToken') != null) {
      this.saveUserData()
    }


  }



  register(formdata: object): Observable<any> {
    return this._HttpClient.post(`https://route-egypt-api.herokuapp.com/signup`, formdata)
  }



  login(formdata: object): Observable<any> {
    return this._HttpClient.post(`https://route-egypt-api.herokuapp.com/signin`, formdata)
  }

  logout() {
    sessionStorage.removeItem('userToken')
    this.userData.next(null)
    this._Router.navigate(['/login'])

  }



  saveNote(formdata: object): Observable<any> {
    return this._HttpClient.post(`https://route-egypt-api.herokuapp.com/addNote`, formdata)
  }

  getnotes(header: object): Observable<any> {
    return this._HttpClient.get(`https://route-egypt-api.herokuapp.com/getUserNotes`, header)
  }

  deleteNote(dataofnote: any): Observable<any> {


    let httpOptions = {
      headers: new HttpHeaders({
      }),
      body: {
        NoteID: dataofnote.NoteID,
        token: dataofnote.token
      }

    }

    return this._HttpClient.delete(`https://route-egypt-api.herokuapp.com/deleteNote`, httpOptions)
  }





  Updatanotes(newdate: object): Observable<any> {
    return this._HttpClient.put(`https://route-egypt-api.herokuapp.com/updateNote`, newdate)
  }

}
