import { TestBed } from '@angular/core/testing';

import { JenisService } from './jenis.service';

describe('JenisService', () => {
  let service: JenisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JenisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
