import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../../app/services/firebase/firebase.service';
// import { AppComponent } from '../../app/app.component';
// import { ColaboradoresPipe } from '../pipe/colaboradores.pipe'
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  AgregarUsuarioForm: FormGroup;
  usuarios:any = [];
  colaboradores:any = [];
  uid:any;
  email:any;
  constructor(
    public authData: FirebaseService,
  ){
    this.authData.getAuthState().subscribe(
      (user) => {
      if(user){
        this.uid = user.uid;
        this.email = user.email;
        this.getColaboradores(this.uid);
      }
      else{
      }
    });
  }

  ngOnInit() {
    this.AgregarUsuarioForm = new FormGroup({
      correo: new FormControl('')
    });
  }

  registrarColaborador(){
    let c =  this.AgregarUsuarioForm.value.correo;
    // console.log(this.colaboradores);
    if(this.colaboradores.length > 0){
      this.colaboradores.forEach(element => {
        if( element.email === c){
          console.log("usaurio ya esta añadido");
        }
        else{
          this.logicaColaboradores(c);
        }
      });
    }
    else{
      this.logicaColaboradores(c);
    }

  }

  logicaColaboradores(c){
    this.authData.getUsers().on("value", snap =>{
      let data = snap.val();
      if(data != null){
        Object.keys(data).forEach( (res) =>{
          if(this.email === c){
            console.log("el administrador no se puede volver a añadir");
          }
          else if( data[res].email === c ){
            let obj = {};
            obj['/empleados/' + this.uid +"/"+ res] = data[res];
            this.authData.update(obj);
            console.log(c,"usuario añadido");
          }
        });
      }
    })
  }

  getColaboradores(uid){
    this.authData.getColaboradores(uid).on("value", snap =>{
      let data = snap.val();
      this.colaboradores = [];
      if( data != undefined){
        Object.keys(data).forEach( res =>{
          let obj = {
            'uid': res,
            'nombre': data[res].nombre,
            'email': data[res].email
          };
          this.colaboradores.push(obj);
        });
      }
    });
  }

  eliminar(id){
    let obj = {};
    obj = '/empleados/' + this.uid +"/"+ id;
    this.authData.eliminar(obj)
      .then( data => {
        console.log("eliminado correctamente");
      })
      .catch( err => {
        console.log(err);
      });
  }

}
