import { Component } from '@angular/core';
import 'rxjs/add/operator/take';
import { Router,ActivatedRoute, Params } from '@angular/router';
import { FirebaseService } from '../app/services/firebase/firebase.service';
// import { moveIn, fallIn, moveInLeft } from '../router.animations';
// import {  DashboardComponent } from '../app/dashboard/dashboard/dashboard.component';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  // animations: [moveIn(), fallIn(), moveInLeft()],
})
export class AppComponent {
  // title = "app";
  email:any;
  user:any;
  uid:any;
  uidParams:any;

  constructor(
    public authData: FirebaseService,
    // public router: Router,
    public activatedRoute: ActivatedRoute,
    // public getParams:DashboardComponent
  ){
    this.authData.getAuthState().subscribe(
      (user) => {
      if(user){
        this.user = user;
        this.email = user.email;
        this.uid = user.uid;
        this.activatedRoute.params.take(1).subscribe((params: any) => {
          console.log(params);
          this.uidParams = params['id'];
        });

        // console.log(this.getParams.uidParams);
      }
      else{
        // console.log("sali");
        this.email = '';
        this.uid = '';
      }
    });
  }
  ngOnInit() {
    // this.activetedRoute.queryParams.subscribe(params => {
    //   // this.accesstoken = params['#access_token'];
    //   this.uidParams = params["id"];
    // });
  }
  logout(){
    console.log("saliendo ...");
    this.authData.logout();
    // this.router.navigate(['/']);
  }
}
