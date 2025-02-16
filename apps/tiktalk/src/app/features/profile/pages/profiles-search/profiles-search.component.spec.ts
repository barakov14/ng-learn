import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilesSearchComponent } from './profiles-search.component';

describe('SearchPageComponent', () => {
  let component: ProfilesSearchComponent;
  let fixture: ComponentFixture<ProfilesSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilesSearchComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfilesSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
