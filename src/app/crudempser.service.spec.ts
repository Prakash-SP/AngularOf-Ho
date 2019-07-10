import { TestBed } from '@angular/core/testing';

import { CrudempserService } from './crudempser.service';

describe('CrudempserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CrudempserService = TestBed.get(CrudempserService);
    expect(service).toBeTruthy();
  });
});
