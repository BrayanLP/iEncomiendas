import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/take';
import {Router,ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  uidParams:any;
  constructor(
    private route: ActivatedRoute
  ){
    this.route.params.subscribe(params => {
      console.log(params);
      console.log(+params['id']);
   });
  }

  ngOnInit() {
  }

}
