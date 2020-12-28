import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProfilSortieComponent } from './add-profil-sortie.component';

describe('AddProfilSortieComponent', () => {
  let component: AddProfilSortieComponent;
  let fixture: ComponentFixture<AddProfilSortieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProfilSortieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProfilSortieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
