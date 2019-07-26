import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprasRegistroComponent } from './registro.component';

describe('ComprasRegistroComponent', () => {
  let component: ComprasRegistroComponent;
  let fixture: ComponentFixture<ComprasRegistroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComprasRegistroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComprasRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
