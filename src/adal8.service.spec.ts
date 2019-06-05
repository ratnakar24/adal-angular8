import { inject, TestBed } from '@angular/core/testing';
import { Adal8Service } from './adal8.service';

describe('Adal8Service', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [Adal8Service]
        });
    });

    it('should ...', inject([Adal8Service], (service: Adal8Service) => {
        expect(service).toBeTruthy();
    }));
});
