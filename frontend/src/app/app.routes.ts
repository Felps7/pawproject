import { AdminsComponent } from './admins/admins.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { ReservasComponent } from './reservas/reservas.component';
import { EmentasComponent } from './ementas/ementas.component';
import { UtilizadoresComponent } from './users/users.component';
import { AuthGuardService } from './auth-guard-service.service';
import { Routes } from '@angular/router';
import { AgendaComponent } from './agenda/agenda.component';


export const appRoutes: Routes = [
  {
    path: 'admins',
    component: AdminsComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'changePassword',
    component: ChangePasswordComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'home',
    component: HomepageComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'reservas',
    component: ReservasComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'ementas',
    component: EmentasComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'users',
    component: UtilizadoresComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'agenda',
    component: AgendaComponent,
    canActivate: [AuthGuardService]
  },
]
