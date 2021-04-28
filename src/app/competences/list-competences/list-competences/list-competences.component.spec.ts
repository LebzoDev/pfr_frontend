import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCompetencesComponent } from './list-competences.component';

describe('ListCompetencesComponent', () => {
  let component: ListCompetencesComponent;
  let fixture: ComponentFixture<ListCompetencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCompetencesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCompetencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
