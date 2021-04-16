/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LeaderLoginService } from './leader-login.service';

describe('Service: LeaderLogin', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LeaderLoginService]
    });
  });

  it('should ...', inject([LeaderLoginService], (service: LeaderLoginService) => {
    expect(service).toBeTruthy();
  }));
});
