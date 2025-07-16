import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DialogEventosComponent} from './dialog-eventos.component';

describe('DialogAutorComponent', () => {
  let component: DialogEventosComponent;
  let fixture: ComponentFixture<DialogEventosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogEventosComponent],
    });
    fixture = TestBed.createComponent(DialogEventosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
