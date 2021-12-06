import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/models/user.models';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMessage = 'Campo invalido';
  user: User = {name: '', email: '', password: ''};

  constructor(public userService: UserService) { }

  ngOnInit(): void {
  }

  onLogin(form: NgForm) {
    if(form.invalid){
      return;
    }
    this.userService.login(form.value.email, form.value.password);
  }

  getErrorMessage() {
    return this.errorMessage;
  }

}
