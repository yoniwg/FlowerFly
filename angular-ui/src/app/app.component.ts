import {Component, OnInit} from '@angular/core';
import {BlockScreenService} from "./screen-block.service";
import {LoginService} from "./login.service";
import {LoginDialogComponent} from "./login-dialog/login-dialog.component";
import {MatDialog, MatDialogRef} from "@angular/material";
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
    private $dialog: MatDialog
    ) {}

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
          flatMap(res => res && this.$login.login(res.username, res.password))
        )
        .subscribe(
          res => this.blockScreen.hide(),
            err => this.blockScreen.showError(err)
        )
  }

}
