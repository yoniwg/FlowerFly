import { Component, OnInit } from '@angular/core';
import {BlockScreenService} from "../screen-block.service";

@Component({
  selector: 'app-block-screen',
  templateUrl: './screen-block.component.html',
  styleUrls: ['./screen-block.component.scss']
})
export class BlockScreenComponent implements OnInit {

  constructor(private blockScreen: BlockScreenService) { }

  ngOnInit() {
  }

}
