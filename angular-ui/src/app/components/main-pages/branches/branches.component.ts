import { Component, OnInit } from '@angular/core';
import {RestRepositoryService} from "../../../services/rest/rest-repository.service";
import {BlockScreenService} from "../../../services/block-screen/block-screen.service";
import {BranchModel} from "../../../model/branch-model";
import {MatTableDataSource} from "@angular/material";
import {delay} from "rxjs/operators";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.scss']
})
export class BranchesComponent implements OnInit {

  constructor(
    private rest: RestRepositoryService,
    private blockScreen: BlockScreenService
  ) { }

  items: BranchModel[];
  groupByCol = "role";
  displayedColumns = [...Object.keys(new BranchModel()).filter(e => e != this.groupByCol), "edit"];


  createDataSource(data) {
    return new MatTableDataSource<BranchModel>(data);
  }

  ngOnInit() {
    this.blockScreen. show();
    this.rest
      .getItems("Branch")
      //.pipe(delay(2000))
      .subscribe(
        items => {
          this.items = items as Array<BranchModel>;
          this.blockScreen.hide()
        }
      )
  }

  editRow(row: BranchModel){
    console.log("edit  " + row._id);
    // TODO editor service
  }

}
