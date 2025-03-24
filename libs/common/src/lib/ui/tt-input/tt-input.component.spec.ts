import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TtInputComponent } from './tt-input.component';

describe('TtInputComponent', () => {
  let component: TtInputComponent;
  let fixture: ComponentFixture<TtInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TtInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TtInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
