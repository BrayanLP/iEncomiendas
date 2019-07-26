import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../../services/firebase/firebase.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class VentasRegistrarComponent implements OnInit {
  ventasForm: FormGroup;
  pagarForm: FormGroup;
  listado:any = [];
  temp_data:any = [];
  can:number;
  pre:number;
  cli:string;
  tip:string;
  uid:any;
  email:string;
  total= 0;
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

  }

  ngOnInit(){
    this.ventasForm = new FormGroup({
      tipo_producto: new FormControl(''),
      cliente: new FormControl(''),
      cantidad: new FormControl(''),
      precio_venta: new FormControl('')
    });
    this.pagarForm = new FormGroup({
      cantidad: new FormControl('')
    });
  }


  preRegistro(){
    this.tip = this.ventasForm.value.tipo_producto;
    this.cli = this.ventasForm.value.cliente;
    this.can = parseFloat(this.ventasForm.value.cantidad);
    this.pre = parseFloat(this.ventasForm.value.precio_venta);

    let obj = {};
    let data = {
      'cantidad': this.can,
      'fecha_venta': Date(),
      'precio_compra': this.pre,
      'cliente':{
        'codigo': 'cli_002',
        'nombre': 'pepe sac',
        'ruc': '99999'
      },
      'usuario':{
        'codigo': this.uid,
        'nombre': this.email
      }
    }

    this.temp_data.push(data);
    this.temp_data.reverse();
    this.getTotal();
    this.limpiarCampos();

  }

  getTotal(){
    this.total = 0;
    this.temp_data.forEach(element => {
      this.total += element.cantidad * element.precio_compra;
    });
  }
  registrar(){
    if(this.temp_data.length > 0){
      this.temp_data.forEach(element => {
        this.authData.create('ventas',element);
      });
    }
  }

  eliminar(i){
    this.temp_data.splice(i,1);
    this.getTotal();
  }

  pagar(){
    let c = parseFloat(this.pagarForm.value.cantidad);
    if( c >= this.total){
      this.registrar();
      let resultado = c - this.total;
      console.log("tu vuelto es: "+ resultado);
      this.temp_data = [];
    }
    else{
      console.log("la venta no se puede procesar");
    }
  }

  limpiarCampos(){
    this.ventasForm.setValue({
      tipo_producto: '',
      cliente: '',
      cantidad: '',
      precio_venta: ''
    });
  }
}
