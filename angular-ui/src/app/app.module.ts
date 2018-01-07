import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import {
  MatButtonModule, MatCardModule, MatCheckboxModule, MatIconModule, MatListModule, MatMenuModule, MatNavList,
  MatProgressSpinnerModule,
  MatSidenavModule,
  MatToolbarModule
} from "@angular/material";
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule} from "@angular/forms";
import { UserDetailsComponent } from './user-details/user-details.component';
import {ScreenBlockService} from "./screen-block.service";
import { ScreenBlockComponent } from './screen-block/screen-block.component';
import {LoginService} from "./login.service";
import { NotFoundComponent } from './not-found/not-found.component';
import {HttpModule} from "@angular/http";
import { UsersComponent } from './users/users.component';
import {RestRepositoryService} from "./rest-repository.service";
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    UserDetailsComponent,
    ScreenBlockComponent,
    NotFoundComponent,
    UsersComponent
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
    MatListModule
  ],
  exports: [MatButtonModule, MatCheckboxModule, MatSidenavModule, BrowserAnimationsModule ],
  providers: [ScreenBlockService, LoginService, RestRepositoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
