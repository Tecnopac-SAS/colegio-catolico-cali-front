import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFiltersDatatableComponent } from './search-filters-datatable.component';

describe('SearchFiltersDatatableComponent', () => {
  let component: SearchFiltersDatatableComponent;
  let fixture: ComponentFixture<SearchFiltersDatatableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchFiltersDatatableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchFiltersDatatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
