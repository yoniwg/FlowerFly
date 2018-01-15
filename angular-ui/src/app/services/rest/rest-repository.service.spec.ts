import { TestBed, inject } from '@angular/core/testing';

import { RestRepositoryService } from './rest-repository.service';

describe('RestRepositoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RestRepositoryService]
    });
  });

  it('should be created', inject([RestRepositoryService], (service: RestRepositoryService) => {
    expect(service).toBeTruthy();
  }));
});
