import { Component, OnInit } from '@angular/core';
import {RestRepositoryService} from "../../../services/rest/rest-repository.service";
import {BlockScreenService} from "../../../services/screen-block/screen-block.service";
import {delay} from "rxjs/operators/delay";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(
    private rest: RestRepositoryService,
    private blockScreen: BlockScreenService
    ) { }

  items: any[];

  ngOnInit() {
    this.blockScreen.showProgress();
    this.rest
      .getItems("User")
      .pipe(delay(2000))
      .subscribe(
        items => {
          this.items = items;
          this.blockScreen.hide()
        },
        err => {
          this.blockScreen.showError(err)
        }
      )
  }

}
