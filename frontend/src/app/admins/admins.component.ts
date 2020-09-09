import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.css']
})
export class AdminsComponent implements OnInit {
  admins: any;
  addingAdmin: boolean = false;
  userId: string;
  currentAdmin: any;
  viewingAdmin: boolean;
  page = 1;
  pageSize = 10;
  collectionSize;
  user: any;

  constructor(private router: Router, public rest: RestService) { }

  ngOnInit(): void {
    this.getAdmins();
    this.user = JSON.parse(localStorage.getItem("currentUser"))
  }

  get adminsP(): any[] {
    return this.admins
      .map((country, i) => ({ id: i + 1, ...country }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }


  getAdmins() {
    this.admins = [];
    this.rest.getAdmins().subscribe((data: {}) => {
      this.admins = data;
      this.collectionSize = this.admins.length;
    });
  }

  demote(empregadoId: string) {
    var doRemove = confirm("Queres mesmo remover este admin?");
    if (doRemove == true) {
      this.rest.removeAdmin(empregadoId).subscribe((data: {}) => {
        this.getAdmins();
      });
    }

  }

  addAdmin() {
    if (this.userId == null || this.userId == '') {
      alert("ID de utilizador inválido!")
      return;
    }
    this.rest.addAdmin(this.userId).subscribe((data: {}) => {
      this.getAdmins();
      this.addingAdmin = false;
      this.userId = null;
    }, (err) => {
      alert("ID de utilizador inexistente")
  });
  }
  adminInfo(adminId: string) {
    if (this.viewingAdmin && this.currentAdmin._id == adminId) {
      this.viewingAdmin = false;
    } else {
      var adminResult: any = null;
      new Promise((resolve, reject) => {
        const admins = this.admins;
        admins.forEach(function (admin, index) {
          if (admin._id == adminId) {
            adminResult = admin;
            resolve();
          }
          if (index === admins.length - 1) resolve();
        });
      }).then(() => {
        this.currentAdmin = adminResult;
        this.viewingAdmin = true
      });
    }
  }
}
