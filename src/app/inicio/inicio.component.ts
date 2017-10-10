import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../services/firebase/firebase.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  // user = null;
  nuevoNegocioForm: FormGroup;
  actualizarNegocioForm: FormGroup;
  uid:any;
  negocios:any = [];
  constructor(
    public authData: FirebaseService,
    public router: Router
  ){
    this.authData.getAuthState().subscribe(
      (user) => {
      if(user){
        this.uid = user.uid;
        this.listarNegocio(this.uid);
      }
    });
  }

  ngOnInit() {
    this.nuevoNegocioForm = new FormGroup({
      nombre: new FormControl('')
    });
    this.actualizarNegocioForm = new FormGroup({
      nombre: new FormControl(''),
      key: new FormControl('')
    });
    // this.authData.getAuthState()
    //   .subscribe( (user) =>
    //     this.user = user
    //     // console.log(user)
    // );
  }

  crearNegocio(){
    if(this.negocios.length <= 1){

      let obj = {};
      let nombre = this.nuevoNegocioForm.value.nombre;
      let data = {
        'nombre': nombre
      }
      let key = this.authData.key('empresas');
      obj['/empresas/'+ key] = data;
      obj['/usuarios/'+ this.uid +'/empresas/'+key] = data;
      this.authData.update(obj);
      this.nuevoNegocioForm.setValue({nombre:''});

    }
    else{
      console.log("no se puee crear mas negocios");
    }
  }

  listarNegocio(uid){
    this.authData.get('/usuarios/'+ uid +'/empresas/').on('value', snap => {
      let data = snap.val();
      console.log(data);
      this.negocios = [];
      if(data != undefined){
        Object.keys(data).forEach(res =>{
          let obj = {
            'nombre': data[res].nombre,
            'uid': res
          };
          // this.router.navigate(['/'+obj.uid]);
          console.log(obj);
          this.negocios.push(obj);
        })

      }
    })
  }
  actualizarNegocio(){
    let obj = {};
    let nombre = this.actualizarNegocioForm.value.nombre;
    let key = this.actualizarNegocioForm.value.key;
    console.log(key,nombre,this.actualizarNegocioForm.value.key);
    let data = {
      'nombre': nombre
    }
    obj['/empresas/'+ key] = data;
    obj['/usuarios/'+ this.uid +'/empresas/'+key] = data;
    this.authData.update(obj);
    // this.nuevoNegocioForm.setValue({nombre:''});
  }

  eliminar(id){
    console.log(id);
    let obj = {};
    let data = {};
    obj['empresas/'+ id] = data;
    obj['usuarios/' + this.uid + '/empresas/'+ id] = data;
    console.log(obj);
    this.authData.eliminar('empresas/'+ id);
    this.authData.eliminar('usuarios/' + this.uid + '/empresas/'+ id);
  }
}
