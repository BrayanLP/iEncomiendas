import { Component, Input } from '@angular/core';
import { MzBaseModal } from 'ng2-materialize';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../../../../services/firebase/firebase.service';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent extends MzBaseModal {
  EditForm: FormGroup;
  @Input() edit: any;

  constructor(
    public authData: FirebaseService,
  ){
    super();
  }
  ngOnInit() {
    this.EditForm = new FormGroup({
      nombre: new FormControl(''),
      cantidad: new FormControl(''),
      precio: new FormControl(''),
      uid: new FormControl(''),
      id: new FormControl('')
    });
  }
  actualizar(){
    let uid = this.edit.uid;
    let id = this.edit.id;
    let n = this.EditForm.value.nombre;
    let p = this.EditForm.value.precio;
    let c = this.EditForm.value.cantidad;

    if(
      this.EditForm != undefined
    ){
      let obj = {};
      obj["/inventario/"+uid+"/"+id+"/nombre"] = n;
      obj["/inventario/"+uid+"/"+id+"/precio"] = p;
      obj["/inventario/"+uid+"/"+id+"/cantidad"] = c;
      obj["/inventario/"+uid+"/"+id+"/fecha_actualizacion"] = Date();
      this.authData.update(obj);

    }
  }
}
