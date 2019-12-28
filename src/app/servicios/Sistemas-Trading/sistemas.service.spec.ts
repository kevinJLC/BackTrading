import { TestBed } from '@angular/core/testing';

import { SistemasService } from './sistemas.service';

describe('SistemasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SistemasService = TestBed.get(SistemasService);
    expect(service).toBeTruthy();
  });
});
