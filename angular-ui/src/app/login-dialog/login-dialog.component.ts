import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<LoginDialogComponent>) { }

  private data = { username: "" , password: ""};

  ngOnInit() {
  }

}
