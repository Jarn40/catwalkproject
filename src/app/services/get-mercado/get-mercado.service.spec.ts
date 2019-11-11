import { TestBed } from '@angular/core/testing';

import { GetMercadoService } from './get-mercado.service';

describe('GetMercadoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetMercadoService = TestBed.get(GetMercadoService);
    expect(service).toBeTruthy();
  });
});
