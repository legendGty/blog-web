/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BlogApiService } from './blog-api.service';

describe('Service: BlogApi', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BlogApiService]
    });
  });

  it('should ...', inject([BlogApiService], (service: BlogApiService) => {
    expect(service).toBeTruthy();
  }));
});
