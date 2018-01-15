import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from "@angular/router";
import {BlockScreenService} from "../../../services/screen-block/screen-block.service";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private block: BlockScreenService
  ) { }

  private id: number ;

  ngOnInit() {
    this.initId();
  }

  private initId() {
    const id = +this.route.snapshot.paramMap.get('id');
    const hasId = id && isFinite(id) && !isNaN(id);
    if (!hasId) {
      this.block.showMessage("Illegal id: " + id)
    }
    this.id = id;
  }

}
