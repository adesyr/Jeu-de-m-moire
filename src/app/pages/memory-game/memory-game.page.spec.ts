import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemoryGamePage } from './memory-game.page';

describe('MemoryGamePage', () => {
  let component: MemoryGamePage;
  let fixture: ComponentFixture<MemoryGamePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemoryGamePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemoryGamePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
