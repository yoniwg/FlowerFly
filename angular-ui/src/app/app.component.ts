import {Component, OnInit} from '@angular/core';
import {LoginService} from "./services/login/login.service";
import {LoginDialogComponent} from "./components/dialogs/login-dialog/login-dialog.component";
import {MatDialog, MatDialogRef, MatIconRegistry} from "@angular/material";
import {delay, flatMap} from "rxjs/operators";
import {tap} from "rxjs/operators";
import {map} from "rxjs/operators";
import {AreYouSureComponent} from "./components/dialogs/are-you-sure/are-you-sure.component";
import {UserRole} from "./model/user-role.enum";
import {BlockScreenService} from "./services/block-screen/block-screen.service";
const allUsers = [UserRole.CUSTOMER, UserRole.EMPLOYEE, UserRole.PROVIDER, UserRole.MANAGER];
const FULL_MENU = [
  {title: "Home", msgId: "home", link: "/", accessOnly: null},
  {title: "Flowers Catalog", msgId: "flowers_catalog", link: "/flowers", accessOnly: allUsers},
  {title: "Users Management", msgId: "users_management", link: "/users", accessOnly: [UserRole.EMPLOYEE, UserRole.MANAGER]},
  {title: "Branches Management", msgId: "branches_management", link: "/branches", accessOnly: [UserRole.MANAGER]},
  {title: "About Company", msgId: "about_company", link: "/about", accessOnly: null},
  {title: "Contact", msgId: "contact", link: "/contact", accessOnly: null}
];


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private $login: LoginService,
    private $blockScreen: BlockScreenService,
    private $dialog: MatDialog) {}

  ngOnInit() {
    this.$login.setUserIfSignedIn();
  }

  mainTitle = 'Flower Fly';

  get menu() {
    return FULL_MENU.filter(item => item.accessOnly == null ||  item.accessOnly.indexOf(this.$login.userRole) != -1)
  }

  showLoginModal() {
      const dialogRef = this.$dialog.open(LoginDialogComponent);
      dialogRef.afterClosed()
        .pipe(
          flatMap(cred => cred && this.$login.login(cred))
        )
        .subscribe()
  }

  showLogoutModal() {
    const dialogRef = this.$dialog.open(AreYouSureComponent,{data : {action : "logout"}});
    dialogRef.afterClosed()
      .pipe(
        flatMap(answer => answer && this.$login.logout())
      )
      .subscribe()
  }

}
