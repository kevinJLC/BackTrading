import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmbebidosComponent } from './embebidos.component';

describe('EmbebidosComponent', () => {
  let component: EmbebidosComponent;
  let fixture: ComponentFixture<EmbebidosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmbebidosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmbebidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
