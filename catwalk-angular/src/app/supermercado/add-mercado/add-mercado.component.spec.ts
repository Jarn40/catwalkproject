import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMercadoComponent } from './add-mercado.component';

describe('AddMercadoComponent', () => {
  let component: AddMercadoComponent;
  let fixture: ComponentFixture<AddMercadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMercadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMercadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
