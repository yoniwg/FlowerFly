import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {NavigationStart, Router} from "@angular/router";

@Injectable()
export class BlockScreenService {

  constructor(private router: Router){
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.onNavigationStart();
      }
    })
  }

  private onNavigationStart() {
    this.hide()
  }

  private onClick: () => void = null;

  private _shown = false;

  get shown() {
    return this._shown;
  }

  set shown(value: boolean) {
    this._shown = value;
    this.onShownChange.next(value);
  }

  title: string;

  message: string;

  buttonTitle: string;

  onShownChange = new BehaviorSubject(false);

  progressShown: boolean = false;

  showMessage(title: string, message: string = null, buttonTitle: string = null, onClick: () => void = null) {
    const hasMessage = buttonTitle && onClick && buttonTitle.length != 0;
    this.onClick = hasMessage ? onClick : null;
    this.buttonTitle = hasMessage ? buttonTitle : null;

    this.title = title;
    this.message = message;
    this.progressShown = false;

    this.shown = true;
  }

  showError(error: Error, buttonTitle: string = null, onClick: () => void = null) {
    this.showMessage(error.name, error.message, buttonTitle, onClick)
  }

  showProgress(title: string = "", message: string = null, buttonTitle: string = null, onClick: () => void = null) {
    const hasMessage = buttonTitle && onClick && buttonTitle.length != 0;
    this.onClick = hasMessage ? onClick : null;
    this.buttonTitle = hasMessage ? buttonTitle : null;

    this.title = title;
    this.message = message;
    this.progressShown = true;
    this.buttonTitle = buttonTitle;

    this.shown = true;
  }

  hide() {
    this.shown = false;
  }

}
