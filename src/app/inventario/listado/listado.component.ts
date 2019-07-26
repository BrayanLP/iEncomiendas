import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/take';
import {Router,ActivatedRoute, Params } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../../services/firebase/firebase.service';

import { MzModalService } from 'ng2-materialize';

import { EditComponent } from './modal/edit/edit.component';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class InventarioListadoComponent implements OnInit {
  comprasForm: FormGroup;
  EditForm: FormGroup;
  listado:any = [];
  uidParams:any;


  constructor(
    public authData: FirebaseService,
    private route: ActivatedRoute,
    private modalService: MzModalService
  ){
    this.route.params.take(1).subscribe((params: any) => {
      this.uidParams = params['id'];
    });
    this.getCompras();
  }

  ngOnInit() {
  }
  getCompras(){
    this.authData.get("/inventario/"+this.uidParams).on("value", snap =>{
      this.listado = [];
      let data = snap.val();
      if(data != null){
        Object.keys(data).forEach( res =>{
          let obj = {
            'nombre': data[res].nombre,
            'cantidad': data[res].cantidad,
            'precio': data[res].precio,
            'uid': res
          }
          this.listado.push(obj);
        })
        this.listado.reverse();
      }
    })
  }

  abrirModal(id){
    let obj = {};
    this.authData.get("/inventario/"+this.uidParams+"/"+id).on("value", snap =>{
      let data = snap.val();
      obj = {
        nombre: data.nombre,
        cantidad: data.cantidad,
        precio: data.precio,
        uid: this.uidParams,
        id: id
      }
    })
    this.modalService.open(EditComponent, { edit: obj });
  }

  eliminar(id){
    this.authData.eliminar("/inventario/"+this.uidParams+"/"+id);
  }

}
