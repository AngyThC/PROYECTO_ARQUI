import { TestBed } from '@angular/core/testing';
import { TypeMenuService } from './type-menu.service';

describe('TypeMenuService', () => {
  let service: TypeMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
