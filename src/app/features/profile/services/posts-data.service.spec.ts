import { TestBed } from '@angular/core/testing';

import { PostsDataService } from './posts-data.service';

describe('PostsDataService', () => {
  let service: PostsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
