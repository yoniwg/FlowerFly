import { Component, OnInit } from '@angular/core';
import {ScreenBlockService} from "../screen-block.service";

@Component({
  selector: 'app-screen-block',
  templateUrl: './screen-block.component.html',
  styleUrls: ['./screen-block.component.scss']
})
export class ScreenBlockComponent implements OnInit {

  constructor(private block: ScreenBlockService) { }

  ngOnInit() {
  }

}
