import { TestBed } from '@angular/core/testing';

import { BackendConnectionServiceService } from './backend-connection-service.service';

describe('BackendConnectionServiceService', () => {
  let service: BackendConnectionServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackendConnectionServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
