/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CommendComponent } from './commend.component';

describe('CommendComponent', () => {
  let component: CommendComponent;
  let fixture: ComponentFixture<CommendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
