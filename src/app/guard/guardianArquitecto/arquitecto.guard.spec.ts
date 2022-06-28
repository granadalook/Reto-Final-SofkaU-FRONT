import { TestBed } from '@angular/core/testing';

import { ArquitectoGuard } from './arquitecto.guard';

describe('ArquitectoGuard', () => {
  let guard: ArquitectoGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ArquitectoGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
