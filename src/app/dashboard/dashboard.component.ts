import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/take';
import {Router,ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  uidParams:any;
  constructor(
    private route: ActivatedRoute
  ){
    this.route.params.take(1).subscribe((params: any) => {
      console.log(params);
      this.uidParams = params['id'];
    });

  }

  ngOnInit() {
  }

}
