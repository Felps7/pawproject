import { Component, OnInit } from '@angular/core';
import { AuthenticationServiceService } from '../authentication-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  currentPassword:string;
  newPassword:string;
  invalidInput: boolean;
  constructor(public authenticationService: AuthenticationServiceService,private router: Router) { }

  ngOnInit(): void {
  }

  changePassword(){
    this.authenticationService.changePassword(this.currentPassword,this.newPassword).subscribe((data:{})=>{
      this.router.navigate(['/']);
    }, (error) => { this.invalidInput = true });
  }
}
