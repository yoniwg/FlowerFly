import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

export enum Severity{FINE = "fine", WARNING = "warning", ERROR = "error"}

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<MessageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {severity: Severity, title?: string, message: string}
  ) {
    data.title = (data.title) ? data.title : data.severity.toString()
  }
  ngOnInit() {
  }

}
