import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InfiniteScrollTriggerComponent } from './infinite-scroll-trigger.component';

describe('InfiniteScrollTriggerComponent', () => {
  let component: InfiniteScrollTriggerComponent;
  let fixture: ComponentFixture<InfiniteScrollTriggerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfiniteScrollTriggerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InfiniteScrollTriggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
