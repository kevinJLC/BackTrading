import { TestBed } from '@angular/core/testing';

import { NoAuthenticatedGuardService } from './no-authenticated-guard.service';

describe('NoAuthenticatedGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NoAuthenticatedGuardService = TestBed.get(NoAuthenticatedGuardService);
    expect(service).toBeTruthy();
  });
});
