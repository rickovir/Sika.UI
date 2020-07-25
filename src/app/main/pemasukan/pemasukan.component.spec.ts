import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PemasukanComponent } from './pemasukan.component';

describe('PemasukanComponent', () => {
  let component: PemasukanComponent;
  let fixture: ComponentFixture<PemasukanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PemasukanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PemasukanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
