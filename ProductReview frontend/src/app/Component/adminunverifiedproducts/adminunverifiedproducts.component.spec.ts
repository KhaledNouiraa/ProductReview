import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminunverifiedproductsComponent } from './adminunverifiedproducts.component';

describe('AdminunverifiedproductsComponent', () => {
  let component: AdminunverifiedproductsComponent;
  let fixture: ComponentFixture<AdminunverifiedproductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminunverifiedproductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminunverifiedproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
