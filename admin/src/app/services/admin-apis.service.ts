import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminApisService {

  private apiBaseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  // login Api 
  login(data: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}/login`, data);
  }

  // Home top all slider listing
  fetchSliders(): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}hometopslider/fetch`, {});
  }

  // Create new slider
  createSlider(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}hometopslider/create`, formData);
  }

  // Edit single slide
  fetchSingleSlide(id: number): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}hometopslider/fetch-single`, { id });
  }

  // Update singnle slide
  updateSlider(data: FormData): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}hometopslider/update`, data);
  }

  // Delete single slide
  deleteSlider(payload: any): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}/hometopslider/delete`, payload,);
  }


  fetchBlockHome(): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}blockhome/fetch`, {});
  }

  createBlockHome(data: FormData): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}blockhome/create`, data);
  }

  fetchSingleBlock(id: number): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}blockhome/fetch-single`, { id });
  }

  updateBlockHome(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}blockhome/update`, formData);
  }

  deleteBlockHome(id: number): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}blockhome/delete`, { id });
  }


  fetchAvailableBlocks(): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}blockavailable/fetch`, {});
  }

  addAvailableBlock(payload: FormData): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}blockavailable/create`, payload);
  }

  fetchAvailableBlockById(id: number): Observable<any> {
    return this.http.post<any>(`${this.apiBaseUrl}blockavailable/fetch-single`, { id });
  }

  updateAvailableBlock(payload: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiBaseUrl}blockavailable/update`, payload);
  }

  deleteAvailableBlock(id: number) {
    return this.http.post<any>(`${this.apiBaseUrl}blockavailable/delete`, { id });
  }


  fetchAboutsUs(): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}aboutus/fetch`, {});
  }

  addAboutsUs(payload: any): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}aboutus/create`, payload);
  }

  fetchAboutsUsById(id: number) {
    return this.http.post<any>(`${this.apiBaseUrl}aboutus/fetch-single`, { id });
  }

  updateAboutsUs(payload: any) {
    return this.http.post<any>(`${this.apiBaseUrl}aboutus/update`, payload);
  }

  deleteAboutsUs(id: number) {
    return this.http.post<any>(`${this.apiBaseUrl}aboutus/delete`, { id });
  }


  parallaxFetch(): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}parallaxhome/fetch`, {});
  }

  parallaxCreate(data: FormData): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}parallaxhome/create`, data);
  }

  parallaxUpdate(data: FormData): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}parallaxhome/update`, data);
  }

  parallaxDelete(id: number): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}parallaxhome/delete`, { id });
  }

  parallaxDetchSingle(id: number): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}parallaxhome/fetch-single`, { id });
  }


  packagesFetch(): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}ourpackage/fetch`, {});
  }

  packagesDelete(id: number): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}ourpackage/delete`, { id });
  }

  packagesCreate(data: FormData): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}ourpackage/create`, data);
  }

  packagesUpdate(data: FormData): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}ourpackage/update`, data);
  }

  packagesfetchSingle(id: number) {
    return this.http.post<any>(`${this.apiBaseUrl}ourpackage/fetch-single`, { id });
  }


  transportationFetch(): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}transportation/fetch`, {});
  }

  transportationDelete(id: number): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}transportation/delete`, { id });
  }

  transportationCreate(data: FormData): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}transportation/create`, data);
  }

  transportationUpdate(data: FormData): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}transportation/update`, data);
  }

  transportationfetchSingle(id: number) {
    return this.http.post<any>(`${this.apiBaseUrl}transportation/fetch-single`, { id });
  }


  workvisaFetch(): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}workvisa/fetch`, {});
  }

  workvisaDelete(id: number): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}workvisa/delete`, { id });
  }

  workvisaCreate(data: FormData): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}workvisa/create`, data);
  }

  workvisaUpdate(data: FormData): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}workvisa/update`, data);
  }

  workvisafetchSingle(id: number) {
    return this.http.post<any>(`${this.apiBaseUrl}workvisa/fetch-single`, { id });
  }


  fetchContacts(): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}/contact/fetch`, {});
  }


  agentFetch(): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}addyouragent/fetch`, {});
  }

  agentDelete(id: number): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}addyouragent/delete`, { id });
  }

  agentCreate(data: FormData): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}addyouragent/create`, data);
  }

  agentUpdate(data: FormData): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}addyouragent/update`, data);
  }

  agentfetchSingle(id: number) {
    return this.http.post<any>(`${this.apiBaseUrl}addyouragent/fetch-single`, { id });
  }


  hotelFetch(): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}hotel/fetch`, {});
  }

  hotelDelete(id: number): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}hotel/delete`, { id });
  }

  hotelCreate(data: FormData): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}hotel/create`, data);
  }

  hotelUpdate(data: FormData): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}hotel/update`, data);
  }

  hotelfetchSingle(id: number) {
    return this.http.post<any>(`${this.apiBaseUrl}hotel/fetch-single`, { id });
  }


  dashboardStats(): Observable<any> {
    return this.http.post<any>(`${this.apiBaseUrl}dashboard/count`, {});
  }


  packagedetailsFetch(): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}packagedetails/fetch`, {});
  }

  packagedetailsDelete(id: number): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}packagedetails/delete`, { id });
  }

  packagedetailsCreate(data: FormData): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}packagedetails/create`, data);
  }

  packagedetailsUpdate(data: FormData): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}packagedetails/update`, data);
  }

  packagedetailsfetchSingle(id: number) {
    return this.http.post<any>(`${this.apiBaseUrl}packagedetails/fetch-single`, { id });
  }

}
