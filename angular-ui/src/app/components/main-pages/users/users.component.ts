import {Component, OnInit, ViewChild} from '@angular/core';
import {RestRepositoryService} from "../../../services/rest/rest-repository.service";
import {BlockScreenService} from "../../../services/screen-block/screen-block.service";
import {delay} from "rxjs/operators/delay";
import {UserModel} from "../../../model/user-model";
import {MatSort, MatTableDataSource} from "@angular/material";

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

  items: UserModel[];
  displayedColumns = Object.keys(new UserModel());

  createDataSource(data) {
    return new MatTableDataSource<UserModel>(data);
  }
  ngOnInit() {
    this.blockScreen.showProgress();
    this.rest
      .getItems("User")
      .pipe(delay(2000))
      .subscribe(
        items => {
          this.items = items as Array<UserModel>;
          this.blockScreen.hide()
        },
        err => {
          this.blockScreen.showError(err)
        }
      )
  }

}
