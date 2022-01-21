import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SessionGuard } from '@core/guards/session.guard';
import { SessionCheckGuard } from '@core/guards/session_check.guard';
import { LoginPagesComponent } from '@modules/auth/pages/login-pages/login-pages.component';
import { HomePageComponent } from '@modules/home/pages/home-page/home-page.component';

const routes: Routes = [
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        component: LoginPagesComponent,
      },
    ],
  },
  {
    path: '',
    component: HomePageComponent,
    canActivate: [SessionGuard],
    loadChildren: () =>
      import(`./modules/home/home.module`).then((m) => m.HomeModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
