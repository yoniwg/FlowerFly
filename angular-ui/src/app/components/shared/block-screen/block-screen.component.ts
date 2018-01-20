import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-block-screen',
  templateUrl: './block-screen.component.html',
  styleUrls: ['./block-screen.component.scss']
})
export class BlockScreenComponent implements OnInit {


  constructor(
    /*private dialogRef: MatDialogRef<BlockScreenComponent>,
    @Inject(MAT_DIALOG_DATA) public data1: BlockScreenComponentData */
  ) {
    //this.data = data1;
  }
  @Input() data : BlockScreenComponentData;

  ngOnInit() {}


}

export interface BlockScreenComponentData {
  showProgress?: Boolean
  title?: string
  message?: string
  onClick?: () => void
  buttonText?: string
}
