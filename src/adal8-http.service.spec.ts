import { inject, TestBed } from '@angular/core/testing';

import { Adal8HTTPService } from './adal8-http.service';

describe('Adal8HTTPService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [Adal8HTTPService]
        });
    });

    it('should ...', inject([Adal8HTTPService], (service: Adal8HTTPService) => {
        expect(service).toBeTruthy();
    }));
});
