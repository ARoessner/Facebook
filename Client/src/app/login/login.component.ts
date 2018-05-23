import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  Uname : String;
  Pword : String;
  constructor() { }
  login()
  {
    console.log(this.Uname);
    console.log(this.Pword);
  }
  ngOnInit() {
  }

}
