import { Component, OnInit } from '@angular/core';
import { AuthenticationServiceService } from './authentication-service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user: any;

  constructor(private router: Router, private authServive: AuthenticationServiceService, route: ActivatedRoute) {
    router.events.subscribe((val) => {
      this.user = JSON.parse(localStorage.getItem("currentUser"))
    });
  }


  logout(): void {
    this.authServive.logout().subscribe(() => {
      this.user = null;
      this.router.navigate(['']);
    }
    );

  }
  havePremission(roleRequired : string) : boolean {
    if (roleRequired == this.user.role){
      return true
    } else if (this.user.role == "ADMIN"){
      return true
    }
    return false
  }
}
