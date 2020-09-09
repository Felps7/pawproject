import { Component, OnInit, Input} from '@angular/core';
import { AuthenticationServiceService } from '../authentication-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { View, EventSettingsModel, WeekService} from '@syncfusion/ej2-angular-schedule';
import { RestService } from '../rest.service';
import { Reserva } from '../Models/reserva';




@Component({
  selector: 'app-agenda',
  template: '<ejs-schedule height="850" width="1250" [eventSettings]="eventSettings" [currentView]="setView"></ejs-schedule>',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {
estado: String;
dataRes: Date;
user: any;
d: Date;
public setView: View = 'Month';
reservas: any = [];
dados: any = [];
@Input() reserva: Reserva = new Reserva();
public eventSettings: EventSettingsModel;


  constructor(public rest: RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getReservas();
    this.user = JSON.parse(localStorage.getItem("currentUser"))
  }

  getReservas() {
    let nr;
    let dia, mes, ano, horaI, horaF, min=0;
    let d;
    this.rest.getReservas().subscribe((data: {}) => {
    this.reservas = data;
    for(let i=0; i< this.reservas.length; i++){
      this.reserva = this.reservas[i];
      this.dataRes = new Date(this.reserva.data)
      dia = this.dataRes.getDate()
      mes = this.dataRes.getMonth()
      ano = this.dataRes.getFullYear()
      if(this.reserva.info=="Jantar"){
        horaI=18;
        horaF=23;
      }else{
        horaI=11;
        horaF=15;
      }
      d = new Date(ano, mes, dia, horaI, min)
      this.reserva.data = d;
      nr = this.verPossibilidade(this.dados, this.reserva.data)
      console.log("nr:  " + nr)
      if(nr < 3){
      this.dados.push({
        Subject: this.reserva.username,
        StartTime: this.reserva.data,
        EndTime: new Date(ano, mes, dia, horaF, min)
      })
      this.reserva.estado = 'Confirmada';
    } else {
      this.reserva.estado = 'Cancelada';
    }
    this.rest.editarReserva(this.reserva._id, this.reserva).subscribe(res => {}, (err) => {console.log(err);});
    }
    this.addEventos()
    });
  }


  addEventos(){
    let dados_teste2  = this.dados
    this.eventSettings = {dataSource: dados_teste2};
  }

  verPossibilidade(dados: any, data: Date): any{
    let count=0;
    for(let i=0; i<dados.length; i++){
      let dados11: String;
      let dados22: String;
      dados11 = ""
      dados22 = ""
    
      if(dados[i] !== undefined){
      dados11 = dados[i].StartTime.toLocaleString()
      } else{
        console.log('\n\n\nUndefined aqui')
      }
      dados22 = data.toLocaleString()
      if(dados11 == dados22){
        count++;
      }
    }
    return count;
  }
}

