import { TestBed } from '@angular/core/testing';

import { ComponentCommunicationService } from './componentCommunication.service';

describe('ComponentCommunicationService', () => {
  let service: ComponentCommunicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComponentCommunicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
