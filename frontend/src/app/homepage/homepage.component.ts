import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  user: any
  constructor(public rest: RestService, private router: Router, private restService: RestService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("currentUser"))
  }

  havePremission(roleRequired: string): boolean {
    if (roleRequired == this.user.role) {
      return true
    } else if (this.user.role == "ADMIN") {
      return true
    }
    return false
  }
}
