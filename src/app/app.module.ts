import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import { AppComponent } from './app.component';
import { RegUserComponent } from './reg-user/reg-user.component';
import { CrudempserService } from './crudempser.service';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    RegUserComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: 'home',
        component: AppComponent
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
      },
      {
      path: 'reg-user',
      component: RegUserComponent
      }
    ])
  ],
  providers: [
    CrudempserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
