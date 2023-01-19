import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BolsilloComponent } from './bolsillo.component';

describe('BolsilloComponent', () => {
  let component: BolsilloComponent;
  let fixture: ComponentFixture<BolsilloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BolsilloComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BolsilloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
