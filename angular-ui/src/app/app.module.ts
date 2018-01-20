import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import {
  MatButtonModule, MatCardModule, MatCheckboxModule, MatDialogModule, MatExpansionModule, MatFormFieldModule,
  MatIconModule, MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNavList,
  MatProgressSpinnerModule,
  MatSidenavModule, MatTableModule,
  MatToolbarModule
} from "@angular/material";
import { HomeComponent } from './components/main-pages/home/home.component';
import { AboutComponent } from './components/main-pages/about/about.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule} from "@angular/forms";
import {BlockScreenService} from "./services/block-screen/block-screen.service";
import { BlockScreenComponent } from './components/shared/block-screen/block-screen.component';
import {LoginService} from "./services/login/login.service";
import { NotFoundComponent } from './components/shared/not-found/not-found.component';
import { UsersComponent } from './components/main-pages/users/users.component';
import {RestRepositoryService} from "./services/rest/rest-repository.service";
import {HttpClientModule} from "@angular/common/http";
import { LoginDialogComponent } from './components/dialogs/login-dialog/login-dialog.component';
import {AreYouSureComponent} from "./components/dialogs/are-you-sure/are-you-sure.component";
import { CapitalizePipe } from './pipes/capitalize.pipe';
import {A11yModule} from "@angular/cdk/a11y";
import { GroupByPipe } from './pipes/group-by.pipe';
import { FlowersComponent } from './components/main-pages/flowers/flowers.component';
import { SplitCamelCasePipe } from './pipes/split-camel-case.pipe';
import { BranchesComponent } from './components/main-pages/branches/branches.component';
import { MDBBootstrapModule, MDBRootModule} from 'angular-bootstrap-md/index'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    BlockScreenComponent,
    NotFoundComponent,
    UsersComponent,
    LoginDialogComponent,
    AreYouSureComponent,
    CapitalizePipe,
    GroupByPipe,
    FlowersComponent,
    SplitCamelCasePipe,
    BranchesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatButtonModule,
    MatExpansionModule,
    MatTableModule,
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
    MatFormFieldModule,
    MDBBootstrapModule.forRoot(),
    A11yModule
  ],
  entryComponents:[LoginDialogComponent, AreYouSureComponent, BlockScreenComponent],
  exports: [MatButtonModule, MatCheckboxModule, MatSidenavModule, BrowserAnimationsModule, A11yModule, MatTableModule ],
  providers: [BlockScreenService, LoginService, RestRepositoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
