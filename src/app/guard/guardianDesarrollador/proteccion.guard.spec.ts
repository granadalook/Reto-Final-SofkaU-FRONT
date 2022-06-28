import { TestBed } from '@angular/core/testing';

import { ProteccionGuard } from './proteccion.guard';

describe('ProteccionGuard', () => {
  let guard: ProteccionGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ProteccionGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
