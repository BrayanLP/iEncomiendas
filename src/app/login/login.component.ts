import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../../app/services/firebase/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  // email = null;
  constructor(
    public authData: FirebaseService,
    public router:Router
  ){
    // this.login();

  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      correo: new FormControl(''),
      contra: new FormControl('', Validators.minLength(6)),
    });
  }

  login(){
    let c=  this.loginForm.value.correo;
    let p=  this.loginForm.value.contra;
    this.authData.login(c,p)
    .then( data =>{
      console.log(data,'ingresaste');
      this.router.navigate(['/']);
    })
    .catch( error =>{
      console.log(error);
    });
  }

}
