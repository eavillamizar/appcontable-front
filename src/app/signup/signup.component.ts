import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/models/user.models';
import { UserService } from '../services/user/user.service';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  errorMessage = 'Campo invalido';
  user: User = {name: '', email: '', password: ''};

  constructor(public userService: UserService) { }

  ngOnInit(): void {
  }

  onSignup(form: NgForm){
    if(form.invalid){
      return;
    }
    this.userService.createUser(form.value);
  }

  getErrorMessage(){
    return this.errorMessage;
  }

}
