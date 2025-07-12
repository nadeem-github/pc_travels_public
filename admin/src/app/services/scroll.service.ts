import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ScrollService {
    constructor() { }

    // Scroll to top of the page
    goToTop(): void {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Scroll to a specific element by selector (optional)
    goToElement(selector: string): void {
        const element = document.querySelector(selector);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }
}
