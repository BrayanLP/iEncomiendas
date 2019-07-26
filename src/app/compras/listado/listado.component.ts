import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/take';
import {Router,ActivatedRoute, Params } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../../services/firebase/firebase.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ComprasListadoComponent implements OnInit {
  comprasForm: FormGroup;
  pagarForm: FormGroup;
  listado:any = [];
  uid:any;
  email:string;
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
        this.getCompras();
      }
      else{
      }
    });
  }

  ngOnInit() {
  }

  getCompras(){
    this.authData.get("/compras/"+this.uidParams).orderByChild("fecha_venta").on("value", snap =>{
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
