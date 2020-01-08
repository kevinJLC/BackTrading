import { TestBed } from '@angular/core/testing';

import { CambiocontraService } from './cambiocontra.service';

describe('CambiocontraService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CambiocontraService = TestBed.get(CambiocontraService);
    expect(service).toBeTruthy();
  });
});
