import { TestBed } from '@angular/core/testing';

import { BacktestingService } from './backtesting.service';

describe('BacktestingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BacktestingService = TestBed.get(BacktestingService);
    expect(service).toBeTruthy();
  });
});
