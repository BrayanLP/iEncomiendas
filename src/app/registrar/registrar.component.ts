import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../../app/services/firebase/firebase.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {
  registrarForm: FormGroup;
  constructor(
    public authData: FirebaseService
  ){

  }

  ngOnInit() {
    this.registrarForm = new FormGroup({
      correo: new FormControl(''),
      contra: new FormControl('', Validators.minLength(6)),
    });
  }

  registrar(){
    let c=  this.registrarForm.value.correo;
    let p=  this.registrarForm.value.contra;
    this.authData.registrar(c,p)
    .then( data =>{
      console.log(data,'ingresaste');
      // this.email = data.email;
    })
    .catch( error =>{
      console.log(error);
    });
  }

}
