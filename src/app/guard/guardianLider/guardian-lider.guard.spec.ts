import { TestBed } from '@angular/core/testing';

import { GuardianLiderGuard } from './guardian-lider.guard';

describe('GuardianLiderGuard', () => {
  let guard: GuardianLiderGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GuardianLiderGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
