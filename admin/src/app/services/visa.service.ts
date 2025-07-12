import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VisaService {

  private apiBaseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  visaFetch(): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}visa/fetch`, {});
  }

  visaDelete(id: number): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}visa/delete`, { id });
  }

  visaCreate(data: FormData): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}visa/create`, data);
  }

  visaUpdate(data: FormData): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}visa/update`, data);
  }

  visafetchSingle(id: number) {
    return this.http.post<any>(`${this.apiBaseUrl}visa/fetch-single`, { id });
  }


  visatypeFetch(): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}visatype/fetch`, {});
  }

  visatypeDelete(id: number): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}visatype/delete`, { id });
  }

  visatypeCreate(data: FormData): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}visatype/create`, data);
  }

  visatypeUpdate(data: FormData): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}visatype/update`, data);
  }

  visatypefetchSingle(id: number) {
    return this.http.post<any>(`${this.apiBaseUrl}visatype/fetch-single`, { id });
  }
  
  
  visaDocumentFetch(): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}visadocument/fetch`, {});
  }

  visaDocumentDelete(id: number): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}visadocument/delete`, { id });
  }

  visaDocumentCreate(data: FormData): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}visadocument/create`, data);
  }

  visaDocumentUpdate(data: FormData): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}visadocument/update`, data);
  }

  visaDocumentfetchSingle(id: number) {
    return this.http.post<any>(`${this.apiBaseUrl}visadocument/fetch-single`, { id });
  }


}
