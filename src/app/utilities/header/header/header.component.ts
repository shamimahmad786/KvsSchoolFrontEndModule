import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as $ from 'jquery';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  logoutLink = environment.LOGOUT_URL

  constructor() { }

  public ngOnInit(): void {
    $(document).ready(function(){
      $(".dropdown").mouseenter(function(){
        $(".dropdown-menu").show(500);
      });
      $(".dropdown").mouseleave(function(){
        $(".dropdown-menu").hide(500);
      });
    });
  }

  authlogout(){
    

    sessionStorage.clear();
  }

}
