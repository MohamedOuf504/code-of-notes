import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import jwtDecode from 'jwt-decode';
import { HttpHeaders } from '@angular/common/http';

declare var $: any;


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private _AuthService: AuthService, private _Router: Router) { }
  allNotes: any = []
  currentId : string= ''
  token: any;
  decoded: any;

  noteData: FormGroup = new FormGroup({
    title: new FormControl(null),
    desc: new FormControl(null),
  })


  ngOnInit(): void {
    this.token = sessionStorage.getItem("userToken");
    this.decoded = jwtDecode(this.token);
    this.getAllnote()

  }


//---------------------------------------------------------------------------
//---------------------------------------------------------------------------
  submitnote(noteDataa: FormGroup) {
    let allDate = {
      title: this.noteData.value.title,
      desc: this.noteData.value.desc,
      userID: this.decoded._id,
      token: this.token,
    }
    this._AuthService.saveNote(allDate).subscribe((response) => {
      if (response.message == "success") {
        this.getAllnote();
        this.noteData.reset();
        $('#staticBackdrop').modal("hide")
      }
      else {
        alert("Error")
      }
    })
  }

//---------------------------------------------------------------------------
//---------------------------------------------------------------------------

  getAllnote() {
    const httpOptions = {
      headers: new HttpHeaders({
        userid: this.decoded._id,
        token: this.token,
      })

    }
    this._AuthService.getnotes(httpOptions).subscribe((res) => {
      this.allNotes = res.Notes

    })

  }


//---------------------------------------------------------------------------
//---------------------------------------------------------------------------

  deletNote(id: any) {

    let dateOfnote = {
      NoteID: id,
      token: this.token,
    }
    this._AuthService.deleteNote(dateOfnote).subscribe((res) => {
      console.log(res)
      if (res.message == 'deleted') {
        $('#exampleModal').modal("hide")

        this.getAllnote()
      }
      else {
        sessionStorage.clear()
        this._Router.navigate(['login'])
      }

    })
  }

//---------------------------------------------------------------------------
//---------------------------------------------------------------------------

  upDatanote: FormGroup = new FormGroup({
    title: new FormControl(null),
    desc: new FormControl(null),
  })

  editNote(titlt: string, desc: string, id :string) {
    this.upDatanote.controls.title.setValue(titlt)
    this.upDatanote.controls.desc.setValue(desc)
    this.currentId= id
  }
  updateNote(upDatanote :FormGroup ) {
    let newDate = {
      title: this.upDatanote.value.title,
      desc: this.upDatanote.value.desc,
      NoteID: this.currentId,
      token: this.token,
    }

    this._AuthService.Updatanotes(newDate).subscribe((res) => {
      if (res.message == 'updated')
      {
        this.getAllnote();

        $('#edit').modal("hide")
        this.noteData.reset();
      }



    })
  }



//---------------------------------------------------------------------------
//---------------------------------------------------------------------------



}
