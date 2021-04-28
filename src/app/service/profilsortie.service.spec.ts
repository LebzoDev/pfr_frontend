import { TestBed } from '@angular/core/testing';

import { ProfilsortieService } from './profilsortie.service';

describe('ProfilsortieService', () => {
  let service: ProfilsortieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfilsortieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
