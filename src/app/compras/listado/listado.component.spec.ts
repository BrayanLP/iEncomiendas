import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprasListadoComponent } from './listado.component';

describe('ComprasListadoComponent', () => {
  let component: ComprasListadoComponent;
  let fixture: ComponentFixture<ComprasListadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComprasListadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComprasListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
