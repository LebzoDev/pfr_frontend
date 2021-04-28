import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListGroupCompetencesComponent } from './list-group-competences.component';

describe('ListGroupCompetencesComponent', () => {
  let component: ListGroupCompetencesComponent;
  let fixture: ComponentFixture<ListGroupCompetencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListGroupCompetencesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListGroupCompetencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
