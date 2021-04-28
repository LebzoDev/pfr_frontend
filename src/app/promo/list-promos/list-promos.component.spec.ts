import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPromosComponent } from './list-promos.component';

describe('ListPromosComponent', () => {
  let component: ListPromosComponent;
  let fixture: ComponentFixture<ListPromosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPromosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPromosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
