import { Component, OnInit, Input } from '@angular/core';
import { RestService } from '../rest.service';
import { Router } from '@angular/router';
import { Ementa } from '../Models/ementa';
//import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
//import datepicker from './datepicker';


@Component({
  selector: 'app-ementas',
  templateUrl: './ementas.component.html',
  styleUrls: ['./ementas.component.css'],

})
export class EmentasComponent implements OnInit {
  user: any;
  addingEmenta: boolean = false;
  currentEmenta: any;
  viewingEmenta: boolean;
  ementas: any = [];
  atualizarEmenta: boolean = false;
  atualizar: boolean = false;

  page = 1;
  pageSize = 10;
  collectionSize;

  @Input() ementa: Ementa = new Ementa();

  constructor(private router: Router, public rest: RestService) { }

  ngOnInit(): void {
    this.getEmentas();
    this.user = JSON.parse(localStorage.getItem("currentUser"))
  }

  getEmentas() {
    this.ementas = [];
    this.rest.verEmentas().subscribe((data: {}) => {
      this.ementas = data;
      this.collectionSize = this.ementas.length;
    });
  }

  addEmenta(){
        this.rest.criarEmenta(this.ementa).subscribe((result: Ementa) => {
          this.addingEmenta = false;
          this.getEmentas();
        }, (err) => {
          console.log(err);
          if (err.error.invalidArguments) {
            alert("Campos não preenchidos!");
          }
        })
      }


  ementaInfo(ementaId: string) {
    if (this.viewingEmenta && this.currentEmenta._id == ementaId) {
      this.viewingEmenta = false;
    } else {
      let ementaResult: any = null;
      new Promise((resolve, reject) => {
        const ementas = this.ementas;
        ementas.forEach(function (ementa, index) {
          if (ementa._id == ementaId) {
            ementaResult = ementa;
            resolve();
          }
          if (index === ementas.length - 1) resolve();
        });
      }).then(() => {
        this.currentEmenta = ementaResult;
        this.atualizar = false;
        this.viewingEmenta = true
      });
    }
  }

  update() {
      this.rest.updateEmenta(this.currentEmenta._id, this.ementa)
        .subscribe(res => {
          this.atualizarEmenta = false;
          this.getEmentas();
          this.viewingEmenta = false;
          this.ementaInfo(this.currentEmenta._id);
        }, (err) => {
          console.log(err);
        }
        );
    }

  delete(ementaId: string) {
    let doRemove = confirm("Queres mesmo remover esta ementa?");
    if (doRemove == true) {
      this.rest.deleteEmenta(ementaId)
        .subscribe(res => {
          this.getEmentas();
        }, (err) => {
          console.log(err);
        }
        );
    }
  }

}
