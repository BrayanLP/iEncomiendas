import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
// import { FirebaseListObservable } from 'angularfire2/database/observable/';

import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FirebaseService {
  // user: Observable<firebase.User>;
  authState: Observable<firebase.User>
  currentUser: firebase.User = null;
  uid: any;

  constructor(
    private afAuth: AngularFireAuth,
    public af: AngularFireDatabase
  ){
    // this.user = afAuth.authState;
    this.authState = this.afAuth.authState;
    this.authState.subscribe(user => {
      if (user) {
        this.currentUser = user;
      } else {
        this.currentUser = null;
      }
    });
  }

  login(newEmail: string, newPassword: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(newEmail, newPassword);
  }

  logout() {
      return this.afAuth.auth.signOut();
  }

  getAuthState() {
    return this.authState;
  }

  registrar(email:string, password:string){
    return this.afAuth.auth.createUserWithEmailAndPassword(email,password);
  }

  registrarColaborador(uid:string){
    return this.af.database.ref("usuarios").child(uid);
  }

  getUsers(){
    return this.af.database.ref("usuarios");
  }

  getColaboradores(uid){
    return this.af.database.ref("empleados").child(uid);
  }

  getColaboradoresId(uid,id){
    return this.af.database.ref("empleados").child(uid).child(id);
  }

  registrarColaboradores(uid, obj){
    return this.af.database.ref("empleados").child(uid).update(obj);
  }

  update(obj){
    return this.af.database.ref().update(obj);
  }

  eliminar(obj){
    return this.af.database.ref().child(obj).remove();
  }

  get(url){
    return this.af.database.ref(url);
  }

  create(url,obj){
    return this.af.database.ref(url).push(obj);
  }


  key(child){
    return this.af.database.ref().child(child).push().key;
  }


}
