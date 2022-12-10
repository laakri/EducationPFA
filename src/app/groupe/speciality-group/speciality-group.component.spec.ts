import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialityGroupComponent } from './speciality-group.component';

describe('SpecialityGroupComponent', () => {
  let component: SpecialityGroupComponent;
  let fixture: ComponentFixture<SpecialityGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecialityGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialityGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
