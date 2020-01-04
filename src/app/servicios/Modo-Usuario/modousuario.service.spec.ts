import { TestBed } from '@angular/core/testing';

import { ModousuarioService } from './modousuario.service';

describe('ModousuarioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ModousuarioService = TestBed.get(ModousuarioService);
    expect(service).toBeTruthy();
  });
});
