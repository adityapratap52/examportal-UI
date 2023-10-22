import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public isLoggedIn: boolean = false;
  public user:any = null;

  constructor(
    private service: LoginService,
    private router: Router,
    private snack: MatSnackBar) { 
      if (localStorage.getItem('user') != null) {
          this.isLoggedIn = this.service.userIsLoggedIn();
          this.user = this.service.getUser();
      }
    }

  ngOnInit(): void {
    this.service.loginStatusSubject.asObservable().subscribe((data)=>{
      this.isLoggedIn = this.service.userIsLoggedIn();
      this.user = this.service.getUser();
    });
  }

  logout() {
    this.service.logout();
    this.isLoggedIn = false;
    this.user = null;
    this.router.navigate(['login']);
    this.snack.open("Logout Successfully!","Close",{
      duration: 2000
    });
  }

  // isUserLoggedIn() {
  //   this.isLoggedIn = this.service.userIsLoggedIn();

  //   if (this.isLoggedIn == true) {
  //     this.user = this.service.getUser();
  //   }

  //   return this.isLoggedIn;
  // }
}
