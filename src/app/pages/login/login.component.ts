import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginDetails = {
    username: '',
    password: ''
  }

  constructor(
    private service: LoginService
  ) { }

  ngOnInit(): void {
  }

  loginUser() {
    if (this.loginDetails.username.trim() == '' 
      || this.loginDetails.password.trim() == '') {
      Swal.fire("Invalid Credentials","Username and Password is required!","warning");
      return;
    }

    this.service.generateTokenByLogin(this.loginDetails).subscribe(
    (success: any) => {
      console.log(success);

      // login ..
      this.service.saveToken(success.token);
      this.service.getCurrentUser().subscribe(
      (user: any) => {
          this.service.saveUser(user);

          // redirect..ADMIN: admin-dashboard

          // redirect..USER: user-dashboard
      });
    }, 
    (error) => {
      console.log(error);
      Swal.fire("Invalid Credentials","Username and password is not correct","error");
    });
  }
}
