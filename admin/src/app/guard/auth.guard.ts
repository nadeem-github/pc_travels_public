import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    logout() {
        localStorage.removeItem('token'); // Ya jo bhi aap login token me use karte ho
        this.router.navigate(['/login']).then(() => {
            window.location.reload(); // Browser back se bhi prevent kare
        });
    }

    canActivate(): boolean | UrlTree {
        const token = localStorage.getItem('token');
        if (token) {
            return true;
        } else {
            return this.router.parseUrl('/login');
        }
    }
}
