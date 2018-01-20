import { Component, OnInit } from '@angular/core';
import {RestRepositoryService} from "../../../services/rest/rest-repository.service";
import {BlockScreenService} from "../../../services/block-screen/block-screen.service";
import {MatTableDataSource} from "@angular/material";
import {delay} from "rxjs/operators";
import {FlowerModel} from "../../../model/flower-model";

@Component({
  selector: 'app-flowers',
  templateUrl: './flowers.component.html',
  styleUrls: ['./flowers.component.scss']
})
export class FlowersComponent implements OnInit {

  constructor(
    private rest: RestRepositoryService,
    private blockScreen: BlockScreenService
  ) { }

  items: FlowerModel[];
  groupByCol = "role";
  displayedColumns = [...Object.keys(new FlowerModel()).filter(e => e != this.groupByCol), "edit"];


  createDataSource(data) {
    return new MatTableDataSource<FlowerModel>(data);
  }
  ngOnInit() {
    this.blockScreen.show();
    this.rest
      .getItems("Flower")
      //.pipe(delay(2000))
      .subscribe(
        items => {
          this.items = items as Array<FlowerModel>;
          this.blockScreen.hide()
        })
  }


  editRow(row: FlowerModel){
    console.log("edit " + row._id);
    // TODO editor service
  }

}
