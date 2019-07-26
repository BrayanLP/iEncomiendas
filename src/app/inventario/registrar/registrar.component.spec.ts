import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventarioRegistrarComponent } from './registrar.component';

describe('InventarioRegistrarComponent', () => {
  let component: InventarioRegistrarComponent;
  let fixture: ComponentFixture<InventarioRegistrarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventarioRegistrarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventarioRegistrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
