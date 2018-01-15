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
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule} from "@angular/forms";
import { UserDetailsComponent } from './user-details/user-details.component';
import {BlockScreenService} from "./screen-block.service";
import { BlockScreenComponent } from './screen-block/screen-block.component';
import {LoginService} from "./login.service";
import { NotFoundComponent } from './not-found/not-found.component';
import {HttpModule} from "@angular/http";
import { UsersComponent } from './users/users.component';
import {RestRepositoryService} from "./rest-repository.service";
import {HttpClientModule} from "@angular/common/http";
import { LoginDialogComponent } from './login-dialog/login-dialog.component';


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
