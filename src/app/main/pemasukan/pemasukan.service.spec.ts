import { TestBed } from '@angular/core/testing';

import { PemasukanService } from './pemasukan.service';

describe('PemasukanService', () => {
  let service: PemasukanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PemasukanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
