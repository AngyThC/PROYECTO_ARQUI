import { TestBed } from '@angular/core/testing';

import { MeseroService } from './mesero.service';

describe('MeseroService', () => {
  let service: MeseroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MeseroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
