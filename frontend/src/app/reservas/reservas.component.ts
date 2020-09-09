import { Component, OnInit, Input } from '@angular/core';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Reserva } from '../Models/reserva';
import { Ementa } from '../Models/ementa';



@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})
export class ReservasComponent implements OnInit {
  user: any;
  addingReserva: boolean = false;
  currentReserva: any;
  viewingReserva: boolean;
  viewingListar: boolean = true;
  atualizarReserva: boolean = false;
  reservas: any = [];
  ementas: any = [];
  estado: String = "pendente";
  page = 1;
  pageSize = 10;
  collectionSize;
  viewingFiltros: boolean = false;
  filtro: String;
  dataTemp:Date;
  usernameFiltro: String;
  IDfiltro: String;

  viewingListarusername: boolean = false;

  pesquisar: boolean = false;
  ementa: Ementa = new Ementa();
  ementaTemp: any;

  @Input() reserva: Reserva = new Reserva();


  constructor(public rest: RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getReservas()
    this.getEmentas()
    this.user = JSON.parse(localStorage.getItem("currentUser"))
  }


  getReservas() {
    this.reservas = [];
    this.viewingListar = true;
    this.viewingListarusername = false;
    this.pesquisar = false;
    this.rest.getReservas().subscribe((data: {}) => {
      this.reservas = data;
      this.collectionSize = this.reservas.length;
    });
  }

  getEmentas() {
    this.rest.verEmentas().subscribe((data: {}) => {
      this.ementas = data;
    });
  }

  addReserva() {
    let preco: Number = null;
    if (this.reserva.info == null) {
      alert("Faltam preencher campos!");
    }
    else {
      if(this.reserva.ementa.localeCompare('Nenhuma')==-1 && this.reserva.nrPessoas!=null){
        this.ementa=this.ementaInf(this.reserva.ementa);
        preco = parseInt(this.ementa.preco) * 0.95;
      }else{
        if(this.reserva.ementa.localeCompare('Nenhuma')==-1 && this.reserva.nrPessoas==null){
          this.ementa=this.ementaInf(this.reserva.ementa);
          preco = parseInt(this.ementa.preco);
        }
      }
      this.reserva.username = this.user.username;
      this.reserva.preco = preco;
      this.rest.addReserva(this.reserva).subscribe((result: Reserva) => {
        this.addingReserva = false;
        this.getReservas();
      }, (err) => {
        console.log(err);
        if (err.error.invalidArguments) {
          alert("Faltam preencher campos!");
        }
      })
    }
  }

  filtrousername() {

    if (this.usernameFiltro == null) {
      alert("Não foi introduzido nenhum username!");
      return;
    }
    else {
      this.rest.getReservas().subscribe((data: {}) => {

        this.reservas = data;
        this.viewingListarusername = true;
        var reservasTemp = [];
        new Promise((resolve, reject) => {
          const reservas = this.reservas;

          const resultToSearchUsername = this.usernameFiltro;

          reservas.forEach(function (reserva, index) {

            if (reserva.username == resultToSearchUsername) {
              reservasTemp.push(reserva);
              resolve();
            }

            if (index === reservas.length - 1) resolve();
          });
        }).then(() => {
          if(reservasTemp.length==0){
          alert('User não tem reservas ou não existe!');
          }
          this.reservas = reservasTemp;
          this.usernameFiltro = null;
        });
      });
    }
  }

  getReserva(_id: String) {
    this.reserva = null;
    this.rest.getReserva(_id).subscribe((data: Reserva) => {
      this.reserva = data;
    })
  }


  delete(reservaId: String) {
    var doRemove = confirm("Queres mesmo remover esta reserva?");
    if (doRemove == true) {
      this.rest.deleteReserva(reservaId)
        .subscribe(res => {
          this.getReservas();
        }, (err) => {
          console.log(err);
        }
        );
    }
  }

  update() {
    this.rest.editarReserva(this.currentReserva._id, this.reserva)
      .subscribe(res => {
        this.atualizarReserva = false;
        this.getReservas();
        this.viewingReserva = false;
        this.reservaInfo(this.currentReserva._id)
      }, (err) => {
        console.log(err);
      }
      );
  }

  reservaInfo(reservaId: String) {
    if (this.viewingReserva && this.currentReserva._id == reservaId) {
      this.viewingReserva = false;
    } else {

      var reservaResult: any = null;

      new Promise((resolve, reject) => {
        const reservas = this.reservas;
        reservas.forEach(function (reserva, index) {
          if (reserva._id == reservaId) {
            reservaResult = reserva;
            resolve();
          }
          if (index === reserva.length - 1) resolve();
        });
      }).then(() => {
        this.currentReserva = reservaResult;
        this.viewingReserva = true
      });


    }
  }

    ementaInf(ementaId: String): any {
      let ementaResult: any = null;
      this.ementas.forEach(function (ementa, index) {
      if (ementa._id == ementaId) {
        ementaResult = ementa;
        }
      });
      return this.ementaTemp = ementaResult;
    }

    dataRes(r: any){
      this.dataTemp = new Date(r)
      return this.dataTemp.toLocaleString()
    }
  }

