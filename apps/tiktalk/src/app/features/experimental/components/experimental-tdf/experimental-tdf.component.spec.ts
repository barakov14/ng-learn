import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperimentalTdfComponent } from './experimental-tdf.component';

describe('ExperimentalTdfComponent', () => {
  let component: ExperimentalTdfComponent;
  let fixture: ComponentFixture<ExperimentalTdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExperimentalTdfComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExperimentalTdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
