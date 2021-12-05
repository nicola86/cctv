import { TestBed } from '@angular/core/testing';

import { HkapiService } from './hkapi.service';

describe('HkapiService', () => {
  let service: HkapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HkapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
