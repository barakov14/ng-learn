import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TtAddressInputComponent } from './tt-address-input.component';

describe('TtAddressInputComponent', () => {
  let component: TtAddressInputComponent;
  let fixture: ComponentFixture<TtAddressInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TtAddressInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TtAddressInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
