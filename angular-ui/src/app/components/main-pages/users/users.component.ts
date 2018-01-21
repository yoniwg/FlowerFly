import {Component, OnInit, ViewChild} from '@angular/core';
import {RestRepositoryService} from "../../../services/rest/rest-repository.service";
import {BlockScreenService} from "../../../services/block-screen/block-screen.service";
import {UserModel} from "../../../model/user-model";
import {MatDialog, MatTableDataSource} from "@angular/material";
import {delay} from "rxjs/operators";
import {EditModelComponent} from "../../dialogs/edit-model/edit-model.component";
import {MessageComponent, Severity} from "../../dialogs/message/message.component";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(
    private rest: RestRepositoryService,
    private blockScreen: BlockScreenService,
    private dialogService : MatDialog) { }

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
    ).subscribe(items => this.items = items as Array<UserModel>)
  }

  editRow(row: UserModel){
    console.log("edit " + row._id);
    const editorRef = this.dialogService.open(EditModelComponent, {data: row});
    editorRef.afterClosed().subscribe(newRow =>
      this.rest.putItem("User", newRow).subscribe(
        res => this.dialogService.open(MessageComponent,
          {data:{severity:Severity.FINE, message: "User was updated successfully"}}).afterClosed()
          .subscribe(
            _  => this.ngOnInit()
        ),
        err => this.dialogService.open(MessageComponent,
          {data:{severity:Severity.ERROR, message: "User wasn't updated successfully"}})
      )
    )
  }

}
