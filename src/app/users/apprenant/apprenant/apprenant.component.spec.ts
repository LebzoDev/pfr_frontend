import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprenantComponent } from './apprenant.component';

describe('ApprenantComponent', () => {
  let component: ApprenantComponent;
  let fixture: ComponentFixture<ApprenantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprenantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprenantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
