import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {NavigationStart, Router} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {
  BlockScreenComponent,
  BlockScreenComponentData
} from "../../components/shared/block-screen/block-screen.component";
import {MatDialog} from "@angular/material/dialog";
import {MatDialogRef} from "@angular/material/dialog";
import {tap} from "rxjs/operators";
import {flatMap} from "rxjs/operators";



@Injectable()
export class BlockScreenService {

  constructor(private $dialog : MatDialog){

  }

  private dialogRef : MatDialogRef<BlockScreenComponent>;

  data: BlockScreenComponentData;

  private showData(data: BlockScreenComponentData){
    setTimeout(() => this.data = data, 0)
  }

  hide(){
    if (this.dialogRef) this.dialogRef.close();
    this.dialogRef = null;
    setTimeout(() => this.data = null, 0)
  }


  show(){
    this.showData({showProgress : true})
  }


  private showError(err: Error, onClick?: () => void) {
    this.showData({
      title: err.name,
      message: err.message,
      buttonText: "Try Again",
      onClick: onClick
    })
  }

  wrap<T>(observable: Observable<T>): Observable<T> {
    return Observable.create(observer => {
      this.show();
      observer.next(null);
      observer.complete()
    }).pipe(
      flatMap(_ => observable),
      tap( _ => this.hide(), err => this.showError(err))
    )
  }
}
