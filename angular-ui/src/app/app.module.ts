import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import {
  MAT_LABEL_GLOBAL_OPTIONS,
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
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
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
import { MDBBootstrapModule, MDBRootModule} from 'angular-bootstrap-md/index';
import { EditModelComponent } from './components/dialogs/edit-model/edit-model.component';
import { EntriesPipe } from './pipes/entries.pipe';
import { MessageComponent } from './components/dialogs/message/message.component';
import { ModelViewComponent } from './components/main-pages/model-view/model-view.component';
import { FilterUnderScorePipe } from './pipes/filter-under-score.pipe'

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
    BranchesComponent,
    EditModelComponent,
    EntriesPipe,
    MessageComponent,
    ModelViewComponent,
    FilterUnderScorePipe
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
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot(),
    A11yModule
  ],
  entryComponents:[MessageComponent, LoginDialogComponent, AreYouSureComponent, BlockScreenComponent, EditModelComponent],
  exports: [MatButtonModule, MatCheckboxModule, MatSidenavModule, BrowserAnimationsModule, A11yModule, MatTableModule ],
  providers: [
    BlockScreenService,
    LoginService,
    RestRepositoryService,
    {provide: MAT_LABEL_GLOBAL_OPTIONS, useValue: {float: 'always'}}
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
