import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantityProductComponent } from './quantity-product.component';

describe('QuantityProductComponent', () => {
  let component: QuantityProductComponent;
  let fixture: ComponentFixture<QuantityProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuantityProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuantityProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
