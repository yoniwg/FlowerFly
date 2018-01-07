import {Component, OnInit} from '@angular/core';
import {ScreenBlockService} from "./screen-block.service";
import {LoginService} from "./login.service";

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
    private block: ScreenBlockService,
    private login: LoginService
    ) {}

  ngOnInit() {
    // this.blockScreenShown = true;
     this.block.onShownChange.subscribe(shown => this.blockScreenShown = shown)
  }

  title = 'Flower Fly';

  blockScreenShown: boolean = false;

  private _menu = [
    {title: "Home", link: ""},
    {title: "About", link: "/about"},
    {title: "User 1", link: "/user/1"}
  ];

  get menu() {
    return FULL_MENU.filter(item => this.login.hasPermission(item))
  }

}
