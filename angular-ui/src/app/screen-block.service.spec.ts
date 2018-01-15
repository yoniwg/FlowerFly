import { TestBed, inject } from '@angular/core/testing';

import { BlockScreenService } from './screen-block.service';

describe('BlockScreenService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BlockScreenService]
    });
  });

  it('should be created', inject([BlockScreenService], (service: BlockScreenService) => {
    expect(service).toBeTruthy();
  }));
});
