import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsApprenantComponent } from './details-apprenant.component';

describe('DetailsApprenantComponent', () => {
  let component: DetailsApprenantComponent;
  let fixture: ComponentFixture<DetailsApprenantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsApprenantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsApprenantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
