import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatedproductsComponent } from './ratedproducts.component';

describe('RatedproductsComponent', () => {
  let component: RatedproductsComponent;
  let fixture: ComponentFixture<RatedproductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatedproductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatedproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
