import { TestBed } from '@angular/core/testing';

import { StandingsApi } from './standings-api';

describe('StandingsApi', () => {
  let service: StandingsApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StandingsApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
