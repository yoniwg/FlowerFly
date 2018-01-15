import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import {
  MatButtonModule, MatCardModule, MatCheckboxModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNavList,
  MatProgressSpinnerModule,
  MatSidenavModule,
  MatToolbarModule
} from "@angular/material";
import { HomeComponent } from './components/main-pages/home/home.component';
import { AboutComponent } from './components/main-pages/about/about.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule} from "@angular/forms";
import { UserDetailsComponent } from './components/dialogs/user-details/user-details.component';
import {BlockScreenService} from "./services/screen-block/screen-block.service";
import { BlockScreenComponent } from './components/shared/screen-block/screen-block.component';
import {LoginService} from "./services/login/login.service";
import { NotFoundComponent } from './components/shared/not-found/not-found.component';
import {HttpModule} from "@angular/http";
import { UsersComponent } from './components/main-pages/users/users.component';
import {RestRepositoryService} from "./services/rest/rest-repository.service";
import {HttpClientModule} from "@angular/common/http";
import { LoginDialogComponent } from './components/dialogs/login-dialog/login-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    UserDetailsComponent,
    BlockScreenComponent,
    NotFoundComponent,
    UsersComponent,
    LoginDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule
  ],
  entryComponents:[LoginDialogComponent],
  exports: [MatButtonModule, MatCheckboxModule, MatSidenavModule, BrowserAnimationsModule ],
  providers: [BlockScreenService, LoginService, RestRepositoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
