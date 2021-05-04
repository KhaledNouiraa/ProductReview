import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductreviewsComponent } from './productreviews.component';

describe('ProductreviewsComponent', () => {
  let component: ProductreviewsComponent;
  let fixture: ComponentFixture<ProductreviewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductreviewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductreviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
