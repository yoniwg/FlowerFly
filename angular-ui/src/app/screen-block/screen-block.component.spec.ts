import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenBlockComponent } from './screen-block.component';

describe('ScreenBlockComponent', () => {
  let component: ScreenBlockComponent;
  let fixture: ComponentFixture<ScreenBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScreenBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
