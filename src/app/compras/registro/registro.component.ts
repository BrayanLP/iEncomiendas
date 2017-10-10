import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/take';
import {Router,ActivatedRoute, Params } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../../services/firebase/firebase.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class ComprasRegistroComponent implements OnInit {
  comprasForm: FormGroup;
  pagarForm: FormGroup;
  temp_data:any = [];
  productos:any = [];
  uid:any;
  email:string;
  uidNegocio:any;
  total= 0;
  uidParams:any;
  constructor(
    public authData: FirebaseService,
    private route: ActivatedRoute,
  ){
    this.authData.getAuthState().subscribe(
      (user) => {
      if(user){
        this.uid = user.uid;
        this.email = user.email;
        this.route.params.take(1).subscribe((params: any) => {
          this.uidParams = params['id'];
        });
        this.getProductos();
      }
      else{
      }
    });
  }

  ngOnInit(){
    this.comprasForm = new FormGroup({
      tipo_producto: new FormControl(''),
      cliente: new FormControl(''),
      cantidad: new FormControl(''),
      precio_venta: new FormControl('')
    });
    this.pagarForm = new FormGroup({
      cantidad: new FormControl('')
    });
  }
  getTotal(){
    this.total = 0;
    this.temp_data.forEach(element => {
      this.total += element.cantidad * element.precio_compra;
    });
  }

  eliminar(i){
    this.temp_data.splice(i,1);
    this.getTotal();
  }

  getClientes(){
    this.authData.get("/clientes/"+this.uidParams+"/"+this.uidNegocio).on("value", snap =>{
      this.productos = [];
      let data = snap.val();
      if(data != null){
        Object.keys(data).forEach( res =>{
          let obj = {
            'nombre': data[res].nombre,
            'uid': res
          }
          this.productos.push(obj);
        })
        this.productos.reverse();
      }
    })
  }

  preRegistro(){
    let tip = this.comprasForm.value.tipo_producto;
    let cli = this.comprasForm.value.cliente;
    let can = parseFloat(this.comprasForm.value.cantidad);
    let pre = parseFloat(this.comprasForm.value.precio_venta);
    let cod = tip.split('||')[0];
    let nom = tip.split('||')[1];

    // console.log(cod);
    let obj = {};
    let data = {
      'codigo_producto': cod,
      'nombre': nom,
      'cantidad': can,
      'fecha_venta': Date(),
      'precio_compra': pre,
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
  limpiarCampos(){
    this.comprasForm.setValue({
      tipo_producto: '',
      cliente: '',
      cantidad: '',
      precio_venta: ''
    });
  }
  registrar(){
    if(this.temp_data.length > 0){
      this.temp_data.forEach(element => {
        console.log(element);
        this.authData.get("/inventario/"+this.uidParams+"/"+element.codigo_producto).once("value", snap =>{
          let data = snap.val();
          let obj = {};
          obj["/inventario/"+this.uidParams+"/"+ element.codigo_producto + "/cantidad" ] = data.cantidad + element.cantidad;
          this.authData.update(obj);
          this.authData.create('compras/'+this.uidParams,element);
        });
      });
    }
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
  getProductos(){
    this.authData.get("/inventario/"+this.uidParams).on("value", snap =>{
      this.productos = [];
      let data = snap.val();
      if(data != null){
        Object.keys(data).forEach( res =>{
          let obj = {
            'nombre': data[res].nombre,
            'uid': res
          }
          this.productos.push(obj);
        })
        this.productos.reverse();
      }
    })
  }

}
