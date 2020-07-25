import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PengeluaranComponent } from './pengeluaran.component';

describe('PengeluaranComponent', () => {
  let component: PengeluaranComponent;
  let fixture: ComponentFixture<PengeluaranComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PengeluaranComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PengeluaranComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
