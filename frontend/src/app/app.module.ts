import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JwtInterceptorService } from './jwt-interceptor-service.service'
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AdminsComponent } from './admins/admins.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { ReservasComponent } from './reservas/reservas.component';
import { EmentasComponent } from './ementas/ementas.component';
import { UtilizadoresComponent } from './users/users.component';
import { appRoutes } from './app.routes';
import { ScheduleModule, RecurrenceEditorModule, DayService, WeekService, MonthService, MonthAgendaService, WorkWeekService } from '@syncfusion/ej2-angular-schedule';
import { AgendaComponent } from './agenda/agenda.component';


@NgModule({
  declarations: [
    AppComponent,
    AdminsComponent,
    ChangePasswordComponent,
    HomepageComponent,
    LoginComponent,
    ReservasComponent,
    EmentasComponent,
    UtilizadoresComponent,
    AgendaComponent,
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ScheduleModule, RecurrenceEditorModule,
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true}, DayService, WeekService, WorkWeekService, MonthService, MonthAgendaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
