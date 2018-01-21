import {Component, Input, OnInit, Type} from '@angular/core';
import {RestRepositoryService} from "../../../services/rest/rest-repository.service";
import {BlockScreenService} from "../../../services/block-screen/block-screen.service";
import {MatDialog, MatTableDataSource} from "@angular/material";
import {EditModelComponent} from "../../dialogs/edit-model/edit-model.component";
import {MessageComponent, Severity} from "../../dialogs/message/message.component";
import {Model} from "../../../model/model";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-model-view',
  templateUrl: './model-view.component.html',
  styleUrls: ['./model-view.component.scss']
})
export class ModelViewComponent<T extends Model> implements OnInit {

  constructor(
    private $rest: RestRepositoryService,
    private $blockScreen: BlockScreenService,
    private $dialog : MatDialog,
    private $route: ActivatedRoute) {}

  modelName: string;
  modelType: new() => T;
  groupByCol?: string;
  items: T[];
  displayedColumns:string[];

  createDataSource(data) {
    return new MatTableDataSource<T>(data);
  }
  ngOnInit() {
    this.modelName = this.$route.snapshot.data.modelName;
    this.modelType = this.$route.snapshot.data.modelType;
    this.groupByCol = this.$route.snapshot.data.groupByCol;
    this.displayedColumns = [...Object.keys(new this.modelType()).filter(e => !this.groupByCol || e != this.groupByCol), "edit"];
    this.$blockScreen.wrap(
      this.$rest
        .getItems(this.modelName)
    ).subscribe(items => this.items = items as Array<T>)
  }

  editRow(row: T){
    console.log("edit " + row._id);
    const editorRef = this.$dialog.open(EditModelComponent, {data: row});
    editorRef.afterClosed().subscribe(newRow => newRow &&
      this.$rest.putItem(this.modelName, newRow).subscribe(
        res => this.$dialog.open(MessageComponent,
          {data:{severity:Severity.FINE, message: this.modelName + " was updated successfully"}}).afterClosed()
          .subscribe(
            _  => this.ngOnInit()
          ),
        err => this.$dialog.open(MessageComponent,
          {data:{severity:Severity.ERROR, message: this.modelName + " wasn't updated successfully"}})
      )
    )
  }


}
