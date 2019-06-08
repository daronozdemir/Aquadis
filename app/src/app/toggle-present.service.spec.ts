import { TestBed } from '@angular/core/testing';

import { TogglePresentService } from './toggle-present.service';

describe('TogglePresentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TogglePresentService = TestBed.get(TogglePresentService);
    expect(service).toBeTruthy();
  });
});
