import { TestBed } from '@angular/core/testing';

import { PuntosDeInteresService } from './puntos-de-interes.service';

describe('PuntosDeInteresService', () => {
  let service: PuntosDeInteresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PuntosDeInteresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
