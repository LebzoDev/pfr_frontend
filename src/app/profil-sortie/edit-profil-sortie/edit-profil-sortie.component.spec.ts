import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfilSortieComponent } from './edit-profil-sortie.component';

describe('EditProfilSortieComponent', () => {
  let component: EditProfilSortieComponent;
  let fixture: ComponentFixture<EditProfilSortieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditProfilSortieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProfilSortieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
