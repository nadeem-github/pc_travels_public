import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebApplicationService {

  private apiBaseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  // Home top all slider listing
  fetchSliders(): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}hometopslider/fetch`, {});
  }

  fetchBlockHome(): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}blockhome/fetch`, {});
  }

  fetchAvailableBlocks(): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}blockavailable/fetch`, {});
  }

  fetchAboutsUs(): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}aboutus/fetch`, {});
  }

  parallaxFetch(): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}parallaxhome/fetch`, {});
  }

  submitContactForm(formData: any): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}contact/create`, formData);
  }

  agentFetch(): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}addyouragent/fetch`, {});
  }

  transportationFetch(): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}transportation/fetch`, {});
  }

  workvisaFetch(): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}workvisa/fetch`, {});
  }

  packagesFetch(): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}ourpackage/fetch`, {});
  }

  hotelFetch(): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}hotel/fetch`, {});
  }

  createVisitor(): Observable<any> {
    return this.http.get(`${this.apiBaseUrl}visitor/create`);
  }

  packagedetailsFetch(): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}packagedetails/fetch`, {});
  }
  
  visaFetch(): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}visa/fetch-by-country`, {});
  }

}
