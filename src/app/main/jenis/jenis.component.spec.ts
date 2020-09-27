import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JenisComponent } from './jenis.component';
import { JenisService } from './jenis.service';

describe('JenisComponent', () => {
  let component: JenisComponent;
  let fixture: ComponentFixture<JenisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JenisComponent ],
      providers:[JenisService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JenisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
