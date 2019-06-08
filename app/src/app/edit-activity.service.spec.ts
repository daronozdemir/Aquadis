import { TestBed } from '@angular/core/testing';

import { EditActivityService } from './edit-activity.service';

describe('EditActivityService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EditActivityService = TestBed.get(EditActivityService);
    expect(service).toBeTruthy();
  });
});
