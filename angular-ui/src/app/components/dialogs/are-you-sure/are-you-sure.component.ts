import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from "@angular/material";

@Component({
  selector: 'are-you-sure-dialog',
  templateUrl: './are-you-sure.component.html',
  styleUrls: ['./are-you-sure.component.scss']
})
export class AreYouSureComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<AreYouSureComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    data.message = (data.message) ? (data.message + ".") : ""
  }
  ngOnInit() {
  }

}
