import {Component, OnInit} from '@angular/core';
import {BlockScreenService} from "./services/screen-block/screen-block.service";
import {LoginService} from "./services/login/login.service";
import {LoginDialogComponent} from "./components/dialogs/login-dialog/login-dialog.component";
import {MatDialog, MatDialogRef, MatIconRegistry} from "@angular/material";
import {delay, flatMap} from "rxjs/operators";
import {tap} from "rxjs/operators";
import {map} from "rxjs/operators";

const FULL_MENU = [
  {"title": "Home", "msgId": "home", "link": "/", "accessAll" : true},
  {"title": "Flowers Catalog", "msgId": "flowers_catalog", "link": "/flowers", "loggedInOnly": true},
  {"title": "Users Management", "msgId": "users_management", "link": "/users", "managerOnly" : true, "employeeOnly": true},
  {"title": "Branches Management", "msgId": "branches_management", "link": "/branches", "managerOnly": true},
  {"title": "About Company", "msgId": "about_company", "link": "/about", "accessAll" : true},
  {"title": "Contact", "msgId": "contact", "link": "/contact", "accessAll" : true}
];


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private blockScreen: BlockScreenService,
    private $login: LoginService,
    private $dialog: MatDialog,
    public matIconRegistry: MatIconRegistry) {
    //add custom material icons
    matIconRegistry.registerFontClassAlias('fa');
  }

  ngOnInit() {

  }

  title = 'Flower Fly';

  get menu() {
    return FULL_MENU.filter(item => this.$login.hasPermission(item))
  }

  showLoginModal() {
      const dialogRef = this.$dialog.open(LoginDialogComponent);
      dialogRef.afterClosed()
        .pipe(
          tap(_ => this.blockScreen.showProgress()),
          flatMap(cred => cred && this.$login.login(cred))
        )
        .subscribe(
          res => this.blockScreen.hide(),
            err => this.blockScreen.showError(err)
        )
  }

}
