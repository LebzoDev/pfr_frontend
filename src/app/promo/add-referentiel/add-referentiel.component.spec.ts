import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReferentielComponent } from './add-referentiel.component';

describe('AddReferentielComponent', () => {
  let component: AddReferentielComponent;
  let fixture: ComponentFixture<AddReferentielComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddReferentielComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddReferentielComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
