import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMercadoComponent } from './edit-mercado.component';

describe('EditMercadoComponent', () => {
  let component: EditMercadoComponent;
  let fixture: ComponentFixture<EditMercadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMercadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMercadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
