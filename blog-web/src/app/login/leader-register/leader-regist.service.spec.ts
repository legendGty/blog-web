/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LeaderRegistService } from './leader-regist.service';

describe('Service: LeaderRegist', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LeaderRegistService]
    });
  });

  it('should ...', inject([LeaderRegistService], (service: LeaderRegistService) => {
    expect(service).toBeTruthy();
  }));
});
