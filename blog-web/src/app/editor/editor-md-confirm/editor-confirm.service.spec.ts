/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EditorConfirmService } from './editor-confirm.service';

describe('Service: EditorConfirm', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EditorConfirmService]
    });
  });

  it('should ...', inject([EditorConfirmService], (service: EditorConfirmService) => {
    expect(service).toBeTruthy();
  }));
});
