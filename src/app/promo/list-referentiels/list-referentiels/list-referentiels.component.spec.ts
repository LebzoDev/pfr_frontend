import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListReferentielsComponent } from './list-referentiels.component';

describe('ListReferentielsComponent', () => {
  let component: ListReferentielsComponent;
  let fixture: ComponentFixture<ListReferentielsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListReferentielsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListReferentielsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
