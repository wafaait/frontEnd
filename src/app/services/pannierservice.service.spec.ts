import { TestBed } from '@angular/core/testing';

import { PannierserviceService } from './pannierservice.service';

describe('PannierserviceService', () => {
  let service: PannierserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PannierserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
