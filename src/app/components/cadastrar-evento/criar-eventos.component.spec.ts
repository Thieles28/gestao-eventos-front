import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CriarEventosComponent} from './criar-eventos.component';

describe('CadastrarGeneroComponent', () => {
  let component: CriarEventosComponent;
  let fixture: ComponentFixture<CriarEventosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CriarEventosComponent],
    });
    fixture = TestBed.createComponent(CriarEventosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
