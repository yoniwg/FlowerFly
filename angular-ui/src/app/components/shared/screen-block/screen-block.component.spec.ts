import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockScreenComponent } from './screen-block.component';

describe('BlockScreenComponent', () => {
  let component: BlockScreenComponent;
  let fixture: ComponentFixture<BlockScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
