import { TestBed } from '@angular/core/testing';

import { MaeService } from './mae.service';

describe('MaeService', () => {
  let service: MaeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
