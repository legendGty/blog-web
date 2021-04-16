/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Session.storageService } from './session.storage.service';

describe('Service: Session.storage', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Session.storageService]
    });
  });

  it('should ...', inject([Session.storageService], (service: Session.storageService) => {
    expect(service).toBeTruthy();
  }));
});
