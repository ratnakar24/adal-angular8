import { inject, TestBed } from '@angular/core/testing';
import { Adal5Service } from './adal5.service';

describe('Adal5Service', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [Adal5Service]
        });
    });

    it('should ...', inject([Adal5Service], (service: Adal5Service) => {
        expect(service).toBeTruthy();
    }));
});
