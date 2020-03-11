import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivacionCuentaComponent } from './activacion-cuenta.component';

describe('ActivacionCuentaComponent', () => {
  let component: ActivacionCuentaComponent;
  let fixture: ComponentFixture<ActivacionCuentaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivacionCuentaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivacionCuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
