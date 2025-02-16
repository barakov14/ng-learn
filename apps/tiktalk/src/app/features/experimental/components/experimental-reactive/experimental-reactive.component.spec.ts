import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperimentalReactiveComponent } from './experimental-reactive.component';

describe('ExperimentalReactiveComponent', () => {
  let component: ExperimentalReactiveComponent;
  let fixture: ComponentFixture<ExperimentalReactiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExperimentalReactiveComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExperimentalReactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
