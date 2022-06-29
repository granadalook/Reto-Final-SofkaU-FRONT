import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriasCarsComponent } from './historias-cars.component';

describe('HistoriasCarsComponent', () => {
  let component: HistoriasCarsComponent;
  let fixture: ComponentFixture<HistoriasCarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoriasCarsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoriasCarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
