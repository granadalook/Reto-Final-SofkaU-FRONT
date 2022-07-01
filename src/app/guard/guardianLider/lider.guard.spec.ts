import { TestBed } from '@angular/core/testing';

import { LiderGuard } from './lider.guard';

describe('LiderGuard', () => {
  let guard: LiderGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LiderGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
