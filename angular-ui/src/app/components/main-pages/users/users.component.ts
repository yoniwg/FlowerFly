import {Component, OnInit, ViewChild} from '@angular/core';
import {RestRepositoryService} from "../../../services/rest/rest-repository.service";
import {BlockScreenService} from "../../../services/block-screen/block-screen.service";
import {UserModel} from "../../../model/user-model";
import {MatTableDataSource} from "@angular/material";
import {delay} from "rxjs/operators";

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
  groupByCol = "role";
  displayedColumns = [...Object.keys(new UserModel()).filter(e => e != this.groupByCol), "edit"];

  createDataSource(data) {
    return new MatTableDataSource<UserModel>(data);
  }
  ngOnInit() {
    this.blockScreen.wrap(
      this.rest
        .getItems("User")
        .pipe(delay(2000))
    ).subscribe(items => this.items = items as Array<UserModel>)
  }

  editRow(row: UserModel){
    console.log("edit " + row._id);
    // TODO editor service
  }

}
