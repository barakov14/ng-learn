import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TtInputTagComponent } from './tt-input-tag.component';

describe('TtInputTagComponent', () => {
  let component: TtInputTagComponent;
  let fixture: ComponentFixture<TtInputTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TtInputTagComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TtInputTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
