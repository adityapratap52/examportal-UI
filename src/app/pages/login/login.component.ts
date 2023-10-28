import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';
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
    private service: LoginService,
    private router: Router
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

      // save token and user information
      this.service.saveTokenIntoLocalStorage(success.token);
      this.service.getCurrentUser().subscribe(
      (user: any) => {
          this.service.saveUserIntoLocalStorage(user);

          // redirect..ADMIN: dashboard and redirect..USER: user-dashboard
          if(this.service.getUserRole() == 'ADMIN') {

            // window.location.href='/admin'    // it reload to whole application
            this.router.navigate(['admin']);    // it's not reload
            this.service.loginStatusSubject.next(true);
          } else if(this.service.getUserRole() == 'NORMAL') {

            this.router.navigate(['user-dashboard/0']);
            this.service.loginStatusSubject.next(true);
          } else {
            this.service.logout();   
            // location.reload();       // it is refresh whole application so we can't use
          }
      });
    }, 
    (error) => {
      console.log(error);
      Swal.fire("Invalid Credentials","Username and password is not correct","error");
    });
  }
}
