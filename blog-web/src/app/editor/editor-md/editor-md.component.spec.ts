/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EditorMdComponent } from './editor-md.component';

describe('EditorMdComponent', () => {
  let component: EditorMdComponent;
  let fixture: ComponentFixture<EditorMdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorMdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorMdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
