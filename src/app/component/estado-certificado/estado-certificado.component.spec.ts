import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadoCertificadoComponent } from './estado-certificado.component';

describe('EstadoCertificadoComponent', () => {
  let component: EstadoCertificadoComponent;
  let fixture: ComponentFixture<EstadoCertificadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstadoCertificadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstadoCertificadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
