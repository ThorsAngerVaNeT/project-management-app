import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { ColumnsService } from './columns.service';

describe('ColumnsService', () => {
  let service: ColumnsService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientModule] });
    service = TestBed.inject(ColumnsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
