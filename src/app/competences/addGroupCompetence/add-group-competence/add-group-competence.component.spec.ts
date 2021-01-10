import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGroupCompetenceComponent } from './add-group-competence.component';

describe('AddGroupCompetenceComponent', () => {
  let component: AddGroupCompetenceComponent;
  let fixture: ComponentFixture<AddGroupCompetenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddGroupCompetenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGroupCompetenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
