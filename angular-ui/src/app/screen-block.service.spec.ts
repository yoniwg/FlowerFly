import { TestBed, inject } from '@angular/core/testing';

import { ScreenBlockService } from './screen-block.service';

describe('ScreenBlockService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScreenBlockService]
    });
  });

  it('should be created', inject([ScreenBlockService], (service: ScreenBlockService) => {
    expect(service).toBeTruthy();
  }));
});
