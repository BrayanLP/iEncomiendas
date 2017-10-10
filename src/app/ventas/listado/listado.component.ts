import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../../services/firebase/firebase.service';
@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class VentasListadoComponent implements OnInit {
  ventasForm: FormGroup;
  listado:any = [];
  temp_data:any = [];
  can:number;
  pre:number;
  cli:string;
  tip:string;
  uid:any;
  email:string;
  constructor(
    public authData: FirebaseService,
  ){
    this.authData.getAuthState().subscribe(
      (user) => {
      if(user){
        this.uid = user.uid;
        this.email = user.email;
      }
      else{
      }
    });
    this.getVentas();
  }

  ngOnInit(){
    this.ventasForm = new FormGroup({
      tipo_producto: new FormControl(''),
      cliente: new FormControl(''),
      cantidad: new FormControl(''),
      precio_venta: new FormControl('')
    });
  }
  getVentas(){
    this.authData.get("/ventas").orderByChild("fecha_venta").on("value", snap =>{
      console.log(snap.val());
      this.listado = [];
      let data = snap.val();
      if(data != null){
        Object.keys(data).forEach( res =>{
          this.listado.push(data[res]);
        })
        this.listado.reverse();
      }
    })
  }


}
