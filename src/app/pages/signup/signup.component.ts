import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public user = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  }

  constructor(
    private userService: UserService, 
    private snack: MatSnackBar,
    private _router: Router) { }

  ngOnInit(): void {
  }

  submitRegisterForm() {

    if(this.user.email.trim() == '' || this.user.firstName.trim() == ''
    || this.user.username.trim() == '' || this.user.password.trim() == '' ) {
      // alert('All fields are mandatory!')
      this.snack.open("Please fill mendatory fields!","Close",{
        duration:3000,
        // verticalPosition: 'top',
        // horizontalPosition: 'right'
      });
      return;
    }
    this.userService.saveUser(this.user).subscribe(
      (success)=>{
        this.user = {
          username: '',
          password: '',
          firstName: '',
          lastName: '',
          email: '',
          phone: ''
        }
        Swal.fire("Success", "User Successfully inserted!","success").then((result) => {
          this._router.navigate(['login']);
        });
    },
    (error)=> {
      console.log(error);
      if(error.error.message != null) {
        Swal.fire("Error", error.error.message);
      } else {
        Swal.fire("Error", "Something went wrong!!!");
      }
      this.user = {
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
      }
      return;
    });
  }
}
