import { TestBed } from '@angular/core/testing';

import { TradingautomaticoService } from './tradingautomatico.service';

describe('TradingautomaticoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TradingautomaticoService = TestBed.get(TradingautomaticoService);
    expect(service).toBeTruthy();
  });
});
