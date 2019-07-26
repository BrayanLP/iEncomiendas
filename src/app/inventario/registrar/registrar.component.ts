import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/take';
import {Router,ActivatedRoute, Params } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../../services/firebase/firebase.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class InventarioRegistrarComponent implements OnInit {
  inventarioForm: FormGroup;
  temp_data:any = [];
  uid:any;
  email:any;
  uidParams:any;
  constructor(
    public authData: FirebaseService,
    private route: ActivatedRoute
  ){
    console.log(this.uidParams);
    this.route.params.take(1).subscribe((params: any) => {
      console.log(params);
      this.uidParams = params['id'];
    });
  }

  ngOnInit(){
    this.inventarioForm = new FormGroup({
      nombre: new FormControl(''),
      cantidad: new FormControl(''),
      precio: new FormControl('')
    });
  }

  preRegistro(){
    let nom = this.inventarioForm.value.nombre;
    let can = parseFloat(this.inventarioForm.value.cantidad);
    let pre = parseFloat(this.inventarioForm.value.precio);

    let obj = {};
    let data = {
      'cantidad': can,
      'nombre': nom,
      'fecha_registro': Date(),
      'precio': pre
    }
    this.temp_data.push(data);
    this.temp_data.reverse();
    this.limpiarCampos();
  }

  limpiarCampos(){
    this.inventarioForm.setValue({
      nombre: '',
      cantidad: '',
      precio: ''
    });
  }
  registrar(){
    if(this.temp_data.length > 0){
      this.temp_data.forEach(element => {
        this.authData.create('inventario/'+this.uidParams,element);
      });
      this.temp_data = [];
    }
  }

}
